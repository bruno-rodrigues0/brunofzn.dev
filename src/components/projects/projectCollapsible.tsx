"use client"

import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { Project } from "@/types"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Infinity, Link as LinkIcon } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { ChevronsUpDownIcon, ChevronsUpDownIconHandle } from "../chevrons-up-down-icon"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"

export default function ProjectCollapsible({project, defaultOpen = false}: {project: Project, defaultOpen?: boolean}) {
  const [open, setOpen] = useState(defaultOpen)
  const chevronsRef = useRef<ChevronsUpDownIconHandle>(null)
  const {start, end} = project.period
  const t = useTranslations('projects')
  const intro = t(`${project.key}.intro`)
  const bullets = t.raw(`${project.key}.bullets`) as string[]

  useEffect(() => {
    if (defaultOpen) chevronsRef.current?.startAnimation()
  }, [defaultOpen])

  const handleOpen = () => {
    setOpen(prev => !prev)
    if (open) {
      chevronsRef.current?.stopAnimation()
    } else {
      chevronsRef.current?.startAnimation()
    }
  }

  return (
    <li>
      <Collapsible className="py-4 transition-all" defaultOpen={defaultOpen} open={open} onOpenChange={handleOpen}>
        <div className="flex max-w-full items-center">
          <div className="flex-1 flex justify-start">
            <div className="bg-primary-foreground border border-muted rounded-md w-8 h-8 p-2 flex items-center justify-center">
              {project.logo}
            </div>
          </div>

          <CollapsibleTrigger
            render={<div />}
            nativeButton={false}
            className="flex w-full mx-2 pr-2 items-center rounded-md transition-all ease-in-out hover:bg-primary-foreground"
          >
            <dl>
              <div className="w-full flex flex-col justify-start h-auto px-4">
                <dt className="sr-only">{t('srTitle')}</dt>
                <dd>
                  <p className="text-start">{project.title}</p>
                </dd>
                <dt className="sr-only">{t('srPeriod')}</dt>
                <dd>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    {start} - {end ? end : <Infinity width={18}/>}
                  </p>
                </dd>
              </div>
            </dl>

          </CollapsibleTrigger>
            <div className="flex-1 flex justify-end items-center gap-2">
              <HoverCard>
                <HoverCardTrigger delay={.1} href={project.url} target="_blank">
                  <LinkIcon className="w-5.5 h-5.5 p-1"/>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit">
                  <span>{t('goToProject')}</span>
                </HoverCardContent>
              </HoverCard>

              <div className="text-muted-foreground [&_svg]:h-lh [&_svg]:w-4">
                <ChevronsUpDownIcon ref={chevronsRef} className="cursor-pointer"/>
              </div>
            </div>
        </div>

        <CollapsibleContent className="overflow-hidden h-(--collapsible-panel-height) data-[starting-style]:h-0 data-[ending-style]:h-0 transition-[height] duration-300 ease-in-out">
          <div className="py-2">
            <Separator className="absolute left-0"/>

            <div className="pt-4 space-y-4 text-sm">
              <div>
                <p>{intro}</p>
                <ul className="list-disc marker:text-ring list-inside">
                  {bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <span className="flex gap-2 flex-wrap">
                {project.labels?.map((label, index) => (
                  <Badge variant="outline" className="bg-primary-foreground" key={index}>{label}</Badge>
                ))}
              </span>
            </div>

          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator className="absolute left-0"/>
    </li>
  )
}
