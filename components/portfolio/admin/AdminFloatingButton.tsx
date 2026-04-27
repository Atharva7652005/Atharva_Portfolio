'use client'

import { Lock, Pencil } from 'lucide-react'
import { useAdmin } from './AdminContext'

export function AdminFloatingButton() {
  const { isLoggedIn, toggleLoginModal } = useAdmin()

  return (
    <button
      onClick={toggleLoginModal}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full glass border-2 border-primary/50 flex items-center justify-center text-primary transition-all duration-300 hover:scale-110 hover:border-primary hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] animate-[glow-pulse_3s_infinite] group"
      aria-label={isLoggedIn ? 'Edit Mode Active' : 'Admin Login'}
    >
      {isLoggedIn ? (
        <Pencil className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      ) : (
        <Lock className="w-6 h-6 group-hover:scale-110 transition-transform" />
      )}
      
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
    </button>
  )
}
