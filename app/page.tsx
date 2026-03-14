import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { CldImage } from "next-cloudinary"

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from("profile_info").select("*").single()

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-12 xl:col-span-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="text-xl md:text-2xl font-semibold text-muted-foreground/80 tracking-wide mb-2 block">
                Hi I am
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {profile?.full_name || "Manjunath U K"}
              </h2>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase">
                {profile?.headline ? (
                  <>
                    <span className="text-primary block mb-2">{profile.headline.split(' ')[0]}</span>
                    <span className="text-white">{profile.headline.split(' ').slice(1).join(' ')}</span>
                  </>
                ) : (
                  <>
                    <span className="text-primary block mb-2">UI/UX</span>
                    <span className="text-white">Designer</span>
                  </>
                )}
              </h1>
            </div>

            <div className="flex items-center gap-6">
              {[
                { icon: <Github className="h-5 w-5" />, url: profile?.github_url },
                { icon: <Linkedin className="h-5 w-5" />, url: profile?.linkedin_url },
                { icon: <Mail className="h-5 w-5" />, url: `mailto:${profile?.email}` },
              ].map((social, idx) => (
                social.url && (
                  <Link 
                    key={idx}
                    href={social.url} 
                    target="_blank"
                    className="p-3 rounded-full border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all hover:bg-primary/5"
                  >
                    {social.icon}
                  </Link>
                )
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 rounded-xl text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                <Link href="/contact">Hire Me</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 hover:border-white/40 text-white font-bold h-14 px-10 rounded-xl text-lg backdrop-blur-sm transition-all hover:bg-white/5">
                <Link href="/resume">Download CV</Link>
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 pt-12 md:pt-16 max-w-xl">
              <div className="space-y-1 border-r border-white/10 pr-4">
                <div className="text-2xl md:text-4xl font-black text-primary">5+</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-widest leading-tight">Experiences</div>
              </div>
              <div className="space-y-1 border-r border-white/10 pr-4">
                <div className="text-2xl md:text-4xl font-black text-primary">20+</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-widest leading-tight">Project done</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-4xl font-black text-primary">80+</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-widest leading-tight">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Large Circular Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div className="relative w-72 h-72 md:w-[500px] md:h-[500px]">
              {/* Outer Background Circle */}
              <div className="absolute inset-0 bg-white/5 rounded-full -z-10 animate-pulse" />
              
              <div className="w-full h-full rounded-full overflow-hidden border-[12px] border-white/5 shadow-2xl relative group">
                {profile?.profile_image_url ? (
                  <CldImage
                    src={profile.profile_image_url} 
                    alt={profile.full_name || "Profile"} 
                    width={1000}
                    height={1000}
                    crop="fill"
                    gravity="face"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-8xl font-black text-primary/20">
                    {profile?.full_name?.charAt(0) || "M"}
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Small floating accents linked to the reference image feel */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
