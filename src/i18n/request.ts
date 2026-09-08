import * as rootParams from "next/root-params"
import { getRequestConfig } from 'next-intl/server'
import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
 
export default getRequestConfig(async () => {
  let locale = await rootParams.locale();

  if (!locale) {
    locale = routing.defaultLocale
  }

  if(!hasLocale(routing.locales, locale)) {
    notFound()
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
