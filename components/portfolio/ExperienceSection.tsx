'use client'

import { useEffect, useRef, useState } from 'react'
import { Building2, Calendar, Plus, X, Pencil } from 'lucide-react'
import { useAdmin, Experience } from './admin/AdminContext'

interface TimelineItemProps {
  experience: Experience
  index: number
  isVisible: boolean
  isEditMode: boolean
  onEdit: () => void
  onDelete: () => void
}

function TimelineItem({ experience, index, isVisible, isEditMode, onEdit, onDelete }: TimelineItemProps) {
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
          className={`glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group relative ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: `${index * 150 + 100}ms` }}
        >
          {/* Edit/Delete buttons */}
          {isEditMode && (
            <div className={`absolute top-2 ${index % 2 === 0 ? 'left-2' : 'right-2'} z-20 flex gap-1`}>
              <button
                onClick={onEdit}
                className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

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

interface ExperienceFormProps {
  experience?: Experience
  onSave: (experience: Omit<Experience, 'id'> & { id?: string }) => void
  onCancel: () => void
}

function ExperienceForm({ experience, onSave, onCancel }: ExperienceFormProps) {
  const [title, setTitle] = useState(experience?.title || '')
  const [company, setCompany] = useState(experience?.company || '')
  const [location, setLocation] = useState(experience?.location || '')
  const [period, setPeriod] = useState(experience?.period || '')
  const [description, setDescription] = useState(experience?.description.join('\n') || '')
  const [technologies, setTechnologies] = useState(experience?.technologies.join(', ') || '')

  const handleSubmit = () => {
    if (title.trim() && company.trim()) {
      onSave({
        id: experience?.id,
        title: title.trim(),
        company: company.trim(),
        location: location.trim(),
        period: period.trim(),
        description: description.split('\n').map(d => d.trim()).filter(Boolean),
        technologies: technologies.split(',').map(t => t.trim()).filter(Boolean),
      })
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onCancel} />
      <div className="relative w-full max-w-lg glass rounded-xl p-6 border border-primary/30 max-h-[90vh] overflow-y-auto">
        <h3 className="font-mono text-lg font-semibold text-primary mb-4">
          {experience ? 'Edit Experience' : 'Add New Experience'}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="Period (e.g., 2020 - Present)"
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (one achievement per line)"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
          />
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="Technologies (comma separated)"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:opacity-90 transition-all"
            >
              {experience ? 'Save Changes' : 'Add Experience'}
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-3 rounded-lg bg-muted text-muted-foreground font-mono text-sm hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const { data, addExperience, removeExperience, updateExperienceItem, isEditMode, showToast } = useAdmin()
  const experiences = data.experience

  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

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

  const handleSaveExperience = (experienceData: Omit<Experience, 'id'> & { id?: string }) => {
    if (experienceData.id) {
      updateExperienceItem(experienceData.id, experienceData)
      showToast('Experience updated!')
    } else {
      addExperience({ ...experienceData, id: Date.now().toString() })
      showToast('Experience added!')
    }
    setShowForm(false)
    setEditingExperience(null)
  }

  const handleDeleteExperience = (id: string) => {
    removeExperience(id)
    setDeleteConfirm(null)
    showToast('Experience deleted!')
  }

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

        {/* Add Experience Button */}
        {isEditMode && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/20 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/30 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Experience
            </button>
          </div>
        )}

        {/* Timeline */}
        <div className="relative space-y-12">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isVisible={isVisible}
              isEditMode={isEditMode}
              onEdit={() => {
                setEditingExperience(experience)
                setShowForm(true)
              }}
              onDelete={() => setDeleteConfirm(experience.id)}
            />
          ))}
        </div>
      </div>

      {/* Experience Form Modal */}
      {showForm && (
        <ExperienceForm
          experience={editingExperience || undefined}
          onSave={handleSaveExperience}
          onCancel={() => {
            setShowForm(false)
            setEditingExperience(null)
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm glass rounded-xl p-6 border border-destructive/30 text-center">
            <h3 className="font-mono text-lg font-semibold text-foreground mb-2">Delete Experience?</h3>
            <p className="text-muted-foreground text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteExperience(deleteConfirm)}
                className="flex-1 px-4 py-2 rounded-lg bg-destructive text-white font-mono text-sm hover:opacity-90 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg bg-muted text-muted-foreground font-mono text-sm hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
