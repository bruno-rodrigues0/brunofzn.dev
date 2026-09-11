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
export function SpotlightLogo({onClick}: {onClick: () => void}) {
  const id = useId()
  const ids = {
    facePattern: `spotlight-logo-face-pattern-${id}`,
    faceFill: `spotlight-logo-face-fill-${id}`,
    stroke: `spotlight-logo-stroke-${id}`,
    radialGradient: `spotlight-logo-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
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
      className="w-full h-auto object-contain touch-manipulation [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="35 30 250 150"
      width={324}
      height={188}
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
          <path d="M119.124 167.724L39.3106 121.644L99.6137 86.828C102.57 85.1213 106.006 83.9907 109.923 83.436C113.914 82.8387 117.904 82.8387 121.895 83.436C125.885 83.948 129.396 85.0787 132.426 86.828L147.391 95.468C148.351 96.0227 149.201 96.5987 149.94 97.196C150.679 97.708 151.27 98.2627 151.714 98.86C154.226 99.0307 156.776 99.436 159.363 100.076C161.949 100.716 164.166 101.569 166.014 102.636L182.53 112.172C185.486 113.879 187.445 115.905 188.406 118.252C189.44 120.556 189.44 122.86 188.406 125.164C187.445 127.425 185.45 129.431 182.42 131.18L119.124 167.724ZM119.013 147.82L164.24 121.708L149.608 113.26L104.38 139.372L119.013 147.82ZM87.0875 129.388L129.211 105.068L115.909 97.388L73.7854 121.708L87.0875 129.388ZM227.207 105.322C224.251 107.029 220.778 108.181 216.787 108.778C212.796 109.375 208.806 109.375 204.815 108.778C200.824 108.181 197.351 107.029 194.395 105.322L186.968 101.034L204.15 91.114L210.69 94.89L255.917 68.778L241.95 60.714L195.947 87.274C192.991 88.9807 189.518 90.1327 185.527 90.73C181.536 91.3273 177.583 91.3487 173.666 90.794C169.675 90.1967 166.165 89.0233 163.135 87.274L147.394 78.186C144.364 76.4367 142.369 74.4313 141.408 72.17C140.373 69.866 140.373 67.562 141.408 65.258C142.443 62.954 144.438 60.9487 147.394 59.242L194.395 32.106C197.351 30.3993 200.787 29.2687 204.704 28.714C208.695 28.1167 212.685 28.1167 216.676 28.714C220.667 29.226 224.177 30.3567 227.207 32.106L234.634 36.394L217.23 46.442L210.69 42.666L165.463 68.778L179.43 76.842L225.655 50.154C228.611 48.4473 232.047 47.3167 235.964 46.762C239.955 46.1647 243.945 46.1647 247.936 46.762C251.927 47.274 255.437 48.4047 258.467 50.154L274.208 59.242C277.164 60.9487 279.122 62.9753 280.083 65.322C281.118 67.626 281.118 69.93 280.083 72.234C279.122 74.4953 277.164 76.4793 274.208 78.186L227.207 105.322Z"/>
        </motion.g>

        <motion.path
          id={ids.stroke}
          fillRule={"evenodd"}
          clipRule={"evenodd"}
          variants={{
            normal: {
              d: [
                "M189.18 121.57C189.202 122.768 188.943 123.966 188.406 125.164C187.445 127.425 185.45 129.431 182.42 131.18L119.124 167.724L39.3106 121.644V133.644L119.124 179.724L182.42 143.18C185.45 141.431 187.445 139.425 188.406 137.164C188.943 135.966 189.202 134.768 189.18 133.57V121.57Z",
                "M164.24 121.708L149.608 113.26L104.38 139.372V151.372L149.608 125.26L164.24 133.708V121.708Z",
                "M129.211 105.068L115.909 97.388L73.7854 121.708V133.708L115.909 109.388L129.211 117.068V105.068Z",
                "M255.917 68.778L241.95 60.714L195.947 87.274C192.991 88.9805 189.517 90.1329 185.527 90.73C181.536 91.3272 177.583 91.3485 173.666 90.794C169.675 90.1969 166.165 89.0234 163.135 87.274L147.394 78.186C144.364 76.4367 142.369 74.4315 141.408 72.17C140.912 71.064 140.653 69.9581 140.634 68.8521V80.8521C140.653 81.9581 140.912 83.064 141.408 84.17C142.369 86.4315 144.364 88.4367 147.394 90.186L163.135 99.274C166.165 101.023 169.675 102.197 173.666 102.794C177.583 103.349 181.536 103.327 185.527 102.73C189.517 102.133 192.991 100.981 195.947 99.274L241.95 72.714L255.917 80.778V68.778Z",
                "M234.634 36.394L217.23 46.442L210.69 42.666L165.463 68.778V80.778L210.69 54.666L217.23 58.442L234.634 48.394V36.394Z",
                "M280.857 68.6398C280.879 69.8378 280.621 71.0359 280.083 72.234C279.123 74.4955 277.164 76.4795 274.208 78.186L227.207 105.322C224.251 107.028 220.778 108.181 216.787 108.778C212.796 109.375 208.806 109.375 204.815 108.778C200.824 108.181 197.351 107.028 194.395 105.322L186.968 101.034V113.034L194.395 117.322C197.351 119.028 200.824 120.181 204.815 120.778C208.806 121.375 212.796 121.375 216.787 120.778C220.778 120.181 224.251 119.028 227.207 117.322L274.208 90.186C277.164 88.4795 279.123 86.4955 280.083 84.234C280.621 83.0359 280.879 81.8378 280.857 80.6398V68.6398Z"
              ].join(""),
            },
            pressed: {
              d: [
                "M189.18 129.57C189.202 130.768 188.943 131.966 188.406 133.164C187.445 135.425 185.45 137.431 182.42 139.18L119.124 175.724L39.3106 129.644V133.644L119.124 179.724L182.42 143.18C185.45 141.431 187.445 139.425 188.406 137.164C188.943 135.966 189.202 134.768 189.18 133.57V129.57Z",
                "M164.24 129.708L149.608 121.26L104.38 147.372V151.372L149.608 125.26L164.24 133.708V129.708Z",
                "M129.211 113.068L115.909 105.388L73.7854 129.708V133.708L115.909 109.388L129.211 117.068V113.068Z",
                "M255.917 76.778L241.95 68.714L195.947 95.274C192.991 96.9805 189.517 98.1329 185.527 98.73C181.536 99.3272 177.583 99.3485 173.666 98.794C169.675 98.1969 166.165 97.0234 163.135 95.274L147.394 86.186C144.364 84.4367 142.369 82.4315 141.408 80.17C140.912 79.064 140.653 77.9581 140.634 76.8521V80.8521C140.653 81.9581 140.912 83.064 141.408 84.17C142.369 86.4315 144.364 88.4367 147.394 90.186L163.135 99.274C166.165 101.023 169.675 102.197 173.666 102.794C177.583 103.349 181.536 103.327 185.527 102.73C189.517 102.133 192.991 100.981 195.947 99.274L241.95 72.714L255.917 80.778V76.778Z",
                "M234.634 44.394L217.23 54.442L210.69 50.666L165.463 76.778V80.778L210.69 54.666L217.23 58.442L234.634 48.394V44.394Z",
                "M280.857 76.6398C280.879 77.8378 280.621 79.0359 280.083 80.234C279.123 82.4955 277.164 84.4795 274.208 86.186L227.207 113.322C224.251 115.028 220.778 116.181 216.787 116.778C212.796 117.375 208.806 117.375 204.815 116.778C200.824 116.181 197.351 115.028 194.395 113.322L186.968 109.034V113.034L194.395 117.322C197.351 119.028 200.824 120.181 204.815 120.778C208.806 121.375 212.796 121.375 216.787 120.778C220.778 120.181 224.251 119.028 227.207 117.322L274.208 90.186C277.164 88.4795 279.123 86.4955 280.083 84.234C280.621 83.0359 280.879 81.8378 280.857 80.6398V76.6398Z"
              ].join(""),
            },
          }}
          transition={transition}
        />

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
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

      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />
    </motion.svg>
  )
}
