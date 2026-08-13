import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jayanthmurala.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();
  return [
    { url: SITE, lastModified: updated, priority: 1 },
    { url: `${SITE}/work`, lastModified: updated, priority: 0.9 },
    { url: `${SITE}/about`, lastModified: updated, priority: 0.8 },
    { url: `${SITE}/contact`, lastModified: updated, priority: 0.7 },
  ];
}
