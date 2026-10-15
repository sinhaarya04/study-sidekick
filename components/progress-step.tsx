"use client"

import { CheckCircle, Loader } from "lucide-react"
import { motion } from "framer-motion"

interface ProgressStepProps {
  title: string
  copy: string
  isActive: boolean
  isComplete: boolean
  duration: number
}

export default function ProgressStep({ title, copy, isActive, isComplete, duration }: ProgressStepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors ${
            isComplete ? "bg-primary border-primary text-primary-foreground" : ""
          } ${isActive ? "border-primary" : ""}`}
        >
          {isComplete ? (
            <CheckCircle className="h-5 w-5" />
          ) : isActive ? (
            <Loader className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <div className="h-2 w-2 rounded-full bg-border" />
          )}
        </div>
        <div className="w-px h-12 bg-border mt-2" />
      </div>
      <div className="flex-1 pt-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground">{isActive ? copy : ""}</p>
        {isActive && (
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className="mt-2 h-1 bg-primary rounded-full"
          />
        )}
      </div>
    </div>
  )
}
