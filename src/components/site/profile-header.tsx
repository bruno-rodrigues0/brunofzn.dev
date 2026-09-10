import Image from "next/image";
import Me from "@public/me.webp"
import { Verified } from "lucide-react";
import { TextFlip } from "../text-flip";
import { Separator } from "../ui/separator";
import { SpotlightLogo } from "../spotlight-logo";
import { getTranslations } from "next-intl/server";
import { USER } from "../../constants/user";

export default async function ProfileHeader() {
  const t = await getTranslations("tagLine")

  return (
    <section id="profile-header" className="screen-line-bottom grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x border-line">
      <div className=" w-full h-87 max-sm:h-52 col-span-2 p-2 sm:col-span-1 sm:col-start-2 sm:p-4">
        <figure className="absolute w-xl max-sm:w-full max-sm:max-w-80 h-80 max-sm:h-30 top-15 left-[54%] max-sm:left-1/2 -translate-x-1/2 col-span-2 p-2 z-20 flex items-center justify-center">
          <div className="max-sm:hidden">
              <div className="absolute rotate-30 border-t border-secondary w-250 top-40 right-44 -z-10"></div>
              <div className="absolute rotate-30 border-t border-secondary w-250 top-40 -right-55.5 -z-10"></div>
              <div className="absolute -rotate-30 border-t border-secondary w-200 top-35 left-33 -z-10"></div>
          </div>
          <div className="w-full h-full max-sm:max-h-25 z-20">
            <SpotlightLogo/>
          </div>
          <figcaption className="pointer-events-none absolute right-0 bottom-0 text-sm leading-none tracking-wide text-zinc-500 tabular-nums select-none max-sm:hidden">Fig. 1.</figcaption>
        </figure>
      </div>

      <div className="flex flex-col sm:row-span-2 sm:row-start-1">
        <div className="screen-line-top mt-auto shrink-0 border-r border-line">
          <Separator className="absolute left-0 w-screen -z-10"/>
          <div className="group/avatar-lights-toggle mx-0.5 my-0.75 flex outline-none">
            <Image
              className="ring-border ring-offset-background rounded-full w-33 h-33 p-1"
              loading="eager"
              src={Me}
              alt="Photo of Bruno Silva"
            />
          </div >
        </div>
      </div>

      <div className="flex flex-col relative z-20">
        <div className="z-1 mt-auto border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-[2rem]/none tracking-tight font-extrabold z-100">
              {USER.firstName} {USER.lastName}
            </h1>

            <Verified className="size-4.5 select-none" aria-hidden />
          </div>

          <div className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            <TextFlip className="text-sidebar-ring">
              {(t.raw('lines') as string[]).map((line, i) => (
                <span key={i}>{line}</span>
              ))
              }
            </TextFlip>
          </div>
        </div>
      </div>
    </section>
  )
}
