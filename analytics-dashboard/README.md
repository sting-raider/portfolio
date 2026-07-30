# Portfolio analytics console

This is a separate server-rendered Next.js app for the login-gated Alphys analytics console. It embeds the free, read-only Umami Share report and does not require a paid Umami Cloud API key.

## Data collected

- Anonymous pageviews and unique visits
- Route, entry, exit, and referrer metrics
- Country, device, browser, and operating-system aggregates
- Named interactions such as `resume-download`
- Current active-visitor count

No session recording, heatmap, advertising identifier, or form-field content is collected.

## Local setup

1. Add the public portfolio as a website in [Umami Cloud](https://cloud.umami.is/).
2. In Umami, create a Share URL with the views you want available.
3. Copy `.env.example` to `.env.local` and set `UMAMI_SHARE_URL`.
4. Run `npm run hash-password`, then put its result in `ADMIN_PASSWORD_HASH`.
5. Generate a long random `SESSION_SECRET`.
6. Run `npm install` and `npm run dev`.

UMAMI_SHARE_URL must be configured in the deployment environment. Do not commit the real Share URL to the repository.

## Deployment

Deploy this directory as a separate Vercel project with `analytics-dashboard` as its root directory. Add the owner credential variables from `.env.example` in the Vercel project settings. Do not expose `ADMIN_PASSWORD_HASH` or `SESSION_SECRET` as `NEXT_PUBLIC_*`.

For the strictest access policy, set `TRUSTED_IPS` to the public IP addresses you use. Without it, the login page is internet-visible, but the themed console remains protected by the password.

## Share-link privacy

The Alphys console remains protected by its username and password. Umami Share URLs themselves are intentionally public and read-only: anyone who has the exact Share URL can open the underlying Umami report directly. Delete or regenerate the Share URL in Umami to revoke that access.
