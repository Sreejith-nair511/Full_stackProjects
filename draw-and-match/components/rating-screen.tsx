"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect, useRef } from "react"

interface RatingScreenProps {
  score: number
  feedback: string
  canvasRef: HTMLCanvasElement | null
  onTryAgain: () => void
  onNewPrompt: () => void
}

export default function RatingScreen({ score, feedback, canvasRef, onTryAgain, onNewPrompt }: RatingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const drawingPreviewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Show confetti for high scores
    if (score >= 85) {
      const canvas = document.createElement("canvas")
      document.body.appendChild(canvas)

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff49db", "#0099ff", "#00b5ad", "#a64dff"],
      })

      setTimeout(() => {
        document.body.removeChild(canvas)
      }, 3000)
    }

    // Display the drawing
    if (canvasRef && drawingPreviewRef.current) {
      const previewImg = document.createElement("img")
      previewImg.src = canvasRef.toDataURL()
      previewImg.className = "max-w-full max-h-[250px] rounded-lg border-2 border-purple-900/50 shadow-glow"

      drawingPreviewRef.current.innerHTML = ""
      drawingPreviewRef.current.appendChild(previewImg)
    }
  }, [score, canvasRef])

  return (
    <div ref={containerRef} className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">You scored:</h2>
        <div className="flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-orbitron"
          >
            {score} 🎯
          </motion.div>
        </div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-cyan-300 mt-2"
        >
          {feedback}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        ref={drawingPreviewRef}
        className="flex justify-center mb-6"
      />

      <div className="flex justify-center space-x-4">
        <Button onClick={onTryAgain} className="bg-gray-700 hover:bg-gray-600 text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button
          onClick={onNewPrompt}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          New Prompt
        </Button>
      </div>
    </div>
  )
}
