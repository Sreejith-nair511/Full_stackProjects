"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Team data
const teamMembers = [
  {
    id: 1,
    name: "Ankush",
    role: "Game Dev",
    initials: "AK",
    color: "bg-gradient-to-br from-neon-blue to-neon-purple",
  },
  {
    id: 2,
    name: "Aman",
    role: "UI/UX Lead",
    initials: "AM",
    color: "bg-gradient-to-br from-neon-purple to-neon-green",
  },
  {
    id: 3,
    name: "Aditya",
    role: "Scoreboard Wiz",
    initials: "AD",
    color: "bg-gradient-to-br from-neon-green to-neon-blue",
  },
  {
    id: 4,
    name: "Priya",
    role: "Backend Dev",
    initials: "PR",
    color: "bg-gradient-to-br from-purple-500 to-neon-blue",
  },
  {
    id: 5,
    name: "Rahul",
    role: "3D Artist",
    initials: "RA",
    color: "bg-gradient-to-br from-neon-blue to-pink-500",
  },
  {
    id: 6,
    name: "Neha",
    role: "Sound Designer",
    initials: "NE",
    color: "bg-gradient-to-br from-blue-600 to-neon-green",
  },
]

export function TeamSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="team" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The talented individuals behind GameZone's interactive experiences.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={item}>
              <Card className="text-center h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className={`text-white ${member.color}`}>{member.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{member.role}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
