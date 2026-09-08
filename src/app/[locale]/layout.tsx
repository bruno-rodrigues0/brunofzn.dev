import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AUTHOR, LINKS, OPENGRAPH_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { URL } from "url";
import { routing } from "../../i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

const handwrite = Caveat({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-handwrite"
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#bruno`,
      name: "Bruno Silva",
      alternateName: "bruno-rodrigues0",
      jobTitle: "Web Developer",
      url: SITE_URL,
      image: new URL(OPENGRAPH_IMAGE, SITE_URL).toString(),
      email: "brunorodriguesmtv0@gmail.com",
      knowsLanguage: ["English", "Portuguese"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Recife",
        addressRegion: "PE",
        addressCountry: "BR",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "CIn - UFPE",
      },
      sameAs: [
        LINKS.githubProfile,
        LINKS.linkedIn,
        LINKS.whatsapp,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      inLanguage: "en",
      mainEntity: { "@id": `${SITE_URL}/#bruno` },
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async (): Promise<Metadata> => { 
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "metadata"})

  return {
    title: t("title"),
    description: t("description"),
    creator: AUTHOR,
    authors: {name: AUTHOR, url: SITE_URL},
    category: "portfolio",
    keywords: [
      "next.js developer", "portfolio", "shadcnui",
      "pixel-perfect", "web developer",
      "recife", "typescript developer", "backend developer",
      "frontend developer", "full stack",
    ],
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        "pt-BR": "/",
        en: "/en"
      }
    },
    metadataBase:  new URL(SITE_URL),
    applicationName: SITE_NAME,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
      }
    },

    openGraph: {
      title: t('title'),
      description: t('description'),
      url: SITE_URL,
      siteName: t('siteName'),
      images: [
        {
          url: OPENGRAPH_IMAGE,
          width: 1164,
          height: 654,
          alt: "Photo of Bruno Silva"
        }
      ],
      locale,
      type: "website",
    }
  }
};

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale()
  
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${handwrite.variable} h-full antialiased scroll-smooth selection:bg-primary selection:text-secondary overflow-x-hidden`}
      suppressHydrationWarning
    >
        <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
          <Analytics />
          <SpeedInsights />
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <NextIntlClientProvider>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
    </html>
  );
}
