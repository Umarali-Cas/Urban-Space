'use client'

import { useState } from 'react'
import Image from 'next/image'
import classes from './AddModal.module.scss'
import {
  useCreateArticleMutation,
  useUploadAttachmentsMutation,
} from '@/widgets/Articles/api/articlesApi'
import { Uploaded } from './Uploaded'

export function AddArticle() {
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [otherFiles, setOtherFiles] = useState<File[]>([])
  const [uploaded, setUploaded] = useState<boolean | null>(null)

  const [createArticle] = useCreateArticleMutation()
  const [uploadAttachments] = useUploadAttachmentsMutation()

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    setImageFiles(prev => [...prev, ...newFiles])

    newFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = () =>
        setImagePreviews(prev => [...prev, reader.result as string])
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleOtherFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setOtherFiles(prev => [...prev, ...Array.from(files)])
  }

  const handleRemoveOtherFile = (index: number) => {
    setOtherFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const title = (form[0] as HTMLInputElement).value
    const summary = (form[1] as HTMLTextAreaElement).value
    const body_md = (form[2] as HTMLTextAreaElement).value

    try {
      const newArticle = await createArticle({
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        title,
        summary,
        body_md,
        category: 'general',
        tags: [],
        attachments: [],
        cover_key: ''
      }).unwrap()

      if (imageFiles.length || otherFiles.length) {
        await uploadAttachments({
          articleId: newArticle.id,
          files: [...imageFiles, ...otherFiles],
        }).unwrap()
      }

      setUploaded(true)
    } catch (err) {
      console.error('Ошибка при публикации:', err)
      setUploaded(false)
    }
  }

  if (uploaded !== null) {
    setTimeout(() => setUploaded(null), 3000)
    return <Uploaded isUploaded={uploaded} />
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h2>Добавить статью</h2>

      <label>Заголовок статьи</label>
      <input type="text" placeholder="Введите заголовок статьи" required />

      <label>Краткое описание</label>
      <textarea placeholder="Введите краткое описание" required />

      {/* Фотографии */}
      <div className={classes.fileGroup}>
        <label htmlFor="imagesUploadArticle" className={classes.fileLabel}>
          Добавить фотографии
        </label>
        <input
          type="file"
          id="imagesUploadArticle"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          className={classes.hiddenInput}
        />
        {imagePreviews.length > 0 && (
          <div className={classes.imagesGrid}>
            {imagePreviews.map((src, idx) => (
              <div key={idx} className={classes.imageCard}>
                <Image src={src} alt={`Фото ${idx + 1}`} width={150} height={150} className={classes.coverPreview} />
                <button type="button" className={classes.removeButton} onClick={() => handleRemoveImage(idx)}>
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Другие файлы */}
      <div className={classes.fileGroup}>
        <label htmlFor="filesUploadArticle" className={classes.fileLabel}>
          Прикрепить файлы
        </label>
        <input
          type="file"
          id="filesUploadArticle"
          multiple
          onChange={handleOtherFilesChange}
          className={classes.hiddenInput}
        />
        {otherFiles.length > 0 && (
          <ul className={classes.fileList}>
            {otherFiles.map((file, idx) => (
              <li key={file.name}>
                <span className={classes.fileNameSpan}>{file.name}</span>
                <button type="button" onClick={() => handleRemoveOtherFile(idx)}>Удалить</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit">Опубликовать статью</button>
    </form>
  )
}
