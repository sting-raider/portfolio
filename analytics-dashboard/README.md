# Private portfolio analytics

This is a separate server-rendered Next.js app for the owner-only analytics console. It is intentionally not part of the GitHub Pages static export because credentials and the Umami API key must remain server-side.

## Data collected

- Anonymous pageviews and unique visits
- Route, entry, exit, and referrer metrics
- Country, device, browser, and operating-system aggregates
- Named interactions such as `resume-download`
- Current active-visitor count

No session recording, heatmap, advertising identifier, or form-field content is collected.

## Local setup

1. Add the public portfolio as a website in [Umami Cloud](https://cloud.umami.is/).
2. Copy `.env.example` to `.env.local`.
3. Run `npm run hash-password`, then put its result in `ADMIN_PASSWORD_HASH`.
4. Generate a long random `SESSION_SECRET`.
5. Add the Umami website ID and private API key.
6. Run `npm install` and `npm run dev`.

## Deployment

Deploy this directory as a separate Vercel project with `analytics-dashboard` as its root directory. Add every `.env.example` variable in the Vercel project settings. Do not expose `UMAMI_API_KEY`, `ADMIN_PASSWORD_HASH`, or `SESSION_SECRET` as `NEXT_PUBLIC_*`.

For the strictest access policy, set `TRUSTED_IPS` to the public IP addresses you use. Without it, the login page is internet-visible but the dashboard data remains protected by the password.
