"use client"

import type { JSX } from "react"
import { useSyncExternalStore } from "react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import { MonitorIcon, SunIcon, MoonIcon, PlayOff } from "lucide-react"
import { useTranslations } from "next-intl"
import { switchOnSound } from "../lib/switch-on"
import { useSound } from "../hooks/soundcn/use-sound"
import { switchOffSound } from "../lib/switch-off"

function ThemeOption({
  icon,
  value,
  isActive,
  onClick,
}: {
  icon: JSX.Element
  value: string
  isActive?: boolean
  onClick: (value: string) => void
}) {
  const t = useTranslations('common')

  return (
    <button
      data-active={isActive}
      className="relative flex size-8 items-center justify-center rounded-full text-muted-foreground transition-[color] hover:text-foreground data-[active=true]:text-foreground [&_svg]:size-4"
      role="radio"
      aria-checked={isActive}
      aria-label={t('themeAria', {value})}
      onClick={() => onClick(value)}
    >
      {icon}

      {isActive && (
        <motion.span
          layoutId="theme-option"
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="absolute inset-0 rounded-full border"
        />
      )}
    </button>
  )
}

const THEME_OPTIONS = [
  {
    icon: (
      <MonitorIcon
      />
    ),
    value: "system",
  },
  {
    icon: (
      <SunIcon
      />
    ),
    value: "light",
  },
  {
    icon: (
      <MoonIcon
      />
    ),
    value: "dark",
  },
]

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [playOn] = useSound(switchOnSound)
  const [playOff] = useSound(switchOffSound)

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!isMounted) {
    return <div className="flex h-8 w-24" />
  }

  const changeTheme = (value: string) => {
    setTheme(prev => {
      if (prev !== value){
        switch (value) {
          case "dark":
            playOff({ volume: .4})
            break
          case "light":
            playOn({ volume: .4})
            break
          default:
            playOff({ volume: .4})
            break
        }
      }

      return value
    })


  }

  return (
    <motion.div
      key={String(isMounted)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center overflow-clip rounded-full bg-background inset-ring-1 inset-ring-border"
      role="radiogroup"
    >
      {THEME_OPTIONS.map((option) => (
        <ThemeOption
          key={option.value}
          icon={option.icon}
          value={option.value}
          isActive={theme === option.value}
          onClick={changeTheme}
        />
      ))}
    </motion.div>
  )
}

export { ThemeSwitcher }
