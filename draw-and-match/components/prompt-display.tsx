"use client"

import { motion } from "framer-motion"

interface PromptDisplayProps {
  prompt: string
}

// Function to get emoji based on prompt text
const getEmojiForPrompt = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase()

  if (lowerPrompt.includes("dragon")) return "🐉"
  if (lowerPrompt.includes("pizza")) return "🍕"
  if (lowerPrompt.includes("snail")) return "🐌"
  if (lowerPrompt.includes("robot")) return "🤖"
  if (lowerPrompt.includes("alien")) return "👽"
  if (lowerPrompt.includes("cat")) return "🐱"
  if (lowerPrompt.includes("dog")) return "🐶"
  if (lowerPrompt.includes("ufo")) return "🛸"
  if (lowerPrompt.includes("octopus")) return "🐙"
  if (lowerPrompt.includes("castle")) return "🏰"
  if (lowerPrompt.includes("cactus")) return "🌵"
  if (lowerPrompt.includes("banana")) return "🍌"
  if (lowerPrompt.includes("penguin")) return "🐧"
  if (lowerPrompt.includes("dinosaur")) return "🦖"
  if (lowerPrompt.includes("pirate")) return "🏴‍☠️"
  if (lowerPrompt.includes("unicorn")) return "🦄"
  if (lowerPrompt.includes("zombie")) return "🧟"
  if (lowerPrompt.includes("mermaid")) return "🧜‍♀️"
  if (lowerPrompt.includes("giraffe")) return "🦒"
  if (lowerPrompt.includes("monster")) return "👹"
  if (lowerPrompt.includes("wizard")) return "🧙‍♂️"
  if (lowerPrompt.includes("ghost")) return "👻"
  if (lowerPrompt.includes("squirrel")) return "🐿️"
  if (lowerPrompt.includes("panda")) return "🐼"
  if (lowerPrompt.includes("superhero")) return "🦸"
  if (lowerPrompt.includes("frog")) return "🐸"
  if (lowerPrompt.includes("snowman")) return "☃️"
  if (lowerPrompt.includes("raccoon")) return "🦝"
  if (lowerPrompt.includes("butterfly")) return "🦋"

  // Default emoji if no match
  return "✏️"
}

export default function PromptDisplay({ prompt }: PromptDisplayProps) {
  const emoji = getEmojiForPrompt(prompt)

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1a40] rounded-lg p-4 mb-6 text-center border border-purple-500/30"
    >
      <motion.p
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 font-orbitron"
      >
        {emoji} {prompt}
      </motion.p>
    </motion.div>
  )
}
