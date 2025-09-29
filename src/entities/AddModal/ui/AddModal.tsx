'use client'

import { useEffect, useRef } from 'react'
import classes from './AddModal.module.scss'
import { AddIdea } from './AddIdea'
import { AddArticle } from './AddArticle'

export function AddModal({
  isOpen,
  onClose,
  isArticle = false,
}: {
  isOpen: boolean
  onClose: () => void
  isArticle?: boolean
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className={classes.overlay}>
      <div className={classes.modal} ref={modalRef}>
        <button className={classes.closeButton} onClick={onClose}>
          &times;
        </button>
        {isArticle ? <AddArticle /> : <AddIdea />}
      </div>
    </div>
  )
}
