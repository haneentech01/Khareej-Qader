import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function jsonError(
  status: number,
  code: string,
  message: string,
  extra: Record<string, unknown> = {},
) {
  return NextResponse.json(
    {
      success: false,
      message,
      code,
      ...extra,
    },
    { status },
  );
}

async function proxyRequest(
  request: NextRequest,
  params: Promise<{ path: string[] }>,
  method: string,
) {
  const { path } = await params;
  const endpoint = path.join("/");
  const cookieHeader = request.headers.get("cookie") || "";
  const contentType = request.headers.get("content-type") || "";

  // ─── 1) تحقق من BACKEND_URL ───────────────
  if (!BACKEND_URL) {
    console.error("[proxy] ❌ NEXT_PUBLIC_BACKEND_URL is not set");
    return jsonError(
      500,
      "BACKEND_URL_NOT_SET",
      "Backend URL is not configured.",
      {
        hint: "Add NEXT_PUBLIC_BACKEND_URL to your .env.local file. See .env.example.",
      },
    );
  }

  // ─── Clean up searchParams ───────────────
  // Vercel sometimes injects dynamic route parameters into the query string.
  // We need to remove the "path" parameter before forwarding to the backend.
  const urlSearchParams = new URLSearchParams(request.nextUrl.search);
  urlSearchParams.delete("path");
  const searchString = urlSearchParams.toString();
  const searchSuffix = searchString ? `?${searchString}` : "";

  const targetUrl = `${BACKEND_URL}/${endpoint}${searchSuffix}`;

  // ─── 2) بناء headers ─────────────────────
  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
    Cookie: cookieHeader,
    Accept: "application/json",
  };

  let body: BodyInit | undefined;

  if (method !== "GET" && method !== "DELETE") {
    if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
    } else {
      headers["Content-Type"] = "application/json";
      try {
        body = JSON.stringify(await request.json());
      } catch {
        body = "{}";
      }
    }
  }

  console.log(
    `[proxy] ${method} ${targetUrl}${cookieHeader ? " (with cookie)" : " (no cookie)"}`,
  );

  // ─── 3) تنفيذ الـ fetch ─────────────────
  let response: Response;
  try {
    response = await fetch(targetUrl, {
      method,
      headers,
      body,
    });
  } catch (fetchErr) {
    const errMsg =
      fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
    console.error("[proxy] ❌ fetch failed:", {
      url: targetUrl,
      error: errMsg,
    });
    return jsonError(
      502,
      "BACKEND_UNREACHABLE",
      "Cannot reach backend. It may be down or unreachable.",
      {
        url: targetUrl,
        error: errMsg,
      },
    );
  }

  // ─── 4) قراءة الـ response ─────────────
  const responseText = await response.text();
  const responseContentType = response.headers.get("content-type") || "";
  const isJson = responseContentType.includes("application/json");

  console.log(
    `[proxy] ← ${response.status} ${responseContentType || "(no content-type)"} | body[0:200]=${responseText.slice(0, 200)}`,
  );

  // ─── 5) لو status 503 (backend down) ──
  if (response.status === 503) {
    console.error("[proxy] ❌ Backend returned 503:", {
      url: targetUrl,
      body: responseText.slice(0, 500),
    });
    return jsonError(
      503,
      "BACKEND_UNAVAILABLE",
      "Backend service is unavailable (503). Please try again later.",
    );
  }

  // ─── 6) لو الـ response مش JSON ─────────
  let data: unknown;

  if (isJson) {
    try {
      data = JSON.parse(responseText);
    } catch {
      return jsonError(502, "INVALID_JSON", "Invalid JSON from backend", {
        bodyPreview: responseText.slice(0, 500),
      });
    }
  } else {
    // Case 1: Empty response (204 No Content)
    if (response.status === 204 || responseText.trim() === "") {
      data = { success: true, data: null };
    }
    // Case 2: HTML error page (404, 500, etc.)
    else if (responseContentType.includes("text/html")) {
      console.error("[proxy] Backend returned HTML:", {
        status: response.status,
        body: responseText.slice(0, 200),
      });
      return jsonError(
        response.status,
        "BACKEND_HTML_RESPONSE",
        `Backend returned HTML (status ${response.status}). Endpoint may not exist or auth failed.`,
        {
          backendStatus: response.status,
          bodyPreview: responseText.slice(0, 500),
        },
      );
    }
    // Case 3: Other content types
    else {
      console.error("[proxy] Unexpected content type:", {
        status: response.status,
        contentType: responseContentType,
        body: responseText.slice(0, 300),
      });
      return jsonError(
        response.status >= 400 ? response.status : 502,
        "UNEXPECTED_CONTENT_TYPE",
        `Backend returned unexpected content type (${responseContentType || "none"}).`,
        { bodyPreview: responseText.slice(0, 500) },
      );
    }
  }

  // ─── 7) لو الـ backend رجع 5xx — نُرفق التشخيص ──
  if (response.status >= 500) {
    console.error("[proxy] ❌ Backend returned 5xx:", {
      url: targetUrl,
      status: response.status,
      body: responseText.slice(0, 1000),
    });
    return NextResponse.json(data, { status: response.status });
  }

  // ─── 8) بناء الـ response النهائي ──────
  const res = NextResponse.json(data, { status: response.status });

  // ─── 9) Forward Set-Cookie headers ─────
  for (const setCookie of response.headers.getSetCookie()) {
    const match = setCookie.match(/^([^=]+)=([^;]*)/);
    if (match) {
      res.cookies.set(match[1], match[2], {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }
  }

  return res;
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "GET");
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "POST");
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "PUT");
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "PATCH");
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "DELETE");
}
