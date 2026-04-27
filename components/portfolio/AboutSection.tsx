'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Briefcase, CheckCircle, Coffee, Code, Heart } from 'lucide-react'

const terminalLines = [
  { prefix: '~', command: 'whoami', delay: 0 },
  { prefix: '>', text: '[YOUR NAME]', delay: 100 },
  { prefix: '~', command: 'cat location.txt', delay: 200 },
  { prefix: '>', text: '[YOUR CITY], [YOUR COUNTRY]', icon: MapPin, delay: 300 },
  { prefix: '~', command: 'echo $EXPERIENCE', delay: 400 },
  { prefix: '>', text: '[X] years in tech', icon: Briefcase, delay: 500 },
  { prefix: '~', command: 'cat status.txt', delay: 600 },
  { prefix: '>', text: 'Open to opportunities', icon: CheckCircle, color: 'text-green-400', delay: 700 },
]

const funFacts = [
  { icon: Coffee, label: 'Cups of coffee', value: '999+' },
  { icon: Code, label: 'Lines of code', value: '100K+' },
  { icon: Heart, label: 'Open source PRs', value: '50+' },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    terminalLines.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index])
      }, terminalLines[index].delay + index * 150)
    })
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-secondary/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-primary font-mono text-sm mb-4">
            {'// About Me'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-4">
            <span className="text-primary">{'<'}</span>
            Get To Know Me
            <span className="text-primary">{' />'}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Photo & Fun Facts */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Profile photo placeholder */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/50 to-neon-secondary/50 blur-xl" />
                <div className="relative w-full h-full rounded-2xl glass overflow-hidden border-2 border-primary/30">
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <Code className="w-12 h-12 text-primary" />
                      </div>
                      <p className="font-mono text-sm text-muted-foreground">[YOUR PHOTO]</p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-2 border-neon-secondary rounded-lg rotate-12" />
              </div>

              {/* Fun facts */}
              <div className="grid grid-cols-3 gap-4">
                {funFacts.map(({ icon: Icon, label, value }, index) => (
                  <div
                    key={label}
                    className={`glass rounded-xl p-4 text-center transition-all duration-500 hover:scale-105 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="font-mono text-xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal & Bio */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Bio */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              [YOUR BIO - Write 2-3 sentences about yourself. What drives you? What&apos;s your
              background? What makes you unique as a developer? Share your passion for
              technology and your journey in the tech world.]
            </p>

            {/* Terminal */}
            <div className="glass rounded-xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-xs text-muted-foreground">
                  terminal — bash
                </span>
              </div>

              {/* Terminal content */}
              <div className="p-4 font-mono text-sm space-y-2 min-h-[240px]">
                {terminalLines.map((line, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      visibleLines.includes(index)
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    <span className="text-neon-secondary">{line.prefix}</span>
                    {'command' in line ? (
                      <span className="text-foreground">{line.command}</span>
                    ) : (
                      <span className={`flex items-center gap-2 ${line.color || 'text-primary'}`}>
                        {line.icon && <line.icon className="w-4 h-4" />}
                        {line.text}
                      </span>
                    )}
                  </div>
                ))}
                {/* Cursor */}
                <div className="flex items-center gap-2">
                  <span className="text-neon-secondary">~</span>
                  <span className="w-2 h-4 bg-primary animate-[blink_1s_infinite]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
