import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ['en', 'pt_BR'],
  defaultLocale: 'pt_BR',
  localePrefix: 'as-needed'
})
