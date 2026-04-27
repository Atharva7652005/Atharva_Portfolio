import { ParticleBackground } from '@/components/portfolio/ParticleBackground'
import { Navbar } from '@/components/portfolio/Navbar'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { ProjectsSection } from '@/components/portfolio/ProjectsSection'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { ContactSection } from '@/components/portfolio/ContactSection'
import { Footer } from '@/components/portfolio/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Particle network background */}
      <ParticleBackground />
      
      {/* Sticky navigation */}
      <Navbar />
      
      {/* Main sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
