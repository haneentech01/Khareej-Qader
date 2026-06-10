import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_API = process.env.API_URL;

// Post request for student registration to external API
export async function POST(request: NextRequest) {
  try {
    if (!EXTERNAL_API) {
      throw new Error("API_URL is not defined");
    }

    const formData = await request.formData();

    const response = await axios.post(
      `${EXTERNAL_API}/students/auth/register`,
      formData,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    );

    const data = await response.data;

    if (!response.status) {
      return NextResponse.json({ data, status: response.status });
    }

    return NextResponse.json({ data, status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
