import { Metadata } from "next"
import { getLocale, getTranslations } from "next-intl/server"

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('notFound')
  return {
    title: t('title'),
  }
}

export default async function NotFound(){
  const locale = await getLocale()
  const t = await getTranslations({locale, namespace: 'notFound'})

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-5xl font-mono font-medium">{t('description')}</h1>
    </div>
  )
}
