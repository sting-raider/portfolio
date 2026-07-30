const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const resumeDownloadUrl =
  "https://raw.githubusercontent.com/sting-raider/Resume/main/Ali_Sufiyan_Khan_Resume.pdf";

export function assetUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalized}`;
}
