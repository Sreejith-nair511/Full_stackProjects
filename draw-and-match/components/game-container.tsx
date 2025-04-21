"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import StartScreen from "./start-screen"
import DrawingInterface from "./drawing-interface"
import TeamSection from "./team-section"
import UpiSupport from "./upi-support"
import { drawingPrompts } from "@/data/prompts"

export default function GameContainer() {
  const [showStartScreen, setShowStartScreen] = useState(true)
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [showRating, setShowRating] = useState(false)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // Auto-hide start screen after 4 seconds on first load
    const timer = setTimeout(() => {
      setShowStartScreen(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const getNewPrompt = () => {
    const randomIndex = Math.floor(Math.random() * drawingPrompts.length)
    setCurrentPrompt(drawingPrompts[randomIndex])
    setShowRating(false)
  }

  const handleSubmitDrawing = () => {
    // Simulate AI rating with random score between 50-100
    const randomScore = Math.floor(Math.random() * 51) + 50
    setScore(randomScore)

    // Set feedback based on score
    if (randomScore >= 85) {
      setFeedback("Epic sketch! 🚀")
    } else if (randomScore >= 70) {
      setFeedback("Almost nailed it! 😎")
    } else {
      setFeedback("So close! 🎨")
    }

    setShowRating(true)
  }

  const handleStartGame = () => {
    setShowStartScreen(false)
    if (!currentPrompt) {
      getNewPrompt()
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      <AnimatePresence mode="wait">
        {showStartScreen ? (
          <StartScreen onStart={handleStartGame} />
        ) : (
          <DrawingInterface
            currentPrompt={currentPrompt}
            showRating={showRating}
            score={score}
            feedback={feedback}
            getNewPrompt={getNewPrompt}
            handleSubmitDrawing={handleSubmitDrawing}
            setCanvasRef={setCanvasRef}
            canvasRef={canvasRef}
          />
        )}
      </AnimatePresence>

      <div className="mt-16 space-y-16">
        <TeamSection />
        <UpiSupport />
      </div>
    </div>
  )
}
