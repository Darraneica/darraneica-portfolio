import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">{"Let's Work Together"}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Have a project in mind? I'd love to hear from you. Send me a message and let's create something beautiful.
          </p>
        </div>
        <Card className="p-8 bg-card border-border">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <Input id="name" placeholder="Your name" className="bg-background" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your@email.com" className="bg-background" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                rows={6}
                className="bg-background resize-none"
              />
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Send Message 🌸
            </Button>
          </form>
        </Card>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Or connect with me on</p>
          <div className="flex justify-center gap-4">
            {["GitHub", "LinkedIn", "Twitter", "Dribbble"].map((platform) => (
              <Button key={platform} variant="outline" size="sm">
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
