import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row md:px-8">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href="/admin"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            You
          </Link>
          . The source code is available on{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            GitHub
          </a>
          .
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Admin Login
          </Link>
          <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
)
}
