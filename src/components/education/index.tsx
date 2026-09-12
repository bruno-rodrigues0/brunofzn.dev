import { Separator } from "@/components/ui/separator";
import { EducationItem } from "./education-item";
import { EDUCATION } from "@/constants";
import { getTranslations } from "next-intl/server";


export default async function Education() {
  const t = await getTranslations('education')
  return (
    <section className="border-x border-line pt-8 p-4 pb-0" id="education">
      <h2 className="text-4xl font-medium text-balance">{t('title')}</h2>
      <Separator className="absolute left-0"/>
      <div className="scroll-mt-14 pr-2">
        {EDUCATION.map((item, index) => (
          <div key={item.key} className="not-last:screen-line-bottom py-2">
            <EducationItem key={item.key} item={item} defaultOpen={index == 0 ? true : false}/>
          </div>
        ))}
      </div>
    </section>
  )
}

