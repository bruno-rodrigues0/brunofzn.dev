"use client"
import { Analytics } from "@vercel/analytics/next"

export const AnalyticsProvider = () => {
  return (
    <Analytics
      beforeSend={(event) => {
        if (localStorage.getItem("skip-analytics") === "true") {
          return null
        }
        return event
      }}
    />
  )
}

