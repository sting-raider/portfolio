import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sting-raider.github.io/portfolio";
  const routes = ["", "/quick", "/about", "/projects", "/skills", "/journey", "/contact", "/lab", "/resume"];
  return [...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })), ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date() }))];
}
