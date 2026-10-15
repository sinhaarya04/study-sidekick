import { Mic } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MicButton() {
  return (
    <Button size="icon" className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl group">
      <Mic className="h-8 w-8 transition-transform group-hover:scale-110" />
      <span className="sr-only">Start Voice Session</span>
    </Button>
  )
}
