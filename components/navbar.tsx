"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "Certifications", path: "/certifications" },
  { name: "Contact", path: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center px-4 md:px-8">
        <div className="flex items-center gap-12 flex-1">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-black tracking-tighter text-primary group-hover:opacity-90 transition-all">
              LOGO
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "transition-all hover:text-primary relative py-1",
                  pathname === item.path 
                    ? "text-primary font-bold" 
                    : "text-muted-foreground hover:translate-y-[-1px]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex md:hidden ml-auto items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 p-6 flex flex-col space-y-6 bg-background/95 backdrop-blur animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors",
                pathname === item.path ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
