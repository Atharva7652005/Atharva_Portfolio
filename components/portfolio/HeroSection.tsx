'use client'

import { useEffect, useState, useRef } from 'react'
import { ChevronDown, Github, Linkedin, Twitter, Plus, X, Pencil, Check } from 'lucide-react'
import { useAdmin } from './admin/AdminContext'
import { EditableText } from './admin/EditableText'

export function HeroSection() {
  const { data, updateHero, isEditMode } = useAdmin()
  const { name, roles, subtitle, ctaText, socialLinks, codeSnippet } = data.hero

  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [editingRoles, setEditingRoles] = useState(false)
  const [newRole, setNewRole] = useState('')
  const [editingSocialLink, setEditingSocialLink] = useState<string | null>(null)
  const [socialLinkUrl, setSocialLinkUrl] = useState('')
  const [editingCodeLine, setEditingCodeLine] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Greeting animation
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Typewriter effect for roles
  useEffect(() => {
    if (roles.length === 0) return
    const currentRole = roles[roleIndex % roles.length]
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
  }, [displayText, isDeleting, roleIndex, roles])

  const scrollToWork = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAddRole = () => {
    if (newRole.trim()) {
      updateHero({ roles: [...roles, newRole.trim()] })
      setNewRole('')
    }
  }

  const handleRemoveRole = (index: number) => {
    updateHero({ roles: roles.filter((_, i) => i !== index) })
  }

  const handleSocialLinkEdit = (platform: string) => {
    const link = socialLinks.find(l => l.platform === platform)
    if (link) {
      setSocialLinkUrl(link.url)
      setEditingSocialLink(platform)
    }
  }

  const handleSocialLinkSave = () => {
    if (editingSocialLink) {
      const newLinks = socialLinks.map(link => 
        link.platform === editingSocialLink 
          ? { ...link, url: socialLinkUrl }
          : link
      )
      updateHero({ socialLinks: newLinks })
      setEditingSocialLink(null)
      setSocialLinkUrl('')
    }
  }

  const handleSocialLinkCancel = () => {
    setEditingSocialLink(null)
    setSocialLinkUrl('')
  }

  const handleCodeLineUpdate = (index: number, newText: string) => {
    const newLines = [...codeSnippet]
    newLines[index] = newText
    updateHero({ codeSnippet: newLines })
  }

  const handleAddCodeLine = () => {
    updateHero({ codeSnippet: [...codeSnippet, '// new line'] })
  }

  const handleRemoveCodeLine = (index: number) => {
    updateHero({ codeSnippet: codeSnippet.filter((_, i) => i !== index) })
  }

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return Github
      case 'linkedin':
        return Linkedin
      case 'twitter':
        return Twitter
      default:
        return Github
    }
  }

  const highlightCode = (line: string) => {
    return line
      .replace(/\b(const|let|var|while|if|else|return|function|class|import|export|from|default)\b/g, '<kw>$&</kw>')
      .replace(/"[^"]*"/g, '<str>$&</str>')
      .replace(/'[^']*'/g, '<str>$&</str>')
      .replace(/`[^`]*`/g, '<str>$&</str>')
      .replace(/\b(Infinity|true|false|null|undefined|\d+)\b/g, '<num>$&</num>')
      .replace(/\/\/.*/g, '<cmt>$&</cmt>')
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
        if (part.startsWith('<cmt>')) {
          return <span key={j} className="text-muted-foreground">{part.replace(/<\/?cmt>/g, '')}</span>
        }
        return <span key={j} className="text-foreground">{part}</span>
      })
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
              className={`transition-all duration-700 ${showGreeting
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
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold font-mono mb-4 transition-all duration-700 delay-200 ${showGreeting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
                }`}
            >
              <span className="text-muted-foreground">{"I'm "}</span>
              <EditableText
                value={name}
                onChange={(value) => updateHero({ name: value })}
                className="text-primary neon-text relative inline-block"
              />
            </h1>

            {/* Animated role */}
            <div
              className={`min-h-[48px] mb-6 transition-all duration-700 delay-300 ${showGreeting
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

              {/* Edit Roles Button */}
              {isEditMode && (
                <button
                  onClick={() => setEditingRoles(!editingRoles)}
                  className="mt-2 flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
                >
                  <Pencil className="w-3 h-3" />
                  Edit Roles
                </button>
              )}

              {/* Roles Editor */}
              {isEditMode && editingRoles && (
                <div className="mt-4 p-4 rounded-lg glass border border-primary/30 text-left">
                  <h4 className="font-mono text-sm text-primary mb-3">Typewriter Roles:</h4>
                  <div className="space-y-2 mb-3">
                    {roles.map((role, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="flex-1 font-mono text-sm text-foreground">{role}</span>
                        <button
                          onClick={() => handleRemoveRole(index)}
                          className="p-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddRole()}
                      placeholder="Add new role..."
                      className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={handleAddRole}
                      className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div
              className={`text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mb-8 transition-all duration-700 delay-400 ${showGreeting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
                }`}
            >
              <EditableText
                value={subtitle}
                onChange={(value) => updateHero({ subtitle: value })}
                tag="p"
                multiline
                className="text-muted-foreground text-lg"
              />
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 transition-all duration-700 delay-500 ${showGreeting
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
                  <EditableText
                    value={ctaText}
                    onChange={(value) => updateHero({ ctaText: value })}
                    className="text-primary-foreground"
                  />
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

            {/* Social Links with Inline Edit */}
            <div
              className={`flex gap-4 justify-center lg:justify-start transition-all duration-700 delay-600 ${showGreeting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
                }`}
            >
              {socialLinks.map(({ platform, url }) => {
                const Icon = getIcon(platform)
                const isEditing = editingSocialLink === platform
                
                return (
                  <div key={platform} className="relative">
                    <a
                      href={isEditMode ? undefined : url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => isEditMode && e.preventDefault()}
                      className="p-3 rounded-lg glass text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group relative block"
                      aria-label={platform}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      
                      {/* Edit icon overlay */}
                      {isEditMode && !isEditing && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSocialLinkEdit(platform)
                          }}
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Pencil className="w-3 h-3 text-primary-foreground" />
                        </button>
                      )}
                    </a>

                    {/* Inline Popover for URL editing */}
                    {isEditing && (
                      <div 
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 rounded-lg glass border border-primary/30 z-50 min-w-[250px]"
                        style={{
                          background: 'rgba(10, 10, 20, 0.95)',
                          backdropFilter: 'blur(20px)',
                        }}
                      >
                        <p className="font-mono text-xs text-primary mb-2">{platform} URL:</p>
                        <input
                          type="url"
                          value={socialLinkUrl}
                          onChange={(e) => setSocialLinkUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground font-mono text-xs placeholder:text-muted-foreground focus:outline-none focus:border-primary mb-2"
                          autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={handleSocialLinkCancel}
                            className="p-1.5 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleSocialLinkSave}
                            className="p-1.5 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Content - Floating Code Snippet (Editable) */}
          <div
            className={`hidden lg:block transition-all duration-1000 delay-300 ${showGreeting
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
                    dev.ts
                  </span>
                </div>
                {/* Code content */}
                <div className="p-6 font-mono text-sm overflow-hidden">
                  {codeSnippet.map((line, i) => (
                    <div
                      key={i}
                      className={`flex group relative ${
                        isEditMode ? 'hover:bg-primary/5 rounded transition-colors' : ''
                      }`}
                    >
                      <span className="w-8 text-muted-foreground/50 select-none flex-shrink-0">
                        {i + 1}
                      </span>
                      
                      {isEditMode && editingCodeLine === i ? (
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => handleCodeLineUpdate(i, e.target.value)}
                          onBlur={() => setEditingCodeLine(null)}
                          onKeyDown={(e) => e.key === 'Enter' && setEditingCodeLine(null)}
                          className="flex-1 bg-muted border border-primary/50 rounded px-2 py-0.5 text-foreground font-mono text-sm focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span
                          className={`flex-1 ${
                            isEditMode ? 'border border-transparent hover:border-dashed hover:border-primary/50 rounded px-1 -mx-1' : ''
                          }`}
                          onClick={() => isEditMode && setEditingCodeLine(i)}
                        >
                          {highlightCode(line)}
                        </span>
                      )}

                      {/* Delete button */}
                      {isEditMode && editingCodeLine !== i && (
                        <button
                          onClick={() => handleRemoveCodeLine(i)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded bg-destructive/20 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add line button */}
                  {isEditMode && (
                    <button
                      onClick={handleAddCodeLine}
                      className="mt-2 flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add Line
                    </button>
                  )}
                </div>
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
