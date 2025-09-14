// @/shared/Input.tsx
import React from 'react'
import cls from './Input.module.scss'

interface InputProps {
  text: string
  type?: string
  className?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
}

export const Input = ({
  text,
  type = 'text',
  className = '',
  value,
  onChange,
  name,
}: InputProps) => {
  return (
    <input
      type={type}
      className={`${cls.customInput} ${className}`}
      placeholder={text}
      value={value}
      onChange={onChange}
      name={name}
    />
  )
}
