"use client"
import { Check, Circle, Languages } from "lucide-react"
import { Button } from "./ui/button"
import { motion } from "motion/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { routing, localeNames } from "../i18n/routing"
import { Link } from "../i18n/navigation"
import { useLocale } from "next-intl"

const localeList = routing.locales

export function LanguagePicker() {
  const locale = useLocale()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center overflow-clip rounded-full bg-background inset-ring-1 inset-ring-border"
      role="radiogroup"
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit" nativeButton={false} render={<div></div>}>
            <Button variant="outline" className="font-base font-mono text-center text-muted-foreground bg-background! rounded-full">
              <Languages />
              <span>{localeNames[locale].tag}</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col w-fit min-w-25 mt-1">
          {localeList.map((loc) => {
              return (
                <Link key={loc} href="/" locale={loc} className="w-full">
                  <Button variant="ghost" className="flex hover:bg-background w-full justify-start hover:text-primary">
                    {localeNames[loc].flag}
                    <span>{localeNames[loc].name}</span>
                    {loc === locale && <Check className="w-3!"/>}
                  </Button>
                </Link>
              )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
