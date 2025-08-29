// app/api/auth/location/route.jsx
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");

  const r = await fetch(process.env.NEXT_PUBLIC_API_URL + "/location", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(authCookie?.value ? { Authorization: `Bearer ${authCookie.value}` } : {}),
    },
  });

  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const authCookie = cookieStore.get("auth");
    const body = await req.json();

    const r = await fetch(process.env.NEXT_PUBLIC_API_URL + "/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authCookie?.value ? { Authorization: `Bearer ${authCookie.value}` } : {}),
      },
      body: JSON.stringify(body),
    });
    
    // Forward backend response + status to the client
    const data = await r.json().catch(() => ({}));
    // console.log(data)
    return NextResponse.json(data, { status: r.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error creating branch" },
      { status: 500 }
    );
  }
}
