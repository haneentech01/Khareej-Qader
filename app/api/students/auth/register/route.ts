import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_API = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(`${EXTERNAL_API}/api/students/auth/register`, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      body: formData,
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
