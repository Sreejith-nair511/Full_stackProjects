"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

// Leaderboard data
const todayLeaderboard = [
  { rank: 1, name: "TapMaster", score: 9850, game: "Tap Hero" },
  { rank: 2, name: "PixelQueen", score: 9200, game: "Pixel Rush" },
  { rank: 3, name: "MemoryKing", score: 8750, game: "Memory Clash" },
  { rank: 4, name: "LogicWiz", score: 8500, game: "Logic Maze" },
  { rank: 5, name: "AceKid", score: 8100, game: "Rhythm Master" },
]

const allTimeLeaderboard = [
  { rank: 1, name: "GameLegend", score: 12500, game: "Pixel Rush" },
  { rank: 2, name: "TapMaster", score: 11800, game: "Tap Hero" },
  { rank: 3, name: "CyberRacer", score: 11200, game: "Cyber Racer" },
  { rank: 4, name: "BrainGenius", score: 10900, game: "Memory Clash" },
  { rank: 5, name: "RhythmGod", score: 10500, game: "Rhythm Master" },
]

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState("today")

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="leaderboard" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Leaderboard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See who's dominating the games and climbing to the top of our rankings.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Top Players
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="all-time">All-Time</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="mt-0">
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                  {todayLeaderboard.map((player) => (
                    <motion.div
                      key={player.rank}
                      variants={item}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 font-bold">
                          {player.rank}
                        </span>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.game}</p>
                        </div>
                      </div>
                      <div className="font-orbitron text-lg font-bold text-primary">
                        {player.score.toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="all-time" className="mt-0">
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                  {allTimeLeaderboard.map((player) => (
                    <motion.div
                      key={player.rank}
                      variants={item}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 font-bold">
                          {player.rank}
                        </span>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.game}</p>
                        </div>
                      </div>
                      <div className="font-orbitron text-lg font-bold text-primary">
                        {player.score.toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
