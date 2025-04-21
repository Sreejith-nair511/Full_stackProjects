"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Set the event date (April 15, 2025)
const EVENT_DATE = new Date("2025-04-15T09:00:00").getTime()

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = EVENT_DATE - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        // Event has started
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <p className="text-center text-lg mb-4">Cambrian Open House 2025 Starts In:</p>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {timeUnits.map((unit) => (
          <Card key={unit.label} className="bg-muted/50 border-none">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-2xl md:text-4xl font-orbitron font-bold text-primary">
                {unit.value.toString().padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">{unit.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
