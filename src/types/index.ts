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
