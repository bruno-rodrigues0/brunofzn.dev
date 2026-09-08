import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "/en",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    }
  ];
}
