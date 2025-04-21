"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function LocationSection() {
  return (
    <section id="visit" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find us at the Cambrian Open House 2025 and experience our games in person.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Our Location
              </CardTitle>
              <CardDescription className="text-center">Cambridge Institute of Technology, Bengaluru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative rounded-lg overflow-hidden mb-6 bg-muted">
                {/* Stylized campus illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-muted-foreground/5 to-muted-foreground/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-medium text-lg">GameZone Stall</p>
                      <p className="text-sm text-muted-foreground">Building 3, Floor 2, Room 204</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="mb-6">
                  We're located in the main exhibition hall, near the entrance. Look for our colorful banners and gaming
                  stations!
                </p>
                <Button className="glow-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  Find Us on Campus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
