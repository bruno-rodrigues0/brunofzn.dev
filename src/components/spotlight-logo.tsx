"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"
import { cn } from "../lib/utils"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/**
 * An SVG mark whose outline is traced by a gradient highlight that follows the
 * cursor, paired with a springy press effect and a tactile click sound.
 *
 * Swap the SVG paths below for your own artwork. The interaction is driven by:
 * - a `radialGradient` whose center springs toward the pointer (the spotlight),
 *   reused as a second stroke layered over the base outline.
 * - `whileTap="pressed"` morphing the path `d` values between two states.
 *
 * The demo mark was designed by ncdai on Figma with the
 * [Fast Isometric Plugin](https://www.figma.com/community/plugin/1249759048471403961).
 * Inspired by tailwindcss.com.
 */

export function SpotlightLogo({className, onClick}: {className?: string, onClick: () => void}) {
  const id = useId()
  const ids = {
    facePattern: `spotlight-logo-face-pattern-${id}`,
    faceFill: `spotlight-logo-face-fill-${id}`,
    faceStroke: `spotlight-logo-face-stroke-${id}`,
    stroke: `spotlight-logo-stroke-${id}`,
    radialGradient: `spotlight-logo-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 264]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 156]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className={cn(
        "w-full h-auto object-contain touch-manipulation [--pattern:color-mix(in_oklab,var(--foreground)_16%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_25%,var(--background))]",
        className
      )}
      viewBox="0 0 264 152"
      width={264}
      height={152}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => {play(); onClick()}}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="1"
          height="1"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.g
          id={ids.faceFill}
          variants={{
            normal: {
              y: 0,
            },
            pressed: {
              y: 8,
            },
          }}
          transition={transition}
        >
          <path d="M96.9948 120L124.708 104L138.564 112L96.9948 136L27.7128 96L69.282 72L83.1384 80L55.4256 96L69.282 104L96.9948 88L110.851 96L83.1384 112L96.9948 120ZM110.851 80L96.9948 88L83.1384 80L96.9948 72L110.851 80ZM138.564 96L124.708 104L110.851 96L124.708 88L138.564 96ZM124.708 56L110.851 48L152.42 24L166.277 32L124.708 56ZM124.708 72L110.851 64L124.708 56L138.564 64L124.708 72ZM138.564 64L166.277 48L180.133 56L152.42 72L138.564 64ZM207.846 56L193.99 64L180.133 56L193.99 48L207.846 56ZM193.99 64L207.846 72L166.277 96L152.42 88L193.99 64Z"/>
        </motion.g>

        <motion.g
          id={ids.faceStroke}
          variants={{
            normal: {
              y: 0,
            },
            pressed: {
              y: 8,
            },
          }}
          transition={transition}
          strokeWidth={.5}
        >
          <path d="M96.9948 120L124.708 104L138.564 112L96.9948 136L27.7128 96L69.282 72L83.1384 80L55.4256 96L69.282 104L96.9948 88L110.851 96L83.1384 112L96.9948 120ZM110.851 80L96.9948 88L83.1384 80L96.9948 72L110.851 80ZM138.564 96L124.708 104L110.851 96L124.708 88L138.564 96ZM124.708 56L110.851 48L152.42 24L166.277 32L124.708 56ZM124.708 72L110.851 64L124.708 56L138.564 64L124.708 72ZM138.564 64L166.277 48L180.133 56L152.42 72L138.564 64ZM207.846 56L193.99 64L180.133 56L193.99 48L207.846 56ZM193.99 64L207.846 72L166.277 96L152.42 88L193.99 64Z"/>
        </motion.g>

        <motion.path
          id={ids.stroke}
          fillRule={"evenodd"}
          clipRule={"evenodd"}
          strokeLinejoin= "round"
          strokeWidth={.3}
          variants={{
            normal: {
              d: [

                "M138.564 112L96.9948 136L27.7128 96V106L96.9948 146L138.564 122V112Z",
                "M83.1384 80L55.4256 96V106L83.1384 90V80Z",
                "M110.851 96L83.1384 112V122L110.851 106V96Z",
                "M110.851 80L96.9948 88L83.1384 80V90L96.9948 98L110.851 90V80Z",
                "M138.564 96L124.708 104L110.851 96V106L124.708 114L138.564 106V96Z", // B

                "M166.277 32L124.708 56L110.851 48V58L124.708 66L166.277 42V32Z",
                "M138.564 64L124.708 72L110.851 64V74L124.708 82L138.564 74V64Z",
                "M180.133 56L152.42 72L138.564 64V74L152.42 82L180.133 66V56Z",
                "M207.846 56L193.99 64L180.133 56V66L193.99 74L207.846 66V56Z",
                "M207.846 72L166.277 96L152.42 88V98L166.277 106L207.846 82V72Z", // S


              ].join(""),
            },
            pressed: {
              d: [
                "M138.564 120 L96.9948 144 L27.7128 104 V106 L96.9948 146 L138.564 122 V122Z",
                "M83.1384 88  L55.4256 104 V106 L83.1384 90 V88Z",
                "M110.851 104 L83.1384 120 V122 L110.851 106 V104Z",
                "M110.851 88  L96.9948 96  L83.1384 88 V90 L96.9948 98 L110.851 90 V88Z",
                "M138.564 104 L124.708 112 L110.851 104 V106 L124.708 114 L138.564 106 V104Z", // B

                "M166.277 40 L124.708 64 L110.851 56 V58L124.708 66 L166.277 42 V40Z",
                "M138.564 72 L124.708 80 L110.851 72 V74L124.708 82 L138.564 74 V72Z",
                "M180.133 64 L152.42  80 L138.564 72 V74L152.42  82 L180.133 66 V64Z",
                "M207.846 64 L193.99  72 L180.133 64 V66L193.99  74 L207.846 66 V64Z",
                "M207.846 80 L166.277 104 L152.42 96 V98L166.277 106 L207.846 82 V80Z" // S
              ].join(""),
            },
          }}
          transition={transition}
        />

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#999]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <use href={`#${ids.stroke}`} fill="var(--background)" fillRule="evenodd" clipRule="evenodd" />
      <use href={`#${ids.stroke}`} stroke="var(--stroke)" />
      <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} />

      <use href={`#${ids.faceStroke}`} fill="var(--background)" fillRule="evenodd" clipRule="evenodd" />
      <use href={`#${ids.faceStroke}`} stroke="var(--stroke)" />
      <use href={`#${ids.faceStroke}`} stroke={`url(#${ids.radialGradient})`} />

      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />
    </motion.svg>
  )
}
