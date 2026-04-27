'use client'

import { Lock, Pencil } from 'lucide-react'
import { useAdmin } from './AdminContext'

export function AdminFloatingButton() {
  const { isLoggedIn, toggleLoginModal } = useAdmin()

  if (isLoggedIn) return null

  return (
    <button
      onClick={toggleLoginModal}
      className="fixed bottom-[30px] right-[30px] z-[999] w-14 h-14 rounded-full flex items-center justify-center text-primary transition-all duration-300 hover:scale-110 group"
      style={{
        background: 'rgba(0, 245, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '2px solid rgba(0, 245, 255, 0.5)',
        boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)',
      }}
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
