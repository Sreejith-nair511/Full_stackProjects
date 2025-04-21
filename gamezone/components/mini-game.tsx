"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export function MiniGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 })
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(10)
    moveTarget()

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setGameStarted(false)
          toast({
            title: "Game Over!",
            description: `Your final score: ${score}`,
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const moveTarget = () => {
    if (!gameAreaRef.current) return

    const gameArea = gameAreaRef.current
    const maxX = gameArea.clientWidth - 40
    const maxY = gameArea.clientHeight - 40

    setTargetPosition({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    })
  }

  const handleTargetClick = () => {
    setScore((prev) => prev + 1)
    moveTarget()
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Tap Target</CardTitle>
        <CardDescription>Click the target as many times as you can in 10 seconds!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="font-medium">Score: {score}</div>
          <div className="font-medium">Time: {timeLeft}s</div>
        </div>
        <div
          ref={gameAreaRef}
          className="relative w-full h-64 bg-muted/30 rounded-lg overflow-hidden"
          style={{ touchAction: gameStarted ? "none" : "auto" }}
        >
          {gameStarted ? (
            <button
              className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: targetPosition.x, top: targetPosition.y }}
              onClick={handleTargetClick}
              aria-label="Target"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-medium">
                {score > 0 ? `Game Over! Your score: ${score}` : "Click Start to play"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={startGame}
          disabled={gameStarted}
          className="w-full glow-button bg-gradient-to-r from-neon-blue to-neon-purple text-white"
        >
          {gameStarted ? "Game in Progress..." : "Start Game"}
        </Button>
      </CardFooter>
    </Card>
  )
}
