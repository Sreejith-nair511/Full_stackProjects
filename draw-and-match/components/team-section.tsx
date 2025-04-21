"use client"

import { motion } from "framer-motion"

const teamMembers = [
  {
    name: "Sreejith",
    role: "Concept & UX",
    emoji: "🎨",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Swarupa",
    role: "Prompt Master",
    emoji: "💭",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Nikhil",
    role: "Canvas Dev",
    emoji: "🖌️",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dilip",
    role: "Logic & Flow",
    emoji: "🔁",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function TeamSection() {
  return (
    <section className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-orbitron mb-6">
        Meet the Team
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-[#111130] rounded-xl p-4 shadow-glow border border-purple-500/20"
          >
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-[#0a0a1a] flex items-center justify-center text-3xl">
                  {member.emoji}
                </div>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white">{member.name}</h3>
            <p className="text-sm text-cyan-300">{member.role}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-gray-300 mt-6 font-medium">✨ ...and many more!</p>
    </section>
  )
}
