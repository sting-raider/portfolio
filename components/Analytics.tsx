import Script from "next/script";

export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;

  const scriptUrl =
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ||
    "https://cloud.umami.is/script.js";
  const domains =
    process.env.NEXT_PUBLIC_UMAMI_DOMAINS ||
    "sting-raider.github.io";

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      data-domains={domains}
      data-do-not-track="true"
      data-exclude-search="true"
      strategy="afterInteractive"
    />
  );
}
