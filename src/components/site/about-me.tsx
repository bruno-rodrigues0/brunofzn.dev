"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { ChevronDown, ChevronUp } from "lucide-react"
import { AnimatePresence } from "motion/react"
import { motion } from "motion/react"
import { useSound } from "../../hooks/soundcn/use-sound"
import { click004Sound } from "../../lib/click-004"
import { click005Sound } from "../../lib/click-005"

export default function AboutMe(){
  const t = useTranslations('about')
  const tc = useTranslations('common')
  const [playOn] = useSound(click004Sound)
  const [playOff] = useSound(click005Sound)
  const [showMore, setShowMore] = useState<boolean>(false)
  const paragraphs = t.raw('paragraphs') as string[]
  const time = Number(new Date().toLocaleTimeString("pt-BR", {
    hour: 'numeric'
  }))


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

  const handleShowMore = () => {
    setShowMore(prev => {
      const newValue = !prev

      if (newValue) {
        playOn({ volume: .3 })
      } else {
        playOff({ volume: .3 })
      }

      return newValue
    })
  }

  return (
    <section id="about" className="border-x border-line w-full pt-8 p-4">
      <div>
        <h2 className="font-handwrite text-3xl font-bold text-balance">{t(`greetings.${greeting}`)}!</h2>
      </div>

      <Separator className="absolute left-0"/>

      <div className="py-4">
        <ul className="list-disc marker:text-zinc-700  marker:text-lg space-y-3 list-inside transition-[height]">
          {paragraphs.slice(0, 3).map((phrase, index) => (
            <li key={index} className="text-sm font-medium">{phrase}</li> 
          ))}
        </ul>

        <AnimatePresence>
          {showMore &&
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: .2 }}
              className="list-disc marker:text-zinc-700  marker:text-lg space-y-3 list-inside mt-2"
            >
              {paragraphs.slice(3).map((phrase, index) => (
                <li key={index} className="text-sm font-medium overflow-hidden">
                  {phrase}
                </li>
              ))}
            </motion.ul>
          }
        </AnimatePresence>
      </div>

      <Separator className="absolute left-0" />
      <div className="flex justify-center pt-4">
        <Button onClick={handleShowMore} variant="secondary" className="rounded-sm border-2 border-primary-foreground transition-all">
          {showMore ? tc('showLess') : tc('showMore')} {showMore ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

    </section>
  )
}
