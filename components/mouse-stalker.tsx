"use client"

import React, { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function MouseStalker() {
  const [isMounted, setIsMounted] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 150 }
  const stalkerX = useSpring(mouseX, springConfig)
  const stalkerY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setIsMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16)
      mouseY.set(e.clientY - 16)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  if (!isMounted) return null

  return (
    <motion.div
      style={{
        translateX: stalkerX,
        translateY: stalkerY,
      }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-primary/30 blur-xl pointer-events-none z-[9999] hidden md:block"
    />
  )
}
