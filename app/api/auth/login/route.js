// /app/api/auth/login/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password, fcmToken } = await req.json();

  const r = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, fcmToken }),
  });
  const data = await r.json();

  if (!r.ok || !data.success) {
    return NextResponse.json({ success: false, message: data.message }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("auth", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  
  return res;
}
