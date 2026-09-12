"use client"

import { useTiks } from "@rexa-developer/tiks/react"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useRef } from "react"

type AvatarLights = "on" | "off"

const lightsAtom = atomWithStorage<AvatarLights>("avatarLights", "off")

export function useAvatarLights() {
  const { resolvedTheme } = useTheme()
  const [lights, setLights] = useAtom(lightsAtom)
  const { toggle: tiksToggle } = useTiks()

  const toggleLights = useCallback(() => {
    const nextLights: AvatarLights = lights === "off" ? "on" : "off"
    document.documentElement.dataset.avatarLights = nextLights
    setLights(nextLights)
    tiksToggle(nextLights === "on")
  }, [lights, setLights, tiksToggle])

  const initialLightRef = useRef(lights)
  useEffect(() => {
    document.documentElement.dataset.avatarLights = initialLightRef.current
  }, [])

  const toggleLightsRef = useRef(toggleLights)

  useEffect(() => {
    toggleLightsRef.current = toggleLights
  }, [toggleLights])

  const prevThemeRef = useRef(resolvedTheme)
  useEffect(() => {
    const prevTheme = prevThemeRef.current
    prevThemeRef.current = resolvedTheme
    if (prevTheme !== undefined && prevTheme !== resolvedTheme) {
      toggleLightsRef.current()
    }
  }, [resolvedTheme])

  return { toggleLights }
}
