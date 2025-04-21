"use client"

import { motion, AnimatePresence } from "framer-motion"
import DrawingCanvas from "./drawing-canvas"
import PromptDisplay from "./prompt-display"
import RatingScreen from "./rating-screen"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface DrawingInterfaceProps {
  currentPrompt: string
  showRating: boolean
  score: number
  feedback: string
  getNewPrompt: () => void
  handleSubmitDrawing: () => void
  setCanvasRef: (canvas: HTMLCanvasElement | null) => void
  canvasRef: HTMLCanvasElement | null
  setShowRating: (show: boolean) => void
}

export default function DrawingInterface({
  currentPrompt,
  showRating,
  score,
  feedback,
  getNewPrompt,
  handleSubmitDrawing,
  setCanvasRef,
  canvasRef,
  setShowRating,
}: DrawingInterfaceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-orbitron mb-2">
          Draw & Match
        </h1>
        <p className="text-lg text-cyan-300 font-light">Sketch what you see. Score what you match.</p>
      </header>

      <div className="bg-[#111130] rounded-xl p-4 md:p-6 shadow-neon mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">What Will You Draw Today?</h2>

        <div className="flex justify-center mb-4">
          <Button
            onClick={getNewPrompt}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-lg"
          >
            <Sparkles className="mr-2 h-4 w-4" /> 🎲 New Prompt
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {!showRating ? (
            <motion.div
              key="drawing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentPrompt && (
                <>
                  <PromptDisplay prompt={currentPrompt} />
                  <DrawingCanvas setCanvasRef={setCanvasRef} />
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={handleSubmitDrawing}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-lg"
                    >
                      📤 Submit Drawing
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="rating"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <RatingScreen
                score={score}
                feedback={feedback}
                canvasRef={canvasRef}
                onTryAgain={() => setShowRating(false)}
                onNewPrompt={getNewPrompt}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
