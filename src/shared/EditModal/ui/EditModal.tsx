'use client'
import React, { useState, useEffect } from 'react'
import cls from './EditModal.module.scss'
import { Input } from '@/shared/Input'
import { Button } from '@/shared/Button'

interface Article {
  id: string
  title: string
  summary: string
  tags: string[]
  status: 'DRAFT' | 'APPROVED' | 'DENIED'
  is_featured: boolean
}

interface EditModalProps {
  isOpen: boolean
  article: Article | null
  onSave: (updatedArticle: Article) => void
  onClose: () => void
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  article,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    tags: '',
  })

  useEffect(() => {
    if (article && isOpen) {
      setFormData({
        title: article.title || '',
        summary: article.summary || '',
        tags: article.tags.join(', ') || '',
      })
    }
  }, [article, isOpen])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (article) {
      const updatedArticle: Article = {
        ...article,
        title: formData.title,
        summary: formData.summary,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
      }
      onSave(updatedArticle)
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen || !article) return null

  return (
    <div className={cls.modalOverlay} onKeyDown={handleKeyDown}>
      <div className={cls.modalContent}>
        <h2 className={cls.modalTitle}>Редактировать статью</h2>
        <div className={cls.form}>
          <Input
            text="Тема статьи"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={cls.input}
          />
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Краткое описание статьи"
            className={cls.textarea}
          />
          <Input
            text="Теги (через запятую)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className={cls.input}
          />
        </div>
        <div className={cls.actions}>
          <Button
            text="Сохранить"
            onClick={handleSave}
            className={cls.saveBtn}
          />
          <Button text="Отмена" onClick={onClose} className={cls.cancelBtn} />
        </div>
      </div>
    </div>
  )
}
