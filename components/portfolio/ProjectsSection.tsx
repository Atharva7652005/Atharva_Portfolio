'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, Folder } from 'lucide-react'

interface Project {
  title: string
  description: string
  techStack: string[]
  liveUrl: string
  githubUrl: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: '[PROJECT NAME 1]',
    description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: '[LIVE_URL]',
    githubUrl: '[GITHUB_URL]',
    featured: true,
  },
  {
    title: '[PROJECT NAME 2]',
    description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    liveUrl: '[LIVE_URL]',
    githubUrl: '[GITHUB_URL]',
    featured: true,
  },
  {
    title: '[PROJECT NAME 3]',
    description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
    techStack: ['Python', 'FastAPI', 'Redis', 'Docker'],
    liveUrl: '[LIVE_URL]',
    githubUrl: '[GITHUB_URL]',
  },
  {
    title: '[PROJECT NAME 4]',
    description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
    techStack: ['React Native', 'Firebase', 'Expo'],
    liveUrl: '[LIVE_URL]',
    githubUrl: '[GITHUB_URL]',
  },
  {
    title: '[PROJECT NAME 5]',
    description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
    techStack: ['Vue.js', 'Tailwind', 'Supabase'],
    liveUrl: '[LIVE_URL]',
    githubUrl: '[GITHUB_URL]',
  },
  {
    title: '[PROJECT NAME 6]',
    description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
    techStack: ['Go', 'gRPC', 'Kubernetes'],
    liveUrl: '[LIVE_URL]',
    githubUrl: '[GITHUB_URL]',
  },
]

const techColors: Record<string, string> = {
  'React': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'React Native': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Next.js': 'bg-white/10 text-white border-white/20',
  'Node.js': 'bg-green-500/20 text-green-400 border-green-500/30',
  'TypeScript': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Python': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'MongoDB': 'bg-green-600/20 text-green-400 border-green-600/30',
  'PostgreSQL': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  'Prisma': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'Socket.io': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'FastAPI': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Redis': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Docker': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Firebase': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Expo': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Vue.js': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Tailwind': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Supabase': 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30',
  'Go': 'bg-cyan-600/20 text-cyan-400 border-cyan-600/30',
  'gRPC': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Kubernetes': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
}

function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div
      ref={cardRef}
      className={`glass rounded-xl overflow-hidden transition-all duration-500 hover:border-primary/30 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${project.featured ? 'ring-1 ring-primary/20' : ''}`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        transition: 'transform 0.15s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono border border-primary/30">
            Featured
          </span>
        </div>
      )}

      {/* Card content */}
      <div className="p-6 relative">
        {/* Project icon */}
        <div className="w-12 h-12 rounded-lg glass flex items-center justify-center mb-4 text-primary">
          <Folder className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="font-mono text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 rounded-full text-xs font-mono border ${
                techColors[tech] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:opacity-90 transition-all hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-primary/50 text-primary font-mono text-sm font-medium hover:bg-primary/10 transition-all hover:scale-105"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-neon-secondary/5" />
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-secondary/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-primary font-mono text-sm mb-4">
            {'// Featured Work'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-4">
            <span className="text-primary">{'<'}</span>
            Projects
            <span className="text-primary">{' />'}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects I&apos;ve worked on. Each one taught me something new.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View More Button */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="[GITHUB_PROFILE_URL]"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/50 text-primary font-mono text-sm hover:bg-primary/10 transition-all hover:scale-105"
          >
            <Github className="w-4 h-4" />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
