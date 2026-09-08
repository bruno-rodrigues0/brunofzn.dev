"use client"

import { PROJECTS } from "@/constants";
import { Separator } from "../ui/separator";
import ProjectCollapsible from "./projectCollapsible";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Projects() {
  const [showMore, setShowMore] = useState<boolean>(false)
  const t = useTranslations("projects")

  return (
    <section className="border-x border-line pt-8 p-4" id="projects">
      <h2 className="text-4xl font-medium text-balance">{t('title')}<span className="text-base text-muted-foreground align-text-top">({PROJECTS.length})</span> </h2>
      <Separator className="absolute left-0"/>

      <ul>
        {PROJECTS.map((project, index) => {
          if ((index > 2 && showMore) || (index <= 2)) {
            return <ProjectCollapsible key={project.key} project={project} defaultOpen={index == 0 ? true : false}/>
          } 
        })}
      </ul>

      {PROJECTS.length > 2 ?
        <div className="flex justify-center pt-4">
          <Button onClick={() => setShowMore(prev => !prev)} variant="secondary" className="rounded-sm border-2 border-primary-foreground transition-all">
            Show {showMore ? "less" : "more"} {showMore ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div> 
        : ""
      }

    </section>
  )
}

