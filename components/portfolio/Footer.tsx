'use client'

import { Heart, Terminal } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <Terminal className="w-5 h-5 text-primary transition-all group-hover:text-neon-secondary" />
            <span className="font-mono text-sm text-foreground">
              <span className="text-primary">&lt;</span>
              [DEV]
              <span className="text-primary">/&gt;</span>
            </span>
          </a>

          {/* Copyright */}
          <p className="font-mono text-sm text-muted-foreground flex items-center gap-1">
            <span className="text-primary">&copy;</span> {currentYear} [YOUR NAME]. Built with
            <Heart className="w-4 h-4 text-red-500 inline mx-1 animate-pulse" />
            and lots of
            <span className="text-primary ml-1">{'<code />'}</span>
          </p>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  )
}
