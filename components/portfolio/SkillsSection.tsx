'use client'

import { useEffect, useRef, useState } from 'react'

interface Skill {
  name: string
  level: number
  icon: string
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Python', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Go', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'React', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Node.js', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Docker', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'AWS', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'PostgreSQL', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    ],
  },
]

function SkillBar({ skill, isVisible, delay }: { skill: Skill; isVisible: boolean; delay: number }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(skill.level), delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, skill.level, delay])

  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 p-1 rounded-lg glass flex items-center justify-center group-hover:scale-110 transition-transform">
          <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
        </div>
        <span className="font-mono text-sm text-foreground flex-1">{skill.name}</span>
        <span className="font-mono text-xs text-primary">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-neon-secondary transition-all duration-1000 ease-out relative"
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

function HexagonSkill({ skill, isVisible, delay }: { skill: Skill; isVisible: boolean; delay: number }) {
  return (
    <div
      className={`group transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative w-24 h-28 mx-auto">
        {/* Hexagon shape */}
        <svg viewBox="0 0 100 115" className="w-full h-full">
          <defs>
            <linearGradient id={`gradient-${skill.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--neon)" />
              <stop offset="100%" stopColor="var(--neon-secondary)" />
            </linearGradient>
          </defs>
          <path
            d="M50 0 L100 28.75 L100 86.25 L50 115 L0 86.25 L0 28.75 Z"
            fill="rgba(255,255,255,0.03)"
            stroke={`url(#gradient-${skill.name})`}
            strokeWidth="2"
            className="transition-all duration-300 group-hover:fill-primary/10"
          />
        </svg>
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 p-2 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <img src={skill.icon} alt={skill.name} className="w-full h-full" />
          </div>
        </div>
      </div>
      <p className="text-center font-mono text-sm text-foreground mt-2">{skill.name}</p>
      <p className="text-center font-mono text-xs text-primary">{skill.level}%</p>
    </div>
  )
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [viewMode, setViewMode] = useState<'bars' | 'hexagons'>('bars')

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
      id="skills"
      className="relative py-24 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-primary font-mono text-sm mb-4">
            {'// Skills & Expertise'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-4">
            <span className="text-primary">{'<'}</span>
            Tech Stack
            <span className="text-primary">{' />'}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with on a daily basis to bring ideas to life
          </p>
        </div>

        {/* View Toggle */}
        <div
          className={`flex justify-center mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass rounded-lg p-1 inline-flex">
            <button
              onClick={() => setViewMode('bars')}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-all ${
                viewMode === 'bars'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Progress Bars
            </button>
            <button
              onClick={() => setViewMode('hexagons')}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-all ${
                viewMode === 'hexagons'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Hexagons
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        {viewMode === 'bars' ? (
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.title}
                className={`glass rounded-xl p-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + catIndex * 100}ms` }}
              >
                <h3 className="font-mono text-lg font-semibold text-primary mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      isVisible={isVisible}
                      delay={500 + catIndex * 200 + skillIndex * 150}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.title}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + catIndex * 100}ms` }}
              >
                <h3 className="font-mono text-lg font-semibold text-primary mb-8 text-center flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <HexagonSkill
                      key={skill.name}
                      skill={skill}
                      isVisible={isVisible}
                      delay={500 + catIndex * 200 + skillIndex * 100}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
