"use client"

import { motion } from "framer-motion"
import { Code, Palette, Cpu } from "lucide-react"

export default function HowItsMade() {
  return (
    <section className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 font-orbitron mb-6">
        How It's Made
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-gray-900/80 rounded-xl p-6 shadow-neon">
          <div className="flex justify-center mb-4">
            <Code className="h-12 w-12 text-pink-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Canvas Magic</h3>
          <p className="text-gray-300">Built with HTML Canvas and JavaScript for smooth drawing experience</p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-gray-900/80 rounded-xl p-6 shadow-neon">
          <div className="flex justify-center mb-4">
            <Palette className="h-12 w-12 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Creative Design</h3>
          <p className="text-gray-300">Retro-futuristic arcade vibe with neon accents and smooth animations</p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-gray-900/80 rounded-xl p-6 shadow-neon">
          <div className="flex justify-center mb-4">
            <Cpu className="h-12 w-12 text-cyan-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Smart Logic</h3>
          <p className="text-gray-300">Made using HTML Canvas, JS, and creativity!</p>
        </motion.div>
      </div>
    </section>
  )
}
