'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, Folder, Plus, X, Pencil, GripVertical } from 'lucide-react'
import { useAdmin, Project } from './admin/AdminContext'

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

interface ProjectCardProps {
  project: Project
  index: number
  isVisible: boolean
  isEditMode: boolean
  onEdit: () => void
  onDelete: () => void
}

function ProjectCard({ project, index, isVisible, isEditMode, onEdit, onDelete }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isEditMode) return
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
      className={`glass rounded-xl overflow-hidden transition-all duration-500 hover:border-primary/30 relative z-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${project.featured ? 'ring-1 ring-primary/20' : ''}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transition: 'transform 0.15s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Edit/Delete buttons - always on top with dark background pill */}
      {isEditMode && (
        <div 
          className="absolute top-3 right-3 z-50 flex gap-2 px-2 py-1 rounded-full pointer-events-auto"
          style={{ background: 'rgba(0,0,0,0.7)' }}
        >
          <button
            onClick={onEdit}
            className="p-2 rounded-lg bg-primary/30 text-primary hover:bg-primary/50 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg bg-destructive/30 text-destructive hover:bg-destructive/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
        {/* Project icon - lower z-index so it never covers action buttons */}
        <div className="w-12 h-12 rounded-lg glass flex items-center justify-center mb-4 text-primary relative z-[1]">
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
              className={`px-2 py-1 rounded-full text-xs font-mono border ${techColors[tech] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
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

interface ProjectFormProps {
  project?: Project
  onSave: (project: Omit<Project, 'id'> & { id?: string }) => void
  onCancel: () => void
}

function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '')
  const [description, setDescription] = useState(project?.description || '')
  const [techStack, setTechStack] = useState(project?.techStack.join(', ') || '')
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl || '')
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '')
  const [featured, setFeatured] = useState(project?.featured || false)

  const handleSubmit = () => {
    if (title.trim()) {
      onSave({
        id: project?.id,
        title: title.trim(),
        description: description.trim(),
        techStack: techStack.split(',').map(t => t.trim()).filter(Boolean),
        liveUrl: liveUrl.trim(),
        githubUrl: githubUrl.trim(),
        featured,
      })
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onCancel} />
      <div className="relative w-full max-w-lg glass rounded-xl p-6 border border-primary/30">
        <h3 className="font-mono text-lg font-semibold text-primary mb-4">
          {project ? 'Edit Project' : 'Add New Project'}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
          />
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Tech Stack (comma separated)"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="Live Demo URL"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="GitHub URL"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:opacity-90 transition-all"
            >
              {project ? 'Save Changes' : 'Add Project'}
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

export function ProjectsSection() {
  const { data, addProject, removeProject, updateProject, isEditMode, showToast } = useAdmin()
  const projects = data.projects

  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
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

  const handleSaveProject = (projectData: Omit<Project, 'id'> & { id?: string }) => {
    if (projectData.id) {
      updateProject(projectData.id, projectData)
      showToast('Project updated!')
    } else {
      addProject({ ...projectData, id: Date.now().toString() })
      showToast('Project added!')
    }
    setShowForm(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (id: string) => {
    removeProject(id)
    setDeleteConfirm(null)
    showToast('Project deleted!')
  }

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
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

        {/* Add Project Button */}
        {isEditMode && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/20 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/30 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Project
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
              isEditMode={isEditMode}
              onEdit={() => {
                setEditingProject(project)
                setShowForm(true)
              }}
              onDelete={() => setDeleteConfirm(project.id)}
            />
          ))}
        </div>

        {/* View More Button */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <a
            href="https://github.com/Atharva7652005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/50 text-primary font-mono text-sm hover:bg-primary/10 transition-all hover:scale-105"
          >
            <Github className="w-4 h-4" />
            View More on GitHub
          </a>
        </div>
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject || undefined}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowForm(false)
            setEditingProject(null)
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm glass rounded-xl p-6 border border-destructive/30 text-center">
            <h3 className="font-mono text-lg font-semibold text-foreground mb-2">Delete Project?</h3>
            <p className="text-muted-foreground text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteProject(deleteConfirm)}
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
