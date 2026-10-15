"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ProgressStep from "@/components/progress-step"
import { motion } from "framer-motion"

const ingestStages = [
  { id: 1, title: "Fetching transcripts & slides", duration: 3000, copy: "Slurping slides..." },
  { id: 2, title: "Embedding concepts", duration: 4000, copy: "Caffeinating neurons..." },
  { id: 3, title: "Generating flashcards seed", duration: 2000, copy: "Building your brain..." },
]

export default function IngestPage({ params }: { params: { id: string } }) {
  const [currentStage, setCurrentStage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (currentStage < ingestStages.length) {
      const timer = setTimeout(() => {
        setCurrentStage(currentStage + 1)
      }, ingestStages[currentStage].duration)
      return () => clearTimeout(timer)
    } else {
      setIsComplete(true)
    }
  }, [currentStage])

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tighter text-center sm:text-4xl">
          Getting Your Course Ready
        </h1>
        <p className="mt-2 text-muted-foreground text-center text-lg">This will just take a moment.</p>
        <div className="mt-12 space-y-6">
          {ingestStages.map((stage, index) => (
            <ProgressStep
              key={stage.id}
              title={stage.title}
              copy={stage.copy}
              isActive={index === currentStage && !isComplete}
              isComplete={index < currentStage || isComplete}
              duration={stage.duration}
            />
          ))}
        </div>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Button size="lg" className="btn-primary h-12" onClick={() => router.push(`/session`)}>
              <span>Begin Session</span>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
