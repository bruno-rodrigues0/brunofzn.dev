"use client"

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { PROJECTS } from "@/constants";
import { Separator } from "../ui/separator";
import ProjectCollapsible from "./projectCollapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSound } from "../../hooks/soundcn/use-sound";
import { click004Sound } from "../../lib/click-004";
import { click005Sound } from "../../lib/click-005";

export default function Projects() {
  const [showMore, setShowMore] = useState<boolean>(false)
  const t = useTranslations("projects")
  const tc = useTranslations("common")
  const [playOn] = useSound(click004Sound)
  const [playOff] = useSound(click005Sound)
const handleShowMore = () => { setShowMore(prev => { const newValue = !prev

      if (newValue) {
        playOn({ volume: .3 })
      } else {
        playOff({ volume: .3 })
      }

      return newValue
    })
  }

  return (
    <section className="border-x border-line pt-8 p-4" id="projects">
      <h2 className="text-4xl font-medium text-balance">{t('title')}<span className="text-base text-muted-foreground align-text-top">({PROJECTS.length})</span> </h2>
      <Separator className="absolute left-0"/>

      <ul>
        {PROJECTS.slice(0, 3).map((project, index) => (
          <ProjectCollapsible key={project.key} project={project} defaultOpen={index == 0 ? true : false}/>
        ))}
      </ul>

      <AnimatePresence>
        {showMore && <motion.ul
          initial={{ opacity: 0, height: 0}}
          animate={{ opacity: 1, height: "auto"}}
          exit={{ opacity: 0, height: 0}}
          transition={{ duration: .2 }}
        >
          {PROJECTS.slice(3).map((project) => (
            <ProjectCollapsible key={project.key} project={project} defaultOpen={false}/>
          ))}
        </motion.ul>}
      </AnimatePresence>

      {PROJECTS.length > 2 ?
        <div className="flex justify-center pt-4">
          <Button onClick={handleShowMore} variant="secondary" className="rounded-sm border-2 border-primary-foreground transition-all">
            {showMore ? tc('showLess') : tc('showMore')} {showMore ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div> 
        : ""
      }

    </section>
  )
}

