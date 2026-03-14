import { Metadata } from "next"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch with me.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20 max-w-3xl">
      <div className="space-y-4 mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Get In Touch</h1>
        <p className="text-xl text-muted-foreground">
          Have a question or want to work together? Leave a message below.
        </p>
      </div>

      <div className="bg-card p-6 md:p-8 rounded-xl border shadow-sm">
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Name
              </label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email
              </label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium leading-none">
              Subject
            </label>
            <Input id="subject" placeholder="Project Inquiry" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none">
              Message
            </label>
            <Textarea 
              id="message" 
              placeholder="Tell me about your project..." 
              required 
              className="min-h-[150px] resize-y" 
            />
          </div>
          <Button type="button" className="w-full sm:w-auto px-8">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
}
