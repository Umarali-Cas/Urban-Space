import React, { useEffect } from 'react'
import cls from './Modal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={cls.modalOverlay}>
      <div className={cls.modalContent}>
        <h3 className={cls.modalTitle}>Ошибка</h3>
        <p className={cls.modalMessage}>{message}</p>
        <button onClick={onClose} className={cls.modalButton}>
          Закрыть
        </button>
      </div>
    </div>
  )
}
