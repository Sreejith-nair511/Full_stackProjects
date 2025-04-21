"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eraser, Undo2, Trash2, Pencil } from "lucide-react"

interface DrawingCanvasProps {
  setCanvasRef: (canvas: HTMLCanvasElement | null) => void
}

export default function DrawingCanvas({ setCanvasRef }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<"pen" | "eraser">("pen")
  const [color, setColor] = useState("#FFFFFF")
  const [lineWidth, setLineWidth] = useState(5)
  const [drawHistory, setDrawHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const width = parent.clientWidth - 32 // Accounting for padding
      const height = Math.min(500, window.innerHeight * 0.6)

      canvas.width = width * 2 // For high DPI displays
      canvas.height = height * 2
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const context = canvas.getContext("2d")
      if (context) {
        context.scale(2, 2) // Scale for high DPI
        context.lineCap = "round"
        context.lineJoin = "round"
        context.strokeStyle = color
        context.lineWidth = lineWidth
        contextRef.current = context

        // Fill with dark background
        context.fillStyle = "#0a0a1a"
        context.fillRect(0, 0, width, height)

        // Add grid pattern
        context.strokeStyle = "rgba(80, 80, 255, 0.1)"
        context.lineWidth = 0.5

        const gridSize = 20
        for (let x = 0; x <= width; x += gridSize) {
          context.beginPath()
          context.moveTo(x, 0)
          context.lineTo(x, height)
          context.stroke()
        }

        for (let y = 0; y <= height; y += gridSize) {
          context.beginPath()
          context.moveTo(0, y)
          context.lineTo(width, y)
          context.stroke()
        }

        // Reset drawing styles
        context.strokeStyle = color
        context.lineWidth = lineWidth

        // Save initial state
        saveToHistory()
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    setCanvasRef(canvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      setCanvasRef(null)
    }
  }, [setCanvasRef])

  const saveToHistory = () => {
    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    // Get current canvas state
    const imageData = context.getImageData(0, 0, canvas.width / 2, canvas.height / 2)

    // If we're not at the end of the history, remove future states
    if (historyIndex < drawHistory.length - 1) {
      setDrawHistory((prev) => prev.slice(0, historyIndex + 1))
    }

    // Add current state to history
    setDrawHistory((prev) => [...prev, imageData])
    setHistoryIndex((prev) => prev + 1)
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    setIsDrawing(true)

    let clientX: number, clientY: number

    if ("touches" in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      clientX = e.touches[0].clientX - rect.left
      clientY = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      clientX = e.nativeEvent.offsetX
      clientY = e.nativeEvent.offsetY
    }

    context.beginPath()
    context.moveTo(clientX, clientY)

    // Set styles based on tool
    if (tool === "pen") {
      context.strokeStyle = color
    } else {
      context.strokeStyle = "#0a0a1a" // Background color for eraser
    }
    context.lineWidth = lineWidth
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    let clientX: number, clientY: number

    if ("touches" in e) {
      // Prevent scrolling when drawing
      e.preventDefault()

      // Touch event
      const rect = canvas.getBoundingClientRect()
      clientX = e.touches[0].clientX - rect.left
      clientY = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      clientX = e.nativeEvent.offsetX
      clientY = e.nativeEvent.offsetY
    }

    context.lineTo(clientX, clientY)
    context.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return

    const context = contextRef.current
    if (!context) return

    context.closePath()
    setIsDrawing(false)
    saveToHistory()
  }

  const handleUndo = () => {
    if (historyIndex <= 0) return

    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    setHistoryIndex((prev) => prev - 1)
    const imageData = drawHistory[historyIndex - 1]
    context.putImageData(imageData, 0, 0)
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    // Clear with background color
    context.fillStyle = "#0a0a1a"
    context.fillRect(0, 0, canvas.width / 2, canvas.height / 2)

    // Redraw grid
    context.strokeStyle = "rgba(80, 80, 255, 0.1)"
    context.lineWidth = 0.5

    const gridSize = 20
    const width = canvas.width / 2
    const height = canvas.height / 2

    for (let x = 0; x <= width; x += gridSize) {
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, height)
      context.stroke()
    }

    for (let y = 0; y <= height; y += gridSize) {
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(width, y)
      context.stroke()
    }

    // Reset drawing styles
    context.strokeStyle = color
    context.lineWidth = lineWidth

    saveToHistory()
  }

  // Color presets for quick selection
  const colorPresets = [
    "#FFFFFF", // White
    "#FF3B82", // Pink
    "#7B5AFF", // Purple
    "#3B82F6", // Blue
    "#10B981", // Green
    "#FBBF24", // Yellow
    "#F87171", // Red
  ]

  return (
    <div className="mt-4 mb-4">
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        <Button
          variant={tool === "pen" ? "default" : "outline"}
          size="icon"
          onClick={() => setTool("pen")}
          className={tool === "pen" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          <Pencil className="h-5 w-5" />
        </Button>
        <Button
          variant={tool === "eraser" ? "default" : "outline"}
          size="icon"
          onClick={() => setTool("eraser")}
          className={tool === "eraser" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          <Eraser className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleUndo} disabled={historyIndex <= 0}>
          <Undo2 className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleClear}>
          <Trash2 className="h-5 w-5" />
        </Button>

        {tool === "pen" && (
          <div className="flex items-center gap-1 ml-1">
            {colorPresets.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className={`w-6 h-6 rounded-full border-2 ${
                  color === presetColor ? "border-white" : "border-gray-700"
                }`}
                style={{ backgroundColor: presetColor }}
                aria-label={`Select ${presetColor} color`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative border-2 border-purple-900/50 rounded-lg overflow-hidden shadow-glow">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="touch-none bg-[#0a0a1a] w-full"
        />
        <div className="absolute inset-0 pointer-events-none border border-purple-500/20 rounded-lg shadow-inner"></div>
      </div>
    </div>
  )
}
