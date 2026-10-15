import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BrainCircuit } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-display">StudySidekick</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Dashboard
            </Link>
            <Link href="/practice" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Practice
            </Link>
            <Link href="/flashcards" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Flashcards
            </Link>
            <Link href="/settings" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Settings
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <span className="font-bold font-display">StudySidekick</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/practice">Practice</Link>
                <Link href="/flashcards">Flashcards</Link>
                <Link href="/settings">Settings</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-2">
            <Button variant="outline">Sign In</Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
