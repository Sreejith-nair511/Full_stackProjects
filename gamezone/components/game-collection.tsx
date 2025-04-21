"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"
import { Joystick, Zap, Brain, Puzzle, Target, Gamepad } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

// Game data
const games = [
  {
    id: 1,
    title: "Memory Clash",
    description: "Test your memory skills in this pattern matching challenge",
    icon: Brain,
    color: "from-neon-blue to-neon-purple",
  },
  {
    id: 2,
    title: "Pixel Rush",
    description: "Fast-paced obstacle course with retro pixel graphics",
    icon: Zap,
    color: "from-neon-purple to-neon-green",
  },
  {
    id: 3,
    title: "Tap Hero",
    description: "Reflex-based tap challenge with increasing difficulty",
    icon: Target,
    color: "from-neon-green to-neon-blue",
  },
  {
    id: 4,
    title: "Logic Maze",
    description: "Solve puzzles and navigate through complex mazes",
    icon: Puzzle,
    color: "from-purple-500 to-neon-blue",
  },
  {
    id: 5,
    title: "Rhythm Master",
    description: "Follow the beat and match patterns in this music game",
    icon: Gamepad,
    color: "from-neon-blue to-pink-500",
  },
  {
    id: 6,
    title: "Cyber Racer",
    description: "High-speed racing in a futuristic neon cityscape",
    icon: Joystick,
    color: "from-blue-600 to-neon-green",
  },
]

export function GameCollection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const isMobile = useMobile()

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      setActiveIndex((prev) => (prev === games.length - 1 ? 0 : prev + 1))
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      setActiveIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1))
    }
  }

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

  // Get the current game's icon component
  const CurrentGameIcon = games[activeIndex].icon

  return (
    <section id="games" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Games</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive into our collection of interactive games designed to challenge your skills and provide hours of
            entertainment.
          </p>
        </div>

        {isMobile ? (
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-center mb-6">
              <Card className="w-full max-w-sm game-card">
                <CardHeader className="pb-2">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${games[activeIndex].color} flex items-center justify-center text-white mb-4`}
                  >
                    <CurrentGameIcon className="w-6 h-6" />
                  </div>
                  <CardTitle>{games[activeIndex].title}</CardTitle>
                  <CardDescription>{games[activeIndex].description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full glow-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                    Play Now
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="flex justify-center space-x-2">
              {games.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">Swipe to see more games</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {games.map((game) => {
              const GameIcon = game.icon
              return (
                <motion.div key={game.id} variants={item}>
                  <Card className="game-card h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center text-white mb-4`}
                      >
                        <GameIcon className="w-6 h-6" />
                      </div>
                      <CardTitle>{game.title}</CardTitle>
                      <CardDescription>{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow"></CardContent>
                    <CardFooter>
                      <Button className="w-full glow-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                        Play Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
