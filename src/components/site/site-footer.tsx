"use client"

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { BSMark } from "../bs-mark";
import { Link } from "@/i18n/navigation";
import { Separator } from "../ui/separator";
import { DOMAIN, SITE_URL, SOURCECODE } from "@/lib/site-config";
import { GithubIcon, LinkedInIconSolid, VercelIcon, WhatsappIcon } from "../icons";
import { format } from "date-fns";
import { USER } from "../../constants/user";

const INSPIRE_BY = ["Tailwind CSS", "shadcn/ui", "Vercel", "chanhdai.com"]

export function SiteFooter() {
  const locale = useLocale()
  const [date] = useState(format(new Date().toLocaleDateString(), locale === "pt-BR" ?  'dd.MM.yyyy' : 'MM.dd.yyyy',))
  const t = useTranslations('footer')

  return (
    <>
      <footer className="border-x border-line pt-8 max-w-180 mx-auto text-sm" id="credits">
        <div className="flex justify-between px-4 py-2 flex-wrap items-center">
          <p><Link href={SITE_URL} className="underline text-primary">{DOMAIN}</Link></p>
          <p className="text-ring text-xs">{t('caption')}</p>
        </div>

        <Separator className="absolute left-0" />

        <div className="flex max-sm:flex-col">
          <div className="flex flex-col flex-1 p-4 gap-2 justify-center border-b border-r border-muted">
            <span className="text-xs text-ring font-mono ">{t('createdBy')}</span>
            <p><Link href={USER.githubUrl} className="underline" target="_blank">@{USER.username}</Link></p>
          </div>

          <div className="flex flex-col flex-1 p-4 gap-2 justify-center border-b border-r border-muted">
            <span className="text-xs text-ring font-mono ">{t('date')}</span>
            <p>{date}</p>
          </div>

          <div className="flex flex-col flex-1 p-4 gap-2 justify-center border-b border-r border-muted">
            <span className="text-xs text-ring font-mono ">{t('deployedOn')}</span>
            <Link href="https://vercel.com" target="_blank" aria-label="Vercel">
              <p>
                <VercelIcon className="size-4"/>
              </p>
            </Link>
          </div>

          <div className="flex flex-col flex-1 p-4 gap-2 justify-center border-b border-muted">
            <span className="text-xs text-ring font-mono ">{t('sourceCode')}</span>
            <p><Link href={SOURCECODE} className="underline" target="_blank">Github</Link> </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-1 p-4 pb-0 gap-2  border-muted">
            <span className="text-xs text-ring font-mono ">{t('inspiredBy')}</span>
          </div>

          <div className="flex flex-wrap">
            {INSPIRE_BY.map((inspiration, index) => (
              <div key={index} className="flex flex-1 p-4 gap-2 text-nowrap border-muted">
                <span className="text-ring font-semibold font-mono">0{index} </span> {inspiration}
              </div>
            ))}
          </div>
        </div>

        <Separator className="absolute left-0" />

        <div className="flex px-4 py-1 justify-between">
          <BSMark className="w-7"/>
          <ul className="flex gap-3 p-2 items-center">
            <li>
              <Link href={USER.githubUrl} target="_blank" aria-label="Github">
                <GithubIcon className="size-4"/>
              </Link>
            </li>

            <li>
              <Link href={USER.linkedIn} target="_blank" aria-label="LinkedIn">
                <LinkedInIconSolid className="size-4"/>
              </Link>
            </li>

            <li>
              <Link href={USER.whatsapp} target="_blank" aria-label="Whatsapp">
                <WhatsappIcon className="size-4"/>
              </Link>
            </li>
          </ul>
        </div>

      </footer>
      <Separator className="absolute left-0" />
    </>
  )
}
