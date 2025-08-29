import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const api = process.env.NEXT_PUBLIC_API_URL;

const authHeaders = () => {
  const token = cookies().get("auth")?.value;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function DELETE(_req, { params }) {
  const r = await fetch(`${api}/location/${params.id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}

export async function PATCH(req, { params }) {
  const body = await req.json();
  const r = await fetch(`${api}/location/${params.id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}

// fallback if your backend only supports PUT
export async function PUT(req, { params }) {
  const body = await req.json();
  const r = await fetch(`${api}/location/${params.id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
