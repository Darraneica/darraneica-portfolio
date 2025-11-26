import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Projects() {
  const projects = [
    {
      title: "Bloom & Co.",
      description: "A modern e-commerce platform for floral arrangements",
      image: "/elegant-flower-shop-website-pink.jpg",
      tags: ["Design", "Development", "E-commerce"],
    },
    {
      title: "Creative Studio",
      description: "Portfolio website for a design agency",
      image: "/modern-creative-agency-website-pastel.jpg",
      tags: ["UI/UX", "Branding", "Web"],
    },
    {
      title: "Wellness App",
      description: "Mobile app design for mental health and meditation",
      image: "/wellness-meditation-app-soft-pink.jpg",
      tags: ["Mobile", "UX", "Health"],
    },
  ]

  return (
    <section id="projects" className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A collection of my recent work showcasing creativity, technical skills, and attention to detail.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Project
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
