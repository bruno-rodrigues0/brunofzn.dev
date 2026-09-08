import { Link } from "@/i18n/navigation"
import { ReactNode } from "react";
import { LINKS } from "@/lib/site-config";
import { GithubIcon, LinkedInIcon, WhatsappIcon } from "../icons";


export default function SocialLinks(){
  return (
    <section className="border-x p-2 flex" id="social-links">
      <ul className="flex gap-2 p-2">
        <SocialLink href={LINKS.githubProfile} label="Github">
          <GithubIcon className="w-5 h-5"/>
        </SocialLink>

        <SocialLink href={LINKS.linkedIn} label="LinkedIn" >
          <LinkedInIcon className="w-5 h-5"/>
        </SocialLink>

        <SocialLink href={LINKS.whatsapp} label="Whatsapp">
          <WhatsappIcon className="w-5 h-5"/>
        </SocialLink>
      </ul>
    </section>
  )
}

export function SocialLink({children, href, label}: {children: ReactNode, href: string, label: string}) {
  return (
    <li className="border border-line rounded-sm p-1.5 bg-primary-foreground">
      <Link href={href} target="_blank" aria-label={label} >
        {children}
      </Link>
    </li>
  )
}
