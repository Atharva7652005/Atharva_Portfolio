'use client'

import { Save, LogOut, Pencil } from 'lucide-react'
import { useAdmin } from './AdminContext'

export function AdminToolbar() {
  const { isLoggedIn, hasUnsavedChanges, saveChanges, logout } = useAdmin()

  if (!isLoggedIn) return null

  return (
    <>
      {/* Edit Mode Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-primary/10 border-b border-primary/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
          <Pencil className="w-4 h-4 text-primary animate-pulse" />
          <span className="font-mono text-sm text-primary">EDIT MODE ACTIVE</span>
          <Pencil className="w-4 h-4 text-primary animate-pulse" />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="fixed top-14 right-4 z-[60] flex items-center gap-3">
        {/* Save button */}
        <button
          onClick={saveChanges}
          disabled={!hasUnsavedChanges}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
            hasUnsavedChanges
              ? 'bg-green-500/20 border border-green-500/50 text-green-400 hover:bg-green-500/30 hover:scale-105'
              : 'bg-muted border border-border text-muted-foreground cursor-not-allowed opacity-50'
          }`}
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm bg-destructive/20 border border-destructive/50 text-destructive hover:bg-destructive/30 hover:scale-105 transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </>
  )
}
