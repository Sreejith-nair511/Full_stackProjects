"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Game data with vote counts
const gameVotes = [
  { id: 1, title: "Memory Clash", votes: 42 },
  { id: 2, title: "Pixel Rush", votes: 38 },
  { id: 3, title: "Tap Hero", votes: 27 },
]

export function GameVote() {
  const [votes, setVotes] = useState(gameVotes)
  const [votedFor, setVotedFor] = useState<number | null>(null)

  const handleVote = (gameId: number) => {
    if (votedFor !== null) {
      toast({
        title: "Already Voted",
        description: "You've already voted for a game today!",
        variant: "destructive",
      })
      return
    }

    setVotes(votes.map((game) => (game.id === gameId ? { ...game, votes: game.votes + 1 } : game)))
    setVotedFor(gameId)

    toast({
      title: "Vote Recorded",
      description: `Thanks for voting for ${votes.find((g) => g.id === gameId)?.title}!`,
    })
  }

  // Sort games by vote count (highest first)
  const sortedGames = [...votes].sort((a, b) => b.votes - a.votes)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Game of the Day</CardTitle>
        <CardDescription>Vote for your favorite game!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedGames.map((game) => (
            <div key={game.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{game.title}</p>
                <p className="text-sm text-muted-foreground">{game.votes} votes</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVote(game.id)}
                disabled={votedFor !== null}
                className={`${votedFor === game.id ? "bg-primary/20 border-primary" : ""}`}
              >
                <ThumbsUp className={`w-4 h-4 mr-2 ${votedFor === game.id ? "text-primary" : ""}`} />
                {votedFor === game.id ? "Voted" : "Vote"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
