import { defineRouting } from "next-intl/routing"
import { US, BR } from 'country-flag-icons/react/3x2'
import { ReactNode } from "react"

export const routing = defineRouting({
  locales: ['en', 'pt-BR'],
  defaultLocale: 'pt-BR',
  localePrefix: 'as-needed',
  alternateLinks: true
})

type LocaleName = {
  name: string
  tag: string
  flag: ReactNode
}

export const localeNames: Record<string, LocaleName> = {
  en: {
    name: "English",
    tag: "EN",
    flag: <US />,
  },
  "pt-BR": {
    name: "Português",
    tag: "PT",
    flag: <BR />,
  }
}
