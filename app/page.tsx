'use client'

import { ParticleBackground } from '@/components/portfolio/ParticleBackground'
import { Navbar } from '@/components/portfolio/Navbar'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { ProjectsSection } from '@/components/portfolio/ProjectsSection'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { ContactSection } from '@/components/portfolio/ContactSection'
import { Footer } from '@/components/portfolio/Footer'
import { AdminProvider } from '@/components/portfolio/admin/AdminContext'
import { AdminFloatingButton } from '@/components/portfolio/admin/AdminFloatingButton'
import { LoginModal } from '@/components/portfolio/admin/LoginModal'
import { AdminToolbar } from '@/components/portfolio/admin/AdminToolbar'
import { Toast } from '@/components/portfolio/admin/Toast'
import { NeonCursor } from '@/components/portfolio/NeonCursor'

export default function Home() {
  return (
    <AdminProvider>
      {/* Custom neon cursor */}
      <NeonCursor />
      
      <main className="relative min-h-screen">
        {/* Admin Components */}
        <AdminToolbar />
        <LoginModal />
        <AdminFloatingButton />
        <Toast />

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
    </AdminProvider>
  )
}
