import { Footer } from "@/components/footer"
import { GameCollection } from "@/components/game-collection"
import { GameVote } from "@/components/game-vote"
import { HeroSection } from "@/components/hero-section"
import { HowItsMade } from "@/components/how-its-made"
import { Leaderboard } from "@/components/leaderboard"
import { LocationSection } from "@/components/location-section"
import { MiniGame } from "@/components/mini-game"
import { NavBar } from "@/components/nav-bar"
import { TeamSection } from "@/components/team-section"
import { UpiSupport } from "@/components/upi-support"

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <GameCollection />
      <div className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Try a Mini-Game</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get a taste of our games with this quick mini-game. How many targets can you tap?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MiniGame />
            <GameVote />
          </div>
        </div>
      </div>
      <HowItsMade />
      <Leaderboard />
      <TeamSection />
      <LocationSection />
      <UpiSupport />
      <Footer />
    </main>
  )
}
