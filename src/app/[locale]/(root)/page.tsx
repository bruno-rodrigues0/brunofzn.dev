import AboutMe from "@/components/site/about-me";
import Education from "@/components/education";
import GithubContrib from "@/components/github-contrib";
import Overview from "@/components/site/overview";
import ProfileHeader from "@/components/site/profile-header";
import Projects from "@/components/projects";
import SocialLinks from "@/components/site/social-links";
import Stack from "@/components/site/stack";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="max-w-180 mx-auto h-fit">
      <ProfileHeader/>
      <GreatSeparator/>

      <Overview/>
      <Separator className="absolute left-0"/>

      <SocialLinks/>
      <Separator className="absolute left-0"/>

      <GithubContrib/>
      <GreatSeparator />

      <AboutMe />
      <GreatSeparator />
      
      <Stack />
      <GreatSeparator />

      <Projects />
      <GreatSeparator />

      <Education />
      <div className="h-9">
        <GreatSeparator />
      </div>
    </div>
  )
}

export function GreatSeparator(){
  return (
    <div className="absolute w-full left-0">
      <Separator className="absolute left-0 bg-muted"/>
      <div className="h-8 w-full bg-[repeating-linear-gradient(-45deg,var(--primary-foreground)_0px,var(--primary-foreground)_2px,transparent_2px,transparent_8px)] flex justify-center">
      </div>
      <Separator className="absolute left-0 bg-muted"/>
    </div>
  )
}
