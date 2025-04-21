"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 300
    canvas.height = 300

    // Animation variables
    let frame = 0
    const totalFrames = 120
    let animationId: number

    // Draw spiral animation
    const drawSpiral = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set line style
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Draw spiral
      const progress = Math.min(frame / totalFrames, 1)
      const maxRotations = 2
      const maxRadius = 100

      ctx.beginPath()

      for (let i = 0; i <= progress * 360 * maxRotations; i += 5) {
        const angle = (i * Math.PI) / 180
        const radius = (i / (360 * maxRotations)) * maxRadius
        const x = canvas.width / 2 + radius * Math.cos(angle)
        const y = canvas.height / 2 + radius * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        // Gradient color based on position
        const hue = (i % 360) + 220 // Blue to purple range
        ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${progress})`
        ctx.lineWidth = 6 - (i / (360 * maxRotations)) * 4
      }

      ctx.stroke()

      // Increment frame
      frame++

      // Continue animation
      if (frame <= totalFrames) {
        animationId = requestAnimationFrame(drawSpiral)
      }
    }

    // Start animation
    drawSpiral()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[70vh] relative"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-bg"></div>
        <div className="glow-grid"></div>
      </div>

      {/* Canvas for pen animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mb-8"
      >
        <canvas ref={canvasRef} className="w-[300px] h-[300px]" />
      </motion.div>

      {/* Title with neon effect */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
        className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-orbitron mb-8 relative"
      >
        <span className="relative">
          Draw & Match
          <span className="absolute inset-0 blur-md opacity-70 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Draw & Match
          </span>
        </span>
      </motion.h1>

      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={onStart}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-neon hover:shadow-neon-intense transition-all duration-300 transform hover:scale-105"
      >
        Start Drawing
      </motion.button>
    </motion.div>
  )
}
