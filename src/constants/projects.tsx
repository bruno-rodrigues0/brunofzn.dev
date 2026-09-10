import { CodeXml, Drone } from "lucide-react";
import { Project } from "../types";
import { PythonIcon } from "../components/icons";
import { BSMark } from "../components/bs-mark";

export const PROJECTS: Project[] = [
  {
    key: "colibricf",
    title: "Colibri CF",
    url: "https://github.com/EDUCA-DRONES/Colibri_CF",
    labels: ["Python", "Clover", "dronekit", "pymavlink", "rospy"],
    logo: <Drone className="w-5"/>,
    period: {
      start: "10.2025",
      end: null
    }
  },

  {
    key: "brunofzn",
    title: "brunofzn.dev",
    url: "https://brunofzn.vercel.app",
    labels: ["Next.js", "Typescript", "shadcn/ui", "Tailwindcss", "chanhdai.com"],
    logo: <BSMark className="w-5"/>,
    period: {
      start: "08.2026",
      end: null,
    },
  },

  {
    key: "ayuwoke",
    title: "Ayuwoke Time CInmulator",
    url: "https://github.com/bruno-rodrigues0/projeto-ip",
    labels: ["Python", "pygame", "numpy"],
    logo: <PythonIcon className="w-5"/>,
    period: {
      start: "05.2026",
      end: "06.2026",
    },
  },

  {
    key: "apple_website",
    title: "Apple Website",
    url: "/",
    labels: ["Next.js", "Typescript", "gsap", "shadcn/ui", "next-video"],
    logo: <CodeXml className="w-5"/>,
    period: {
      start: "08.2026",
      end: null,
    },
  },

  {
    key: "concord",
    title: "Concord",
    url: "/",
    labels: ["Next.js", "Typescript", "shadcn/ui", "Fastify", "Swagger", "zod",  "better-auth", "Postgresql", "Prisma", "nginx", "Docker", "Websocket"],
    logo: <CodeXml className="w-5"/>,
    period: {
      start: "01.2026",
      end: null,
    },
  },
]
