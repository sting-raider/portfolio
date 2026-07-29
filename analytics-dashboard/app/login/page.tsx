import { getSessionUser } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const errors: Record<string, string> = {
  invalid: "ACCESS DENIED. CREDENTIALS DID NOT MATCH.",
  locked: "TOO MANY ATTEMPTS. TERMINAL LOCKED FOR 15 MINUTES.",
  access: "THIS TERMINAL DOES NOT RECOGNIZE YOUR NETWORK.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getSessionUser()) redirect("/");
  const { error } = await searchParams;

  return (
    <main className="login-shell">
      <div className="scanlines" aria-hidden="true" />
      <section className="login-console" aria-labelledby="login-title">
        <div className="terminal-kicker">
          <span className="status-light" />
          TRUE LAB // TERMINAL 01
        </div>
        <div className="login-grid">
          <div className="login-copy">
            <p className="eyebrow">ROYAL SCIENTIST NETWORK</p>
            <h1 id="login-title">
              AUTHORIZATION
              <br />
              REQUIRED
            </h1>
            <p className="login-lede">
              * This monitoring station contains private portfolio telemetry.
            </p>
          </div>
          <div className="alphys-terminal" aria-label="Alphys monitoring the terminal">
            <div className="alphys-glow" />
            <Image
              src="/alphys-face.png"
              alt="Alphys"
              width={160}
              height={160}
              priority
              className="alphys-image"
            />
            <div className="dialogue dialogue--compact">
              <span className="speaker">ALPHYS</span>
              <p>* O-oh! This area is supposed to be private...</p>
            </div>
          </div>
        </div>

        <form className="login-form" action="/api/login" method="post">
          <label>
            OPERATOR ID
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              autoFocus
            />
          </label>
          <label>
            ACCESS KEY
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? (
            <p className="form-error" role="alert">
              * {errors[error] ?? errors.invalid}
            </p>
          ) : null}
          <button type="submit">
            <span className="mini-soul" />
            ENTER TRUE LAB
          </button>
        </form>
      </section>
    </main>
  );
}
