"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
}

export default function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 border-2 bg-black">
        <div className="aspect-video">
          <video className="w-full h-full" src={videoSrc} autoPlay controls playsInline />
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/75"
        >
          <X className="h-5 w-5" />
        </button>
      </DialogContent>
    </Dialog>
  )
}
