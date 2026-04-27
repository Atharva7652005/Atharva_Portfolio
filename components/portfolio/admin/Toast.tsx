'use client'

import { CheckCircle } from 'lucide-react'
import { useAdmin } from './AdminContext'

export function Toast() {
  const { toastMessage } = useAdmin()

  if (!toastMessage) return null

  return (
    <div className="fixed bottom-24 right-8 z-[100] animate-in slide-in-from-right-5 fade-in duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg glass border border-green-500/30 bg-green-500/10 text-green-400">
        <CheckCircle className="w-5 h-5" />
        <span className="font-mono text-sm">{toastMessage}</span>
      </div>
    </div>
  )
}
