"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mb-6" />
        <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-8">
          We apologize for the inconvenience. Our team has been notified of this issue.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            Go Home
          </Button>
          <Button onClick={reset}>Try Again</Button>
        </div>
      </div>
    </div>
  )
}
