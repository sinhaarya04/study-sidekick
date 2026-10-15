"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
const MIT_OCW_REGEX = /^(https?:\/\/)?(ocw\.mit\.edu)\/courses\/.+$/

export default function LinkInput() {
  const [link, setLink] = useState("")
  const router = useRouter()

  const isValidLink = YOUTUBE_REGEX.test(link) || MIT_OCW_REGEX.test(link)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidLink) {
      // In a real app, you'd POST to /api/ingest and get a courseId
      const courseId = "demo-course-123"
      router.push(`/course/${courseId}/ingest`)
    }
  }

  const buttonText = isValidLink ? "Start Chatting" : "Try for Free"

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col sm:flex-row gap-2">
      <Input
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Paste a YouTube playlist or MIT OCW link…"
        className="flex-1 h-12 text-base border-2 border-border focus:border-primary bg-background/80"
      />
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <div tabIndex={isValidLink ? -1 : 0}>
              <Button
                type="submit"
                size="lg"
                className="h-12 group btn-primary w-full sm:w-auto"
                disabled={!isValidLink}
              >
                <motion.span
                  key={buttonText}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  {buttonText}
                  <ArrowRight className="inline-block ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.span>
              </Button>
            </div>
          </TooltipTrigger>
          {!isValidLink && <TooltipContent>Drop a link to unlock me.</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </form>
  )
}
