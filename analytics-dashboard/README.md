# Portfolio analytics console

This is a separate server-rendered Next.js app for the login-gated Alphys analytics console. It embeds a public, read-only PostHog dashboard and stores no PostHog API secret.

## Data collected

- Anonymous pageviews and unique visits
- Route, entry, exit, and referrer metrics
- Country, device, browser, and operating-system aggregates
- Named interactions such as `resume-download`
- Current active-visitor count

No session recording, heatmap, advertising identifier, or form-field content is collected.

## Local setup

1. Create a [PostHog Cloud](https://posthog.com/) project and set its project API key as the portfolio's `POSTHOG_KEY` GitHub Actions variable.
2. In PostHog, build a dashboard with the views you want, then open **Share** and enable public sharing.
3. Copy `.env.example` to `.env.local` and set `POSTHOG_SHARE_URL` to the dashboard's embed link (`https://us.posthog.com/embedded/...`).
4. Run `npm run hash-password`, then put its result in `ADMIN_PASSWORD_HASH`.
5. Generate a long random `SESSION_SECRET`.
6. Run `npm install` and `npm run dev`.

POSTHOG_SHARE_URL must be configured in the deployment environment. Do not commit the real Share URL to the repository.

## Deployment

Deploy this directory as a separate Vercel project with `analytics-dashboard` as its root directory. Add the owner credential variables from `.env.example` in the Vercel project settings. Do not expose `ADMIN_PASSWORD_HASH` or `SESSION_SECRET` as `NEXT_PUBLIC_*`.

For the strictest access policy, set `TRUSTED_IPS` to the public IP addresses you use. Without it, the login page is internet-visible, but the themed console remains protected by the password.

## Share-link privacy

The Alphys console remains protected by its username and password. Public PostHog dashboard links are intentionally read-only: anyone who has the exact link can open that dashboard directly. Turn off public sharing on the dashboard in PostHog to revoke that access.
