import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 text-center">
      <div className="space-y-6 max-w-3xl">
        <div className="relative mx-auto h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-4 border-primary/10 shadow-lg">
          {/* Default Profile Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent flex items-center justify-center text-4xl font-bold text-primary/40">
            Me
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Hi, I&apos;m a <span className="text-primary border-b-4 border-primary/20">Software Engineer</span>
        </h1>
        
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          I build modern, scalable, and exceptional digital experiences. Passionate about web technologies, AI, and continuous learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="h-12 px-8 rounded-full shadow-md group">
            <Link href="/projects">
              View Work <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-full">
            <Link href="/contact">
              Contact Me
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-8">
          <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors group">
            <Github className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors group">
            <Linkedin className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors group">
            <Mail className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
