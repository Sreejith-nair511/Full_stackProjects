"use client"

import { motion } from "framer-motion"
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UpiSupport() {
  return (
    <section className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[#111130] rounded-xl p-6 max-w-md mx-auto shadow-glow border border-purple-500/20"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Enjoyed the game? Buy us a coffee ☕</h2>

        <div className="flex justify-center mb-4">
          <div className="w-48 h-48 bg-white rounded-lg p-2 relative shadow-glow">
            <div className="absolute inset-0 flex items-center justify-center">
              <QrCode className="w-32 h-32 text-gray-900" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-white"></div>
            </div>
          </div>
        </div>

        <p className="text-cyan-300 font-mono text-lg mb-4">UPI ID: 8296866637@axl</p>

        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-glow">
          Support Us
        </Button>
      </motion.div>
    </section>
  )
}
