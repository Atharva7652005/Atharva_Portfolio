'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Data types
export interface HeroData {
  name: string
  roles: string[]
  subtitle: string
  ctaText: string
  socialLinks: { platform: string; url: string }[]
  codeSnippet: string[]
}

export interface TerminalLine {
  prefix: string
  command?: string
  text?: string
  color?: string
}

export interface AboutData {
  bio: string
  terminalLines: TerminalLine[]
  funFacts: { label: string; value: string }[]
  profileImage?: string
}

export interface Skill {
  name: string
  level: number
  icon: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  liveUrl: string
  githubUrl: string
  featured?: boolean
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies: string[]
}

export interface ContactData {
  heading: string
  subtext: string
  location: string
  email: string
  socialLinks: { platform: string; url: string; color: string }[]
}

export interface PortfolioData {
  hero: HeroData
  about: AboutData
  skills: SkillCategory[]
  projects: Project[]
  experience: Experience[]
  contact: ContactData
}

// Default data
const defaultData: PortfolioData = {
  hero: {
    name: 'ATHARVA KHAIRNAR',
    roles: ['Full Stack Developer', 'Open Source Enthusiast', 'UI/UX Designer', 'Problem Solver'],
    subtitle: 'Crafting digital experiences with clean code and creative solutions. Passionate about building products that make a difference.',
    ctaText: 'View My Work',
    socialLinks: [
      { platform: 'GitHub', url: '[GITHUB_URL]' },
      { platform: 'LinkedIn', url: '[LINKEDIN_URL]' },
      { platform: 'Twitter', url: '[TWITTER_URL]' },
    ],
    codeSnippet: [
      'const developer = {',
      '  name: "[YOUR NAME]",',
      '  skills: ["React", "Node.js", "TypeScript"],',
      '  passion: "Building amazing web apps",',
      '  coffee: Infinity,',
      '};',
      '',
      'while (developer.coffee > 0) {',
      '  code();',
      '  create();',
      '  innovate();',
      '}',
    ],
  },
  about: {
    bio: "[YOUR BIO - Write 2-3 sentences about yourself. What drives you? What's your background? What makes you unique as a developer? Share your passion for technology and your journey in the tech world.]",
    terminalLines: [
      { prefix: '~', command: 'whoami' },
      { prefix: '>', text: '[YOUR NAME]' },
      { prefix: '~', command: 'cat location.txt' },
      { prefix: '>', text: '[YOUR CITY], [YOUR COUNTRY]' },
      { prefix: '~', command: 'echo $EXPERIENCE' },
      { prefix: '>', text: '[X] years in tech' },
      { prefix: '~', command: 'cat status.txt' },
      { prefix: '>', text: 'Open to opportunities', color: 'text-green-400' },
    ],
    funFacts: [
      { label: 'Cups of coffee', value: '999+' },
      { label: 'Lines of code', value: '100K+' },
      { label: 'Open source PRs', value: '50+' },
    ],
    profileImage: '',
  },
  skills: [
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
  ],
  projects: [
    {
      id: '1',
      title: '[PROJECT NAME 1]',
      description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      liveUrl: '[LIVE_URL]',
      githubUrl: '[GITHUB_URL]',
      featured: true,
    },
    {
      id: '2',
      title: '[PROJECT NAME 2]',
      description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
      techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      liveUrl: '[LIVE_URL]',
      githubUrl: '[GITHUB_URL]',
      featured: true,
    },
    {
      id: '3',
      title: '[PROJECT NAME 3]',
      description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
      techStack: ['Python', 'FastAPI', 'Redis', 'Docker'],
      liveUrl: '[LIVE_URL]',
      githubUrl: '[GITHUB_URL]',
    },
    {
      id: '4',
      title: '[PROJECT NAME 4]',
      description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
      techStack: ['React Native', 'Firebase', 'Expo'],
      liveUrl: '[LIVE_URL]',
      githubUrl: '[GITHUB_URL]',
    },
    {
      id: '5',
      title: '[PROJECT NAME 5]',
      description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
      techStack: ['Vue.js', 'Tailwind', 'Supabase'],
      liveUrl: '[LIVE_URL]',
      githubUrl: '[GITHUB_URL]',
    },
    {
      id: '6',
      title: '[PROJECT NAME 6]',
      description: '[Brief description of the project. What problem does it solve? What makes it unique? Keep it to 2-3 sentences.]',
      techStack: ['Go', 'gRPC', 'Kubernetes'],
      liveUrl: '[LIVE_URL]',
      githubUrl: '[GITHUB_URL]',
    },
  ],
  experience: [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
  ],
  contact: {
    heading: 'Get In Touch',
    subtext: 'Have a project in mind or just want to chat? Feel free to reach out!',
    location: '[YOUR CITY], [YOUR COUNTRY]',
    email: '[YOUR_EMAIL@EXAMPLE.COM]',
    socialLinks: [
      { platform: 'GitHub', url: '[GITHUB_URL]', color: 'hover:text-white' },
      { platform: 'LinkedIn', url: '[LINKEDIN_URL]', color: 'hover:text-blue-400' },
      { platform: 'Twitter', url: '[TWITTER_URL]', color: 'hover:text-cyan-400' },
      { platform: 'Email', url: 'mailto:[YOUR_EMAIL]', color: 'hover:text-primary' },
    ],
  },
}

interface AdminContextType {
  isLoggedIn: boolean
  isEditMode: boolean
  showLoginModal: boolean
  data: PortfolioData
  hasUnsavedChanges: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  toggleLoginModal: () => void
  updateHero: (hero: Partial<HeroData>) => void
  updateAbout: (about: Partial<AboutData>) => void
  updateSkills: (skills: SkillCategory[]) => void
  addSkill: (categoryIndex: number, skill: Skill) => void
  removeSkill: (categoryIndex: number, skillIndex: number) => void
  updateProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  removeProject: (projectId: string) => void
  updateProject: (projectId: string, updates: Partial<Project>) => void
  updateExperience: (experience: Experience[]) => void
  addExperience: (experience: Experience) => void
  removeExperience: (experienceId: string) => void
  updateExperienceItem: (experienceId: string, updates: Partial<Experience>) => void
  updateContact: (contact: Partial<ContactData>) => void
  saveChanges: () => void
  showToast: (message: string) => void
  toastMessage: string | null
}

const AdminContext = createContext<AdminContextType | null>(null)

const STORAGE_KEY = 'portfolio_data'
const AUTH_KEY = 'portfolio_auth'

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [data, setData] = useState<PortfolioData>(defaultData)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Load saved data and auth state on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        // Merge with defaults to ensure new fields exist
        setData({
          ...defaultData,
          ...parsed,
          hero: { ...defaultData.hero, ...parsed.hero },
          about: { ...defaultData.about, ...parsed.about },
        })
      } catch (e) {
        console.error('Failed to parse saved data:', e)
      }
    }

    const savedAuth = localStorage.getItem(AUTH_KEY)
    if (savedAuth === 'true') {
      setIsLoggedIn(true)
      setIsEditMode(true)
    }
  }, [])

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const login = (username: string, password: string): boolean => {
    if (username === 'Atharva' && password === 'Khairnar@2005') {
      setIsLoggedIn(true)
      setIsEditMode(true)
      setShowLoginModal(false)
      localStorage.setItem(AUTH_KEY, 'true')
      showToast('Welcome back, Admin!')
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    setIsEditMode(false)
    localStorage.removeItem(AUTH_KEY)
    showToast('Logged out successfully')
  }

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal)
  }

  const updateHero = (hero: Partial<HeroData>) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, ...hero } }))
    setHasUnsavedChanges(true)
  }

  const updateAbout = (about: Partial<AboutData>) => {
    setData((prev) => ({ ...prev, about: { ...prev.about, ...about } }))
    setHasUnsavedChanges(true)
  }

  const updateSkills = (skills: SkillCategory[]) => {
    setData((prev) => ({ ...prev, skills }))
    setHasUnsavedChanges(true)
  }

  const addSkill = (categoryIndex: number, skill: Skill) => {
    setData((prev) => {
      const newSkills = [...prev.skills]
      newSkills[categoryIndex] = {
        ...newSkills[categoryIndex],
        skills: [...newSkills[categoryIndex].skills, skill],
      }
      return { ...prev, skills: newSkills }
    })
    setHasUnsavedChanges(true)
  }

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    setData((prev) => {
      const newSkills = [...prev.skills]
      newSkills[categoryIndex] = {
        ...newSkills[categoryIndex],
        skills: newSkills[categoryIndex].skills.filter((_, i) => i !== skillIndex),
      }
      return { ...prev, skills: newSkills }
    })
    setHasUnsavedChanges(true)
  }

  const updateProjects = (projects: Project[]) => {
    setData((prev) => ({ ...prev, projects }))
    setHasUnsavedChanges(true)
  }

  const addProject = (project: Project) => {
    setData((prev) => ({ ...prev, projects: [...prev.projects, project] }))
    setHasUnsavedChanges(true)
  }

  const removeProject = (projectId: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId),
    }))
    setHasUnsavedChanges(true)
  }

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId ? { ...p, ...updates } : p
      ),
    }))
    setHasUnsavedChanges(true)
  }

  const updateExperience = (experience: Experience[]) => {
    setData((prev) => ({ ...prev, experience }))
    setHasUnsavedChanges(true)
  }

  const addExperience = (experience: Experience) => {
    setData((prev) => ({ ...prev, experience: [...prev.experience, experience] }))
    setHasUnsavedChanges(true)
  }

  const removeExperience = (experienceId: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== experienceId),
    }))
    setHasUnsavedChanges(true)
  }

  const updateExperienceItem = (experienceId: string, updates: Partial<Experience>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === experienceId ? { ...e, ...updates } : e
      ),
    }))
    setHasUnsavedChanges(true)
  }

  const updateContact = (contact: Partial<ContactData>) => {
    setData((prev) => ({ ...prev, contact: { ...prev.contact, ...contact } }))
    setHasUnsavedChanges(true)
  }

  const saveChanges = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setHasUnsavedChanges(false)
    showToast('Changes saved successfully!')
  }

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn,
        isEditMode,
        showLoginModal,
        data,
        hasUnsavedChanges,
        login,
        logout,
        toggleLoginModal,
        updateHero,
        updateAbout,
        updateSkills,
        addSkill,
        removeSkill,
        updateProjects,
        addProject,
        removeProject,
        updateProject,
        updateExperience,
        addExperience,
        removeExperience,
        updateExperienceItem,
        updateContact,
        saveChanges,
        showToast,
        toastMessage,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
