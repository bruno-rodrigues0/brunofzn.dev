import { Timezone } from "next-intl"
import { ReactNode } from "react"

export type Project = {
  key: string,
  title: string,
  period: {
    start: string,
    end: string | null
  },
  labels?: string[],
  url: string,
  logo: string | ReactNode
}

export type TechStack = {
  key: string,
  title: string,
  url: string,
  icon: ReactNode
}


export type Education = {
  key: string,
  school: string,
  degree?: string,
  fieldOfStudy?: string,
  period: {
    start: string,
    end: string | null,
  },
  labels ?: string[],
}

export type User = {
  firstName: string
  lastName: string
  fullName: string
  username: string
  knowsLanguage: string[],
  gender: string
  address: {
    city: string
    region: string
    country: string
  }
  phoneNumberEncoded: string
  emailEncoded: string
  website: string
  githubUrl: string,
  linkedIn: string,
  whatsapp: string,
  jobTitle: string
  avatarUrl: string
  timeZone: Timezone
  keywords: string[]

}
