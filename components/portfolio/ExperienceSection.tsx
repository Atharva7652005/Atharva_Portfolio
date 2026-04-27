'use client'

import { useEffect, useRef, useState } from 'react'
import { Building2, Calendar } from 'lucide-react'

interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies: string[]
}

const experiences: Experience[] = [
  {
    title: '[JOB TITLE 1]',
    company: '[COMPANY NAME 1]',
    location: '[LOCATION]',
    period: '[START DATE] - Present',
    description: [
      '[Achievement or responsibility 1 - Use action verbs and quantify impact when possible]',
      '[Achievement or responsibility 2 - What did you build? What problems did you solve?]',
      '[Achievement or responsibility 3 - Mention team collaboration, leadership, or key projects]',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    title: '[JOB TITLE 2]',
    company: '[COMPANY NAME 2]',
    location: '[LOCATION]',
    period: '[START DATE] - [END DATE]',
    description: [
      '[Achievement or responsibility 1 - Use action verbs and quantify impact when possible]',
      '[Achievement or responsibility 2 - What did you build? What problems did you solve?]',
      '[Achievement or responsibility 3 - Mention team collaboration, leadership, or key projects]',
    ],
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    title: '[JOB TITLE 3]',
    company: '[COMPANY NAME 3]',
    location: '[LOCATION]',
    period: '[START DATE] - [END DATE]',
    description: [
      '[Achievement or responsibility 1 - Use action verbs and quantify impact when possible]',
      '[Achievement or responsibility 2 - What did you build? What problems did you solve?]',
    ],
    technologies: ['JavaScript', 'React', 'Firebase'],
  },
]

function TimelineItem({ experience, index, isVisible }: { experience: Experience; index: number; isVisible: boolean }) {
  return (
    <div
      className={`relative pl-8 md:pl-0 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline line and dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-neon-secondary to-primary/30" />
      <div
        className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 transition-all duration-500 ${
          isVisible ? 'scale-100' : 'scale-0'
        }`}
        style={{ transitionDelay: `${index * 150 + 200}ms` }}
      >
        <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
      </div>

      {/* Content */}
      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
        <div
          className={`glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: `${index * 150 + 100}ms` }}
        >
          {/* Period badge */}
          <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary">{experience.period}</span>
          </div>

          {/* Title and company */}
          <h3 className="font-mono text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {experience.title}
          </h3>
          <div className={`flex items-center gap-2 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
            <Building2 className="w-4 h-4 text-neon-secondary" />
            <span className="text-muted-foreground">
              {experience.company} · {experience.location}
            </span>
          </div>

          {/* Description */}
          <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
            {experience.description.map((item, i) => (
              <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                <span className={`text-primary mt-1 ${index % 2 === 0 ? 'md:order-2' : ''}`}>▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
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
      id="experience"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-primary font-mono text-sm mb-4">
            {'// Career Journey'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-4">
            <span className="text-primary">{'<'}</span>
            Experience
            <span className="text-primary">{' />'}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey in the tech industry
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-12">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.company}
              experience={experience}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
