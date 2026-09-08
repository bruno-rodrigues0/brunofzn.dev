import { NavigationMenu, NavigationMenuLink, NavigationMenuList, NavigationMenuItem} from "../ui/navigation-menu";
import { BSMark } from "../bs-mark";
import { Separator } from "../ui/separator";
import { ThemeSwitcher } from "../theme-switcher";
import { ReactNode } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { LanguagePicker } from "../language-picker";


export default async function SiteHeader(){
  const t = await getTranslations("navigation")

  return (
    <>
      <header className="sticky top-0 z-50 h-auto py-2 items-center bg-background">
        <div className="flex justify-between max-w-180 mx-auto px-2">
          <Link href="/" className="content-center" aria-label="Logo">
            <BSMark/>
          </Link>

          <div className="flex gap-2 items-center">
            <NavigationMenu className="max-sm:hidden">
              <NavigationMenuList className="w-full flex justify-between">

                <NavItem href="#about">{t("about")}</NavItem>
                <NavItem href="#social-links">{t("contacts")}</NavItem>
                <NavItem href="#projects">{t("projects")}</NavItem>
                <NavItem href="#credits">{t("credits")}</NavItem>

              </NavigationMenuList>

            </NavigationMenu>

            <Separator orientation="vertical" className="h-[70%] mt-1 max-sm:hidden"/>

            <LanguagePicker />

            <HoverCard>
              <HoverCardTrigger delay={.1}>
                <ThemeSwitcher/>
              </HoverCardTrigger>

              <HoverCardContent className="w-fit">
                <span>{t("theme")}</span>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </header>
      <Separator className="fixed mt-2 left-0 top-10 z-100"/>
    </>
  )
}

const NavItem = ({children, href}: {children: ReactNode, href: string}) => {
  return (
    <NavigationMenuItem>
        <NavigationMenuLink 
          className="font-mono text-muted-foreground hover:bg-inherit hover:text-primary focus:bg-inherit " 
          href={href}
        >
          {children}
        </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
