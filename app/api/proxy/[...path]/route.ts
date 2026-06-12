import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL; // server-side فقط (بدون NEXT_PUBLIC_)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const endpoint = path.join("/");

  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
