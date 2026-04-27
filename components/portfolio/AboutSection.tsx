'use client'

import { useEffect, useRef, useState } from 'react'
import { Coffee, Code, Heart, Plus, X, Pencil, Check, AlertTriangle } from 'lucide-react'
import { useAdmin } from './admin/AdminContext'
import { EditableText } from './admin/EditableText'

export function AboutSection() {
  const { data, updateAbout, isEditMode, showToast } = useAdmin()
  const { bio, terminalLines, funFacts, profileImage } = data.about

  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [editingFunFacts, setEditingFunFacts] = useState(false)
  const [editingCodeLine, setEditingCodeLine] = useState<number | null>(null)
  const [editingProfileImage, setEditingProfileImage] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState(profileImage || '')
  const [imageError, setImageError] = useState(false)

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
      }, index * 150 + 100)
    })
  }, [isVisible, terminalLines])

  const handleAddTerminalLine = (type: 'command' | 'text') => {
    const newLine = type === 'command'
      ? { prefix: '~', command: 'new_command' }
      : { prefix: '>', text: 'New text', color: '' }
    updateAbout({ terminalLines: [...terminalLines, newLine] })
  }

  const handleRemoveTerminalLine = (index: number) => {
    updateAbout({ terminalLines: terminalLines.filter((_, i) => i !== index) })
  }

  const handleUpdateTerminalLine = (index: number, value: string) => {
    const newLines = [...terminalLines]
    if ('command' in newLines[index]) {
      newLines[index] = { ...newLines[index], command: value }
    } else {
      newLines[index] = { ...newLines[index], text: value }
    }
    updateAbout({ terminalLines: newLines })
  }

  const handleAddFunFact = () => {
    updateAbout({ funFacts: [...funFacts, { label: 'New fact', value: '0' }] })
  }

  const handleRemoveFunFact = (index: number) => {
    updateAbout({ funFacts: funFacts.filter((_, i) => i !== index) })
  }

  const handleUpdateFunFact = (index: number, updates: Partial<typeof funFacts[0]>) => {
    const newFacts = [...funFacts]
    newFacts[index] = { ...newFacts[index], ...updates }
    updateAbout({ funFacts: newFacts })
  }

  const handleProfileImageSave = () => {
    // Validate image URL by attempting to load it
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      updateAbout({ profileImage: profileImageUrl })
      setEditingProfileImage(false)
      setImageError(false)
      showToast('Profile image updated!')
    }
    img.onerror = () => {
      setImageError(true)
      showToast('Invalid image URL')
    }
    img.src = profileImageUrl
  }

  const handleProfileImageCancel = () => {
    setProfileImageUrl(profileImage || '')
    setEditingProfileImage(false)
    setImageError(false)
  }

  const funFactIcons = [Coffee, Code, Heart]

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
              {/* Profile photo */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/50 to-neon-secondary/50 blur-xl" />
                <div className="relative w-full h-full rounded-2xl glass overflow-hidden border-2 border-primary/30">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile"
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <Code className="w-12 h-12 text-primary" />
                        </div>
                        <p className="font-mono text-sm text-muted-foreground">[YOUR PHOTO]</p>
                      </div>
                    </div>
                  )}

                  {/* Edit profile image button */}
                  {isEditMode && !editingProfileImage && (
                    <button
                      onClick={() => {
                        setProfileImageUrl(profileImage || '')
                        setEditingProfileImage(true)
                      }}
                      className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform z-10"
                      title="Edit profile image"
                    >
                      <Pencil className="w-4 h-4 text-primary-foreground" />
                    </button>
                  )}
                </div>

                {/* Profile image URL editor (inline) */}
                {editingProfileImage && (
                  <div 
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 p-3 rounded-lg z-20"
                    style={{
                      background: 'rgba(10, 10, 20, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(0, 245, 255, 0.3)',
                    }}
                  >
                    <p className="font-mono text-xs text-primary mb-2">Profile Image URL:</p>
                    <input
                      type="url"
                      value={profileImageUrl}
                      onChange={(e) => {
                        setProfileImageUrl(e.target.value)
                        setImageError(false)
                      }}
                      placeholder="https://example.com/photo.jpg"
                      className={`w-full px-3 py-2 rounded-lg bg-muted border text-foreground font-mono text-xs placeholder:text-muted-foreground focus:outline-none mb-2 ${
                        imageError ? 'border-destructive' : 'border-border focus:border-primary'
                      }`}
                      autoFocus
                    />
                    {imageError && (
                      <p className="flex items-center gap-1 text-destructive text-xs font-mono mb-2">
                        <AlertTriangle className="w-3 h-3" />
                        Invalid image URL
                      </p>
                    )}
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleProfileImageCancel}
                        className="p-1.5 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleProfileImageSave}
                        className="p-1.5 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                        title="Save"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-2 border-neon-secondary rounded-lg rotate-12" />
              </div>

              {/* Fun facts */}
              {isEditMode && (
                <button
                  onClick={() => setEditingFunFacts(!editingFunFacts)}
                  className="mb-4 mx-auto flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
                >
                  <Pencil className="w-3 h-3" />
                  Edit Fun Facts
                </button>
              )}

              {editingFunFacts && isEditMode && (
                <div className="mb-4 p-4 rounded-lg glass border border-primary/30">
                  <h4 className="font-mono text-sm text-primary mb-3">Fun Facts:</h4>
                  <div className="space-y-2 mb-3">
                    {funFacts.map((fact, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={fact.value}
                          onChange={(e) => handleUpdateFunFact(index, { value: e.target.value })}
                          className="w-20 px-2 py-1 rounded bg-muted border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary"
                        />
                        <input
                          type="text"
                          value={fact.label}
                          onChange={(e) => handleUpdateFunFact(index, { label: e.target.value })}
                          className="flex-1 px-2 py-1 rounded bg-muted border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary"
                        />
                        <button
                          onClick={() => handleRemoveFunFact(index)}
                          className="p-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAddFunFact}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-mono hover:bg-primary/30 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add Fact
                  </button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                {funFacts.map((fact, index) => {
                  const Icon = funFactIcons[index % funFactIcons.length]
                  return (
                    <div
                      key={index}
                      className={`glass rounded-xl p-4 text-center transition-all duration-500 hover:scale-105 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="font-mono text-xl font-bold text-foreground">{fact.value}</p>
                      <p className="text-xs text-muted-foreground">{fact.label}</p>
                    </div>
                  )
                })}
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
            <div className="text-muted-foreground text-lg leading-relaxed mb-8">
              <EditableText
                value={bio}
                onChange={(value) => updateAbout({ bio: value })}
                tag="p"
                multiline
                className="text-muted-foreground text-lg leading-relaxed"
              />
            </div>

            {/* Terminal - Fully Editable */}
            <div className="glass rounded-xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 font-mono text-xs text-muted-foreground">
                    terminal — bash
                  </span>
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-4 font-mono text-sm space-y-1 min-h-[240px]">
                {terminalLines.map((line, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 transition-all duration-300 group relative ${
                      visibleLines.includes(index)
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    } ${isEditMode ? 'hover:bg-primary/5 rounded px-1 -mx-1' : ''}`}
                  >
                    <span className="text-neon-secondary flex-shrink-0">{line.prefix}</span>
                    
                    {isEditMode && editingCodeLine === index ? (
                      <input
                        type="text"
                        value={line.command || line.text || ''}
                        onChange={(e) => handleUpdateTerminalLine(index, e.target.value)}
                        onBlur={() => setEditingCodeLine(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingCodeLine(null)}
                        className="flex-1 bg-muted border border-primary/50 rounded px-2 py-0.5 text-foreground font-mono text-sm focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`flex-1 ${
                          isEditMode
                            ? 'border border-transparent hover:border-dashed hover:border-primary/50 rounded px-1 -mx-1'
                            : ''
                        } ${line.color || ('command' in line ? 'text-foreground' : 'text-primary')}`}
                        onClick={() => isEditMode && setEditingCodeLine(index)}
                      >
                        {line.command || line.text}
                      </span>
                    )}

                    {/* Delete button */}
                    {isEditMode && editingCodeLine !== index && (
                      <button
                        onClick={() => handleRemoveTerminalLine(index)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded bg-destructive/20 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}

                {/* Add line buttons */}
                {isEditMode && (
                  <div className="flex gap-2 mt-4 pt-2 border-t border-white/10">
                    <button
                      onClick={() => handleAddTerminalLine('command')}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-mono hover:bg-primary/30 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add Command
                    </button>
                    <button
                      onClick={() => handleAddTerminalLine('text')}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-neon-secondary/20 text-neon-secondary text-xs font-mono hover:bg-neon-secondary/30 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add Output
                    </button>
                  </div>
                )}

                {/* Cursor */}
                {!isEditMode && (
                  <div className="flex items-center gap-2">
                    <span className="text-neon-secondary">~</span>
                    <span className="w-2 h-4 bg-primary animate-[blink_1s_infinite]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
