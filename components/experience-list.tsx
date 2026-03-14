"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Experience {
  id: string
  company: string
  role: string
  location?: string
  start_date: string
  end_date?: string
  current: boolean
  description: string
  company_logo_url?: string
}

export function ExperienceList({ experiences }: { experiences: Experience[] | null }) {
  if (!experiences || experiences.length === 0) {
    return <p className="text-muted-foreground italic pl-8">No experience history found.</p>
  }

  return (
    <div className="relative border-l border-white/10 ml-3 md:ml-0 space-y-16">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group md:pl-12"
        >
          {/* Timeline dot */}
          <div className="absolute -left-[5px] top-6 h-3 w-3 rounded-full bg-primary ring-4 ring-background md:-left-[6.5px] group-hover:scale-125 transition-transform" />
          
          <div className="rounded-2xl border border-white/5 bg-secondary/20 p-6 md:p-8 transition-all duration-500 group-hover:border-primary/20 group-hover:bg-primary/[0.02] group-hover:shadow-[0_0_40px_rgba(255,107,0,0.05)] relative overflow-hidden">
            {/* Hover Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                {exp.company_logo_url ? (
                  <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center p-2 group-hover:border-primary/30 transition-colors">
                    <img 
                      src={exp.company_logo_url} 
                      alt={exp.company} 
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/10 flex items-center justify-center text-2xl font-black text-primary/40 group-hover:text-primary transition-colors">
                    {exp.company.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors tracking-tight uppercase">
                      {exp.role}
                    </h3>
                    <h4 className="text-lg font-bold text-muted-foreground/80">
                      {exp.company}
                    </h4>
                  </div>
                  <div className="text-sm font-black tracking-widest text-primary/80 bg-primary/5 border border-primary/10 px-4 py-2 rounded-lg w-fit uppercase">
                    {new Date(exp.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - {exp.current ? "Present" : exp.end_date ? new Date(exp.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ""}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-muted-foreground/90 text-lg leading-relaxed max-w-3xl">
              <p className="whitespace-pre-wrap">{exp.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
