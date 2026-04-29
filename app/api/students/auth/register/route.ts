import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_API = "https://mammary-lagoon-headboard.ngrok-free.dev";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${EXTERNAL_API}/api/students/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ngrok بحتاج هاد الهيدر
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
