"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export function UpiSupport() {
  const [copied, setCopied] = useState(false)
  const upiId = "9199282574@upi"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId)
    setCopied(true)
    toast({
      title: "UPI ID Copied",
      description: "The UPI ID has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enjoyed our games? Consider supporting our team to help us create more awesome experiences.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Donate via UPI</CardTitle>
              <CardDescription className="text-center">Your support helps us build better games</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-48 h-48 bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
                {/* QR code placeholder */}
                <div className="w-full h-full border-2 border-black grid grid-cols-6 grid-rows-6 relative">
                  {/* QR code corners */}
                  <div className="absolute top-0 left-0 w-1/4 h-1/4 border-4 border-r-0 border-b-0 border-black"></div>
                  <div className="absolute top-0 right-0 w-1/4 h-1/4 border-4 border-l-0 border-b-0 border-black"></div>
                  <div className="absolute bottom-0 left-0 w-1/4 h-1/4 border-4 border-r-0 border-t-0 border-black"></div>
                  <div className="absolute bottom-0 right-0 w-1/4 h-1/4 border-4 border-l-0 border-t-0 border-black"></div>

                  {/* QR code center */}
                  <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-black"></div>

                  <QrCode className="absolute inset-0 m-auto w-full h-full p-6 text-black" />
                </div>
              </div>

              <p className="font-medium mb-4">UPI ID: {upiId}</p>

              <Button onClick={copyToClipboard} className="flex items-center gap-2" variant="outline">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy UPI ID"}
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Scan the QR code or use the UPI ID to make a donation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
