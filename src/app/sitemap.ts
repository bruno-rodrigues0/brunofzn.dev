import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { routing } from "../i18n/routing";

function pathForLocale(locale: string) {
  return locale === routing.defaultLocale ? "" : `/${locale}`
}

export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map(locale => [locale, `${SITE_URL}${pathForLocale(locale)}`])
  )

  return routing.locales.map(locale => ({
    url: `${SITE_URL}${pathForLocale(locale)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: {
        ...languages,
        "x-default": `${SITE_URL}${pathForLocale(routing.defaultLocale)}`
      },
    },
  }))
}
