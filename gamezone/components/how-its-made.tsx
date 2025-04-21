"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code, Cpu, Layers } from "lucide-react"

const technologies = [
  {
    id: 1,
    title: "JavaScript Games",
    description:
      "Interactive browser-based games built with vanilla JavaScript and HTML5 Canvas for smooth animations and gameplay.",
    icon: Code,
  },
  {
    id: 2,
    title: "Python Backend",
    description:
      "Powerful backend services using Python and Flask to handle game state, leaderboards, and user profiles.",
    icon: Cpu,
  },
  {
    id: 3,
    title: "Unity Experiences",
    description: "Immersive 3D games created with Unity, compiled to WebGL for cross-platform compatibility.",
    icon: Layers,
  },
]

export function HowItsMade() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="how-its-made" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It's Made</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A peek behind the curtain at the technologies powering our interactive games.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {technologies.map((tech) => (
            <motion.div key={tech.id} variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <tech.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{tech.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
