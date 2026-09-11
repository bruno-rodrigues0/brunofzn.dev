"use client"

import { useLocale, useTranslations } from "next-intl";
import { ReactNode, useEffect, useState } from "react";
import { Clock, CodeXml, Link, LucideProps, Mail, MapPin, Mars, Phone} from "lucide-react";
import { USER } from "@/constants/user";
import { DOMAIN } from "@/lib/site-config";

const localeOpts: Intl.DateTimeFormatOptions = {timeZone: USER.timeZone, hour: 'numeric', minute: 'numeric'}

export default function Overview(){
  const t = useTranslations("overview")
  const locale = useLocale()
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString(locale, localeOpts))
    update()

    const timerId = setInterval(update, 5000);
    return () => clearInterval(timerId);
  }, [locale])

  return (
    <section className="border-x border-line pt-12 p-4 grid grid-cols-2 max-sm:grid-cols-1 gap-4">
      <div>
        <dl className="flex flex-col gap-4 font-sans">
          <OverviewItem term={t("job")} text={t("jobValue")}> <CodeXml size={15}/> </OverviewItem>
          <OverviewItem term={t("location")} text={t("locationValue")}> <MapPin size={15}/> </OverviewItem>
          <OverviewItem term={t("email")} text={atob(USER.emailEncoded)}> <Mail size={15}/> </OverviewItem>
          <OverviewItem term={t("phone")} text={atob(USER.phoneNumberEncoded)}> <Phone size={15}/> </OverviewItem>
          <OverviewItem term="Site" text={DOMAIN}> <Link size={15}/> </OverviewItem>
        </dl>
      </div>

      <div className="flex items-end">
        <dl className="flex flex-col gap-4 font-mono">
          <OverviewItem term={t("time")} text={(
            <>{time} <span className="text-muted-foreground">(GMT-03)</span></>
          )}><Clock size={15}/></OverviewItem>
          <OverviewItem term={t("pronouns")} text={t("pronounsValue")}><Mars size={15}/></OverviewItem>
        </dl>
      </div>
    </section>
  )
}

export function OverviewItem({children, term, text}: {children: ReactNode, term:string, text:string | ReactNode}) {
  return(
    <div className="flex gap-2 items-center text-sm font-medium">
      <IconBox> {children} </IconBox>
      <dt className="sr-only">{term}</dt>
      <dd>
        {text}
      </dd>
    </div>
  )
}

export function IconBox({children}: LucideProps){
  return (
    <div className="border rounded-sm bg-primary-foreground p-1 w-fit flex justify-center items-center">
      {children}
    </div>
  )
}
