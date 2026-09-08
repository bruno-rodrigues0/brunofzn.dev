"use client"

import { useState } from "react"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useTranslations } from "next-intl"


export default function AboutMe(){
  const t = useTranslations('about')
  const tc = useTranslations('common')
  const time = Number(new Date().toLocaleTimeString("pt-BR", {
    hour: 'numeric'
  }))

  const [showMore, setShowMore] = useState<boolean>(false)

  const getGreeting = () => {
    if (time >= 6 && time < 12) {
      return "morning"
    } else if (time >= 12 && time < 18) {
      return "afternoon"
    } else {
      return "evening"
    }
  }

  const [greeting] = useState<string>(getGreeting())

  return (
    <section id="about" className="border-x border-line w-full pt-8 p-4">
      <div>
        <h2 className="font-handwrite text-3xl font-bold text-balance">{t(`greetings.${greeting}`)}!</h2>
      </div>

      <Separator className="absolute left-0"/>

      <div className="py-4">
        <ul className="list-disc marker:text-zinc-700  marker:text-lg space-y-3 list-inside">
          {(t.raw('paragraphs') as string[]).map((phrase, index) => {
            if ((index > 2 && showMore) || index <= 2) {
              return (<li key={index} className="text-sm font-medium">{phrase}</li>)
            }
          }
          )}
        </ul>
      </div>

      <Separator className="absolute left-0" />
      <div className="flex justify-center pt-4">
        <Button onClick={() => setShowMore(prev => !prev)} variant="secondary" className="rounded-sm border-2 border-primary-foreground transition-all">
          {showMore ? tc('showLess') : tc('showMore')} {showMore ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

    </section>
  )
}
