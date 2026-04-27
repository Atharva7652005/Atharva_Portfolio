'use client'

import { useEffect, useRef, useState } from 'react'

export function NeonCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      // Inner dot snaps instantly
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`
        innerRef.current.style.top = `${e.clientY}px`
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement
      const isInteractive = target.closest('button, a, input, textarea, [role="button"], .editable, [contenteditable="true"]')
      setIsHovering(!!isInteractive)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      
      // Trigger ripple
      if (rippleRef.current) {
        rippleRef.current.style.left = `${mousePos.current.x}px`
        rippleRef.current.style.top = `${mousePos.current.y}px`
        rippleRef.current.classList.remove('animate-ripple')
        // Force reflow
        void rippleRef.current.offsetWidth
        rippleRef.current.classList.add('animate-ripple')
      }
      
      setTimeout(() => setIsClicking(false), 150)
    }

    // Lerp animation for outer ring (smooth trailing)
    let animationId: number
    const animate = () => {
      const lerp = 0.15
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * lerp
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * lerp

      if (outerRef.current) {
        outerRef.current.style.left = `${outerPos.current.x}px`
        outerRef.current.style.top = `${outerPos.current.y}px`
      }

      animationId = requestAnimationFrame(animate)
    }

    // Initialize position
    outerPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    animationId = requestAnimationFrame(animate)

    // Hide default cursor
    document.body.style.cursor = 'none'
    const style = document.createElement('style')
    style.id = 'neon-cursor-style'
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      cancelAnimationFrame(animationId)
      document.body.style.cursor = ''
      const existingStyle = document.getElementById('neon-cursor-style')
      if (existingStyle) existingStyle.remove()
    }
  }, [])

  return (
    <>
      {/* Outer ring - follows with lag */}
      <div
        ref={outerRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out ${
          isHovering ? 'w-12 h-12' : 'w-8 h-8'
        }`}
        style={{
          border: `2px solid ${isHovering ? 'var(--neon)' : 'var(--neon-secondary)'}`,
          borderRadius: '50%',
          boxShadow: isHovering 
            ? '0 0 15px rgba(0, 245, 255, 0.5), inset 0 0 15px rgba(0, 245, 255, 0.1)' 
            : '0 0 10px rgba(124, 58, 237, 0.4)',
          background: isHovering ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
        }}
      />

      {/* Inner dot - snaps instantly */}
      <div
        ref={innerRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isClicking ? 'scale-50' : 'scale-100'
        }`}
        style={{
          width: '6px',
          height: '6px',
          background: 'var(--neon)',
          boxShadow: '0 0 10px var(--neon), 0 0 20px var(--neon)',
        }}
      />

      {/* Ripple on click */}
      <div
        ref={rippleRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          width: '40px',
          height: '40px',
          border: '2px solid var(--neon)',
        }}
      />

      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.4s ease-out forwards;
        }
      `}</style>
    </>
  )
}
