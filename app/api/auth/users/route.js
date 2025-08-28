// /app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth"); // { name, value } or undefined

  const r = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(authCookie?.value ? { Authorization: `Bearer ${authCookie.value}`} : {}),
    },
  });

  const data = await r.json();
  return NextResponse.json(data);
}
