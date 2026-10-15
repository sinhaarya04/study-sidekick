"use client"

import { useState } from "react"
import { Bot, Film, Sparkles, PlayCircle, LinkIcon, MessageSquare, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import LinkInput from "@/components/link-input"
import VideoModal from "@/components/video-modal"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full py-24 md:py-32 lg:py-40 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div
          className="absolute top-1/2 left-1/2 -z-20 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ animation: "hero-glow 8s ease-in-out infinite" }}
        />
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-2">
            <h1 className="font-display text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl uppercase">
              Paste your course.
              <br />
              Get a tutor.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl text-balance">
              Stop doomscrolling. Start deep-learning. Turn any online course into a personalized AI study buddy.
            </p>
          </div>
          <div className="mt-8 max-w-xl mx-auto flex flex-col items-center gap-4">
            <LinkInput />
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                <span>1. Paste link</span>
              </div>
              <span className="text-muted-foreground/50">•</span>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>2. Chat</span>
              </div>
              <span className="text-muted-foreground/50">•</span>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>3. Practice</span>
              </div>
            </div>
            <Button variant="link" className="text-muted-foreground" onClick={() => setIsModalOpen(true)}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Watch 45s demo
            </Button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full py-16 md:py-24 bg-secondary/50 border-y-2 border-border">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-muted-foreground md:text-lg text-balance">
              Three simple steps to supercharge your learning.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-md border-2 border-primary/20">
                    <Film className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-display text-2xl">1. Ingest</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Provide a link to your course. We'll process the videos, transcripts, and any available materials.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-md border-2 border-primary/20">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-display text-2xl">2. Tutor</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Your personal AI tutor is ready. Ask questions, get summaries, and practice with interactive
                  flashcards.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-md border-2 border-primary/20">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-display text-2xl">3. Recap</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Receive daily recaps, track your progress, and get an ETA for course completion. Stay motivated.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-16 md:py-24 bg-secondary/50 border-y-2 border-border">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">Don't Just Take Our Word</h2>
            <p className="mt-4 text-muted-foreground md:text-lg text-balance">What our first users are saying.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alex K.",
                role: "CS Student",
                quote: "This is insane. It's like having a TA that never sleeps. My grades have actually improved.",
                avatar: "/images/avatars/alex-k.png",
              },
              {
                name: "Jasmine R.",
                role: "Bootcamp Grad",
                quote:
                  "I used this to prep for interviews. The flashcard system is a game-changer for memorizing algorithms.",
                avatar: "/images/avatars/jasmine-r.png",
              },
              {
                name: "David L.",
                role: "Lifelong Learner",
                quote: "Finally, a way to actually *finish* the courses I start. The daily recaps keep me honest.",
                avatar: "/images/avatars/david-l.png",
              },
            ].map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-2 flex flex-col hover:border-primary/50 transition-colors duration-300"
              >
                <CardContent className="pt-6 flex-1">
                  <p className="italic text-balance">"{testimonial.quote}"</p>
                </CardContent>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full bg-primary/10 border-2 border-primary/20"
                    />
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoSrc="/videos/demo-loop.mp4" />
    </div>
  )
}
