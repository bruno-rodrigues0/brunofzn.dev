import { Link } from "@/i18n/navigation"
import { ReactNode } from "react";
import { GithubIcon, LinkedInIcon, WhatsappIcon } from "../icons";
import { USER } from "@/constants/user";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";


export default function SocialLinks(){
  return (
    <section className="border-x p-2 flex" id="social-links">
      <ul className="flex gap-2 p-2">
        <SocialLink href={USER.githubUrl} label="Github">
          <GithubIcon className="w-5 h-5"/>
        </SocialLink>

        <SocialLink href={USER.linkedIn} label="LinkedIn" >
          <LinkedInIcon className="w-5 h-5"/>
        </SocialLink>

        <SocialLink href={USER.whatsapp} label="Whatsapp">
          <WhatsappIcon className="w-5 h-5"/>
        </SocialLink>
      </ul>
    </section>
  )
}

export function SocialLink({children, href, label}: {children: ReactNode, href: string, label: string}) {
  return (
    <li className="border border-line rounded-sm p-1.5 bg-primary-foreground">
      <HoverCard>
        <HoverCardTrigger render={<div></div>} delay={0} closeDelay={0}>
          <Link href={href} target="_blank" aria-label={label} >
            {children}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit mt-2">
          {label}
        </HoverCardContent>
      </HoverCard>
    </li>
  )
}
