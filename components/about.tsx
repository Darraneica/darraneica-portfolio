import { Card } from "@/components/ui/card"

export function About() {
  const skills = [
    { icon: "🎨", title: "UI/UX Design", description: "Creating intuitive and beautiful interfaces" },
    { icon: "💻", title: "Web Development", description: "Building responsive and performant websites" },
    { icon: "✨", title: "Brand Identity", description: "Crafting unique visual experiences" },
    { icon: "🌸", title: "Creative Direction", description: "Leading projects with artistic vision" },
  ]

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            I'm a passionate creative professional dedicated to bringing ideas to life through thoughtful design and
            elegant code.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
