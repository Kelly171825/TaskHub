import { NextResponse } from "next/server";

const COOKIE_NAME = "taskhub_session";

export async function POST(request: Request) {
  const { password } = await request.json();
  const workspacePassword = process.env.TASKHUB_PASSWORD || "taskhub2026";

  if (typeof password !== "string" || password !== workspacePassword) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
