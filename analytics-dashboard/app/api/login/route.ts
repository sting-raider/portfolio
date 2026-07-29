import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  requestIsAllowed,
  sessionCookie,
  verifyCredentials,
} from "@/lib/auth";
import {
  clearLoginFailures,
  mayAttemptLogin,
  recordLoginFailure,
} from "@/lib/login-limit";

function loginUrl(request: NextRequest, error: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", error);
  return url;
}

export async function POST(request: NextRequest) {
  if (!(await requestIsAllowed())) {
    return NextResponse.redirect(loginUrl(request, "access"), 303);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!mayAttemptLogin(ip)) {
    return NextResponse.redirect(loginUrl(request, "locked"), 303);
  }

  const form = await request.formData();
  const username = String(form.get("username") ?? "").trim();
  const password = String(form.get("password") ?? "");

  if (!verifyCredentials(username, password)) {
    recordLoginFailure(ip);
    return NextResponse.redirect(loginUrl(request, "invalid"), 303);
  }

  clearLoginFailures(ip);
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.set(sessionCookie(createSessionToken(username)));
  return response;
}
