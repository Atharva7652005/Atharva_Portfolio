'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { useAdmin } from './AdminContext'

interface EditableTextProps {
  value: string
  onChange: (value: string) => void
  className?: string
  tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'
  multiline?: boolean
  placeholder?: string
}

export function EditableText({
  value,
  onChange,
  className = '',
  tag: Tag = 'span',
  multiline = false,
  placeholder = 'Click to edit...',
}: EditableTextProps) {
  const { isEditMode } = useAdmin()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    onChange(editValue)
    setIsEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      setEditValue(value)
      setIsEditing(false)
    }
  }

  if (!isEditMode) {
    return <Tag className={className}>{value || placeholder}</Tag>
  }

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input'
    return (
      <InputComponent
        ref={inputRef as React.RefObject<HTMLInputElement & HTMLTextAreaElement>}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} bg-primary/10 border border-primary/50 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-primary/30 min-w-[100px] w-full`}
        rows={multiline ? 3 : undefined}
      />
    )
  }

  return (
    <Tag
      onClick={() => setIsEditing(true)}
      className={`${className} cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-primary/50 hover:outline-offset-2 transition-all rounded`}
      title="Click to edit"
    >
      {value || placeholder}
    </Tag>
  )
}
