import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-primary font-medium px-4 py-2 bg-primary/10 rounded-full">
                {"✨ Welcome to my portfolio"}
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Creative Designer & Developer
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Crafting beautiful, accessible digital experiences with a passion for design and attention to detail.
              Let's create something amazing together.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                View My Work
              </Button>
              <Button size="lg" variant="outline">
                Get In Touch
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center overflow-hidden">
              <img src="/elegant-woman-with-flowers-soft-pink-aesthetic.jpg" alt="Portfolio hero" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 text-6xl animate-bounce-slow">🌺</div>
            <div className="absolute -top-4 -left-4 text-5xl animate-pulse">🌸</div>
          </div>
        </div>
      </div>
    </section>
  )
}
