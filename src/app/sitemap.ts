import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";

const routes = [
  "/",
  "/aktivasi",
  "/panduan",
  "/faq",
  "/troubleshooting",
  "/status",
  "/sistem",
  "/donasi",
  "/kontribusi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));
}
