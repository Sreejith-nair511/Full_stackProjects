import type { Metadata } from "next"
import GameContainer from "@/components/game-container"

export const metadata: Metadata = {
  title: "Draw & Match | GameZone Tech Stall",
  description: "Interactive drawing challenge for Cambrian Open House 2025",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a] overflow-hidden">
      <GameContainer />
    </main>
  )
}
