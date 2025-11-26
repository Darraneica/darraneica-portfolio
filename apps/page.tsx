import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { FloralDecor } from "@/components/floral-decor"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <FloralDecor />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}
