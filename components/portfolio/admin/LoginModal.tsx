'use client'

import { useState, FormEvent } from 'react'
import { X, Eye, EyeOff, AlertTriangle, LogIn } from 'lucide-react'
import { useAdmin } from './AdminContext'

export function LoginModal() {
  const { showLoginModal, toggleLoginModal, login } = useAdmin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!showLoginModal) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate a brief delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const success = login(username, password)
    if (!success) {
      setError('Invalid credentials')
    }
    
    setIsLoading(false)
  }

  const handleClose = () => {
    setUsername('')
    setPassword('')
    setError('')
    toggleLoginModal()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 glass rounded-2xl overflow-hidden border border-primary/30 animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-mono text-2xl font-bold text-foreground mb-2">
            <span className="text-primary neon-text">Admin</span> Access
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter your credentials to enable edit mode
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Username field */}
          <div>
            <label htmlFor="username" className="block font-mono text-sm text-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block font-mono text-sm text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg bg-muted border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full px-6 py-4 rounded-lg font-mono font-semibold text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed mt-6"
          >
            <span className="absolute inset-0 bg-primary" />
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-neon-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 animate-[glow-pulse_2s_infinite]" />
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}
