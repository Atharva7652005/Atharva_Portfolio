'use client'

import { useEffect, useState, useRef } from 'react'
import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react'

const roles = [
  'Full Stack Developer',
  'Open Source Enthusiast',
  'UI/UX Designer',
  'Problem Solver',
]

const codeSnippet = `const developer = {
  name: "[YOUR NAME]",
  skills: ["React", "Node.js", "TypeScript"],
  passion: "Building amazing web apps",
  coffee: Infinity,
};

while (developer.coffee > 0) {
  code();
  create();
  innovate();
}`

export function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Greeting animation
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Typewriter effect for roles
  useEffect(() => {
    const currentRole = roles[roleIndex]
    const typeSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    if (!isDeleting && displayText === currentRole) {
      const timer = setTimeout(() => setIsDeleting(true), pauseTime)
      return () => clearTimeout(timer)
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentRole.slice(0, prev.length + 1)
      )
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  const scrollToWork = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-secondary/20 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Greeting */}
            <div
              className={`transition-all duration-700 ${
                showGreeting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-block px-4 py-2 rounded-full glass text-primary font-mono text-sm mb-6">
                {'>'} Hello, World!
              </span>
            </div>

            {/* Name with glitch effect */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold font-mono mb-4 transition-all duration-700 delay-200 ${
                showGreeting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-muted-foreground">{"I'm "}</span>
              <span className="text-primary neon-text relative">
                [YOUR NAME]
                <span className="absolute inset-0 text-neon-secondary opacity-0 hover:opacity-100 transition-opacity duration-100 hover:animate-[glitch_0.3s_ease-in-out]">
                  [YOUR NAME]
                </span>
              </span>
            </h1>

            {/* Animated role */}
            <div
              className={`h-12 mb-6 transition-all duration-700 delay-300 ${
                showGreeting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-xl sm:text-2xl font-mono text-foreground">
                <span className="text-neon-secondary">{'<'}</span>
                {displayText}
                <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-[blink_1s_infinite]" />
                <span className="text-neon-secondary">{' />'}</span>
              </p>
            </div>

            {/* Description */}
            <p
              className={`text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mb-8 transition-all duration-700 delay-400 ${
                showGreeting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              Crafting digital experiences with clean code and creative solutions.
              Passionate about building products that make a difference.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 transition-all duration-700 delay-500 ${
                showGreeting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={scrollToWork}
                className="group relative px-8 py-4 rounded-lg font-mono font-semibold text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-primary" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-neon-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 animate-[glow-pulse_2s_infinite]" />
                <span className="relative flex items-center justify-center gap-2">
                  View My Work
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 rounded-lg font-mono font-semibold border border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div
              className={`flex gap-4 justify-center lg:justify-start transition-all duration-700 delay-600 ${
                showGreeting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {[
                { icon: Github, href: '[GITHUB_URL]', label: 'GitHub' },
                { icon: Linkedin, href: '[LINKEDIN_URL]', label: 'LinkedIn' },
                { icon: Twitter, href: '[TWITTER_URL]', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg glass text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Floating Code Snippet */}
          <div
            className={`hidden lg:block transition-all duration-1000 delay-300 ${
              showGreeting
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative animate-[float_6s_ease-in-out_infinite]">
              {/* Code window */}
              <div className="glass rounded-xl overflow-hidden">
                {/* Window header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 font-mono text-xs text-muted-foreground">
                    developer.ts
                  </span>
                </div>
                {/* Code content */}
                <pre className="p-6 font-mono text-sm overflow-hidden">
                  <code>
                    {codeSnippet.split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="w-8 text-muted-foreground/50 select-none">
                          {i + 1}
                        </span>
                        <span className="flex-1">
                          {line
                            .replace(/const|while/g, '<kw>$&</kw>')
                            .replace(/"[^"]*"/g, '<str>$&</str>')
                            .replace(/Infinity/g, '<num>$&</num>')
                            .replace(/\b(name|skills|passion|coffee|developer)\b/g, '<prop>$&</prop>')
                            .split(/(<[^>]+>[^<]*<\/[^>]+>)/)
                            .map((part, j) => {
                              if (part.startsWith('<kw>')) {
                                return <span key={j} className="text-neon-secondary">{part.replace(/<\/?kw>/g, '')}</span>
                              }
                              if (part.startsWith('<str>')) {
                                return <span key={j} className="text-green-400">{part.replace(/<\/?str>/g, '')}</span>
                              }
                              if (part.startsWith('<num>')) {
                                return <span key={j} className="text-orange-400">{part.replace(/<\/?num>/g, '')}</span>
                              }
                              if (part.startsWith('<prop>')) {
                                return <span key={j} className="text-primary">{part.replace(/<\/?prop>/g, '')}</span>
                              }
                              return <span key={j} className="text-foreground">{part}</span>
                            })}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-primary/30 rounded-lg rotate-12" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-neon-secondary/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  )
}
