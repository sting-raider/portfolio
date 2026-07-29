import {
  createHmac,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies, headers } from "next/headers";

const COOKIE_NAME = "ali_lab_session";
const SESSION_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  sub: string;
  exp: number;
};

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signature(value: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function equalText(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createSessionToken(username: string) {
  const payload = encode(
    JSON.stringify({
      sub: username,
      exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
    } satisfies SessionPayload),
  );
  const signed = signature(payload);
  if (!signed) throw new Error("SESSION_SECRET is missing or too short.");
  return `${payload}.${signed}`;
}

export function verifySessionToken(token?: string) {
  if (!token) return null;
  const [payload, suppliedSignature, extra] = token.split(".");
  const expectedSignature = payload ? signature(payload) : null;

  if (extra || !payload || !suppliedSignature || !expectedSignature) return null;
  if (!equalText(suppliedSignature, expectedSignature)) return null;

  try {
    const parsed = JSON.parse(decode(payload)) as SessionPayload;
    if (!parsed.sub || parsed.exp <= Math.floor(Date.now() / 1000)) return null;
    return parsed.sub;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export function sessionCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_SECONDS,
  };
}

export function expiredSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 0,
  };
}

export function verifyCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const encodedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !encodedHash || !equalText(username, expectedUsername)) return false;

  const [algorithm, saltValue, hashValue, extra] = encodedHash.split("$");
  if (algorithm !== "scrypt" || !saltValue || !hashValue || extra) return false;

  try {
    const salt = Buffer.from(saltValue, "base64url");
    const expectedHash = Buffer.from(hashValue, "base64url");
    const suppliedHash = scryptSync(password, salt, expectedHash.length);
    return timingSafeEqual(suppliedHash, expectedHash);
  } catch {
    return false;
  }
}

function normalizeIp(value: string) {
  return value.trim().replace(/^::ffff:/, "");
}

export async function requestIsAllowed() {
  const configured = process.env.TRUSTED_IPS?.split(",")
    .map(normalizeIp)
    .filter(Boolean);

  if (!configured?.length) return true;

  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0];
  const candidate = forwarded ?? requestHeaders.get("x-real-ip") ?? "";
  return configured.includes(normalizeIp(candidate));
}
