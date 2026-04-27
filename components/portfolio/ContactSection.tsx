'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import { Send, Github, Linkedin, Twitter, Mail, MapPin, Loader2, Pencil, Plus, X } from 'lucide-react'
import { useAdmin } from './admin/AdminContext'
import { EditableText } from './admin/EditableText'

const iconMap: Record<string, React.ElementType> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Email: Mail,
}

export function ContactSection() {
  const { data, updateContact, isEditMode } = useAdmin()
  const { heading, subtext, location, email, socialLinks } = data.contact

  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [editingSocials, setEditingSocials] = useState(false)

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleAddSocialLink = () => {
    updateContact({
      socialLinks: [...socialLinks, { platform: 'New', url: '#', color: 'hover:text-primary' }]
    })
  }

  const handleRemoveSocialLink = (index: number) => {
    updateContact({
      socialLinks: socialLinks.filter((_, i) => i !== index)
    })
  }

  const handleUpdateSocialLink = (index: number, updates: Partial<typeof socialLinks[0]>) => {
    const newLinks = [...socialLinks]
    newLinks[index] = { ...newLinks[index], ...updates }
    updateContact({ socialLinks: newLinks })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-primary font-mono text-sm mb-4">
            {'// Get In Touch'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-4">
            <span className="text-primary">{'<'}</span>
            <EditableText
              value={heading}
              onChange={(value) => updateContact({ heading: value })}
              className="inline"
            />
            <span className="text-primary">{' />'}</span>
          </h2>
          <div className="text-muted-foreground max-w-2xl mx-auto">
            <EditableText
              value={subtext}
              onChange={(value) => updateContact({ subtext: value })}
              tag="p"
              className="text-muted-foreground"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="glass rounded-xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-mono text-xl font-semibold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block font-mono text-sm text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block font-mono text-sm text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block font-mono text-sm text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-6 py-4 rounded-lg font-mono font-semibold text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-primary" />
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-neon-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute inset-0 animate-[glow-pulse_2s_infinite]" />
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="space-y-8">
              {/* Location */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono text-lg font-semibold text-foreground">Location</h3>
                    <EditableText
                      value={location}
                      onChange={(value) => updateContact({ location: value })}
                      tag="p"
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Available for remote work worldwide and open to relocation opportunities.
                </p>
              </div>

              {/* Email */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-neon-secondary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-neon-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono text-lg font-semibold text-foreground">Email</h3>
                    {isEditMode ? (
                      <EditableText
                        value={email}
                        onChange={(value) => updateContact({ email: value })}
                        className="text-primary"
                      />
                    ) : (
                      <a
                        href={`mailto:${email}`}
                        className="text-primary hover:underline"
                      >
                        {email}
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  I typically respond within 24-48 hours.
                </p>
              </div>

              {/* Social Links */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-lg font-semibold text-foreground">
                    Connect With Me
                  </h3>
                  {isEditMode && (
                    <button
                      onClick={() => setEditingSocials(!editingSocials)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono hover:bg-primary/30 transition-colors"
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>
                  )}
                </div>

                {editingSocials && isEditMode ? (
                  <div className="space-y-3">
                    {socialLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={link.platform}
                          onChange={(e) => handleUpdateSocialLink(index, { platform: e.target.value })}
                          placeholder="Platform"
                          className="w-24 px-2 py-1 rounded bg-muted border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleUpdateSocialLink(index, { url: e.target.value })}
                          placeholder="URL"
                          className="flex-1 px-2 py-1 rounded bg-muted border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary"
                        />
                        <button
                          onClick={() => handleRemoveSocialLink(index)}
                          className="p-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddSocialLink}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-mono hover:bg-primary/30 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add Link
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    {socialLinks.map((link) => {
                      const Icon = iconMap[link.platform] || Github
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-4 rounded-lg glass text-muted-foreground ${link.color} transition-all duration-300 hover:scale-110 hover:border-primary/30 group`}
                          aria-label={link.platform}
                        >
                          <Icon className="w-6 h-6 group-hover:animate-bounce" />
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Availability status */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                  </div>
                  <span className="font-mono text-sm text-foreground">
                    Currently available for new opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
