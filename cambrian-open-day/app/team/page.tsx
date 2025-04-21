import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import TeamSection from "@/components/team-section"

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/about">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to About
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated individuals who make the Cambrian Open Day possible
          </p>
        </div>

        <TeamSection />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals to help make the Cambrian Open Day even better. If you're
            interested in joining our team, reach out to us!
          </p>
          <Link href="nambiarshree005@gmail.com
">
            <Button>Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
