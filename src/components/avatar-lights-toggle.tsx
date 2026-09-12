"use client"

import React from "react"

import { useAvatarLights } from "@/hooks/use-avatar-lights"

export function AvatarLightsToggle(
  props: Omit<React.ComponentProps<"button">, "onClick">
) {
  const { toggleLights } = useAvatarLights()

  return (
    <button
      aria-label="Toggle Avatar Lights"
      onClick={toggleLights}
      {...props}
    />
  )
}
