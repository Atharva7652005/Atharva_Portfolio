'use client'

import { Save, LogOut, Pencil } from 'lucide-react'
import { useAdmin } from './AdminContext'

export function AdminToolbar() {
  const { isLoggedIn, hasUnsavedChanges, saveChanges, logout } = useAdmin()

  if (!isLoggedIn) return null

  return (
    <>
      {/* Edit Mode Banner */}
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-primary/10 border-b border-primary/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
          <Pencil className="w-4 h-4 text-primary animate-pulse" />
          <span className="font-mono text-sm text-primary">EDIT MODE ACTIVE</span>
          <Pencil className="w-4 h-4 text-primary animate-pulse" />
        </div>
      </div>

      {/* Control Buttons - Stacked at bottom right */}
      <div className="fixed bottom-[30px] right-[30px] z-[999] flex flex-col items-center gap-3">
        {/* Logout button (top) */}
        <button
          onClick={logout}
          className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm transition-all duration-300 hover:scale-110"
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
          }}
          title="Logout"
        >
          <LogOut className="w-5 h-5 text-red-400" />
        </button>

        {/* Save button (bottom, closer to admin button) */}
        <button
          onClick={saveChanges}
          disabled={!hasUnsavedChanges}
          className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm transition-all duration-300 ${
            hasUnsavedChanges ? 'hover:scale-110' : 'opacity-50 cursor-not-allowed'
          }`}
          style={{
            background: hasUnsavedChanges ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${hasUnsavedChanges ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
            boxShadow: hasUnsavedChanges ? '0 0 20px rgba(34, 197, 94, 0.3)' : 'none',
          }}
          title="Save Changes"
        >
          <Save className={`w-5 h-5 ${hasUnsavedChanges ? 'text-green-400' : 'text-muted-foreground'}`} />
        </button>
      </div>
    </>
  )
}
