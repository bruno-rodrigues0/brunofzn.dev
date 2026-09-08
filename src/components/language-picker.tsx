"use client"
import { Circle, Languages } from "lucide-react"
import { Button } from "./ui/button"
import { motion } from "motion/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { routing } from "../i18n/routing"
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
              <span>{locale}</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-fit min-w-25 mt-1">
          {localeList.map((loc) => {
            if (loc !== locale) {
              return (
                <Link key={loc} href="/" locale={loc} className="w-full">
                  <Button variant="ghost" className="flex hover:bg-background w-full justify-start hover:text-primary">
                    <Circle className="w-3!"/>
                    <span>{loc}</span>
                  </Button>
                </Link>
              )
            } else return (<div key={loc}></div>)
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
