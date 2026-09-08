import { NameGradient } from "@/components/site/name-gradient";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative isolate">
      <SiteHeader/>
      <main className="max-w-screen px-2"> {children} </main>
      <SiteFooter /> 
      <NameGradient/>
      <ScrollToTop className="w-8 h-8"/>
    </div>
  )
}

