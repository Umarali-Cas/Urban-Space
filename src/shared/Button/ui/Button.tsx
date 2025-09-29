/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonHTMLAttributes } from 'react'
import classes from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string | React.ReactNode | any
  className?: string
}

export function Button({ text, className = '', ...props }: ButtonProps) {
  return (
    <button className={`${classes.btn} ${className}`} {...props}>
      {text}
    </button>
  )
}
