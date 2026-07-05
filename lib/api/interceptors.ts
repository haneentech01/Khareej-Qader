import { AxiosInstance } from "axios";

function extractErrorMessage(error: unknown): string {
  const err = error as {
    response?: {
      status?: number;
      statusText?: string;
      config?: { url?: string };
      data?: {
        message?: string | null;
        errors?: unknown;
        error?: string | null;
        code?: string;
      };
    };
    message?: string;
  };

  const resp = err?.response;
  const data = resp?.data;

  // 1) A clear message from the backend
  if (
    data?.message &&
    typeof data.message === "string" &&
    data.message.trim()
  ) {
    return data.message;
  }

  // 2) errors as string (not an object)
  if (typeof data?.errors === "string" && data.errors.trim()) {
    return data.errors;
  }

  // 3) error field
  if (data?.error && typeof data.error === "string" && data.error.trim()) {
    return data.error;
  }

  // 4) Error code (for errors returned by the proxy such as BACKEND_URL_NOT_SET)
  if (data?.code) {
    const statusPart = resp?.status ? ` (HTTP ${resp.status})` : "";
    return `${data.code}${statusPart}`;
  }

  // 5) statusText of HTTP (like "Internal Server Error", "Bad Gateway")
  if (resp?.statusText && resp.statusText.trim()) {
    return `${resp.statusText} (HTTP ${resp?.status})`;
  }

  // 6) Original axios error message (like "Request failed with status code 500")
  if (err?.message && typeof err.message === "string" && err.message.trim()) {
    return err.message;
  }

  return "حدث خطأ غير متوقع";
}

export function setupInterceptors(client: AxiosInstance): void {
  // Response Interceptor
  client.interceptors.response.use(
    // The request was successful (200 - 299)
    (response) => {
      return response;
    },

    // The request failed (400 - 599)
    (error) => {
      const status = error?.response?.status;
      const url =
        error?.response?.config?.url || error?.config?.url || "(unknown url)";
      const message = extractErrorMessage(error);

      // Remove request data to avoid printing passwords in the console
      console.error("[api] Request failed:", {
        url,
        status,
        message,
        backendData: error?.response?.data ?? null,
      });

      // 401 - not logged in or token expired
      if (status === 401 && typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const requestHadCookie = Boolean(
          error?.config?.headers?.Cookie || error?.config?.headers?.cookie,
        );

        if (!currentPath.includes("/login") && !requestHadCookie) {
          // Set role based on current path to redirect the user
          let role = "student";
          if (currentPath.includes("/mentor")) role = "mentor";
          else if (currentPath.includes("/admin")) role = "admin";

          const params = new URLSearchParams({
            redirect: currentPath,
            role,
          });
          window.location.href = `/login?${params.toString()}`;
        }
      }

      return Promise.reject({ ...error, message });
    },
  );
}
