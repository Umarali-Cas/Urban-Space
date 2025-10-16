/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import classes from './AddModal.module.scss'
import {
  useCreateArticleMutation,
  useUploadAttachmentsMutation,
  useUpdateArticleMutation,
} from '@/widgets/Articles/api/articlesApi'
import { Uploaded } from './Uploaded'
import { useAddAOrI } from '@/i18n/useNativeLocale'

export function AddArticle() {
  const locale = useAddAOrI()
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [otherFiles, setOtherFiles] = useState<File[]>([])
  const [uploaded, setUploaded] = useState<boolean | null>(null)

  const [createArticle] = useCreateArticleMutation()
  const [uploadAttachments] = useUploadAttachmentsMutation()
  const [updateArticle] = useUpdateArticleMutation()

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Контролируемые поля (без body_md)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')

  // Превью картинок: создаём и чистим URL
  useEffect(() => {
    const urls = imageFiles.map(f => URL.createObjectURL(f))
    imagePreviews.forEach(u => URL.revokeObjectURL(u))
    setImagePreviews(urls)

    return () => {
      urls.forEach(u => URL.revokeObjectURL(u))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFiles])

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newFiles = Array.from(files)
    setImageFiles(prev => [...prev, ...newFiles])
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
  if (isSubmitting) return
  setIsSubmitting(true)

  try {
    const titleTrim = title.trim()
    const summaryTrim = summary.trim()

    if (!titleTrim) {
      console.error('Title is required')
      setUploaded(false)
      setIsSubmitting(false)
      return
    }

    // 1) Создаём статью
    const newArticle = await createArticle({
      slug: titleTrim.toLowerCase().replace(/\s+/g, '-'),
      title: titleTrim,
      summary: summaryTrim || 'NO-SUMMARY',
    }).unwrap()


    // 2) Загружаем attachments
    const allFiles: File[] = [...imageFiles, ...otherFiles]
    let uploadedAttachments: any[] = []

    if (allFiles.length > 0) {
      uploadedAttachments = await uploadAttachments({
        articleId: newArticle.id,
        files: allFiles,
      }).unwrap()
    }

    // 3) Обновляем статью attachments если требуется
    if (uploadedAttachments.length > 0) {
      const attachmentsObjects = uploadedAttachments.map((f: any) => ({
        file_key: f.file_key ?? f.key ?? f.fileKey,
        mime: f.mime ?? f.content_type,
        size_bytes: f.size_bytes ?? f.size,
        meta: f.meta ?? {},
      }))

      await updateArticle({
        articleId: newArticle.id,
        data: { attachments: attachmentsObjects } as any,
      }).unwrap()
    }

    // ✅ 4) Очистка полей после успешной публикации
    setTitle('')
    setSummary('')
    setImageFiles([])
    setImagePreviews([])
    setOtherFiles([])

    setUploaded(true)
  } catch (err: any) {
    console.error('Ошибка при публикации:', err)
    setUploaded(false)
  } finally {
    setIsSubmitting(false)
  }
}


  if (uploaded !== null) {
    setTimeout(() => setUploaded(null), 3000)
    return <Uploaded isUploaded={uploaded} />
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h2>{locale.article.title}</h2>

      <label>{locale.article.zagolovok.title}</label>
      <input
        name="title"
        type="text"
        placeholder={locale.article.zagolovok.placeholder}
        required
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label>{locale.article.desc.title}</label>
      <textarea
        name="summary"
        placeholder={locale.article.desc.placeholder}
        value={summary}
        onChange={e => setSummary(e.target.value)}
      />

      {/* Фотографии */}
      <div className={classes.fileGroup}>
        <label htmlFor="imagesUploadArticle" className={classes.fileLabel}>
          {locale.article.images}
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
                <Image
                  src={src}
                  alt={`Фото ${idx + 1}`}
                  width={150}
                  height={150}
                  className={classes.coverPreview}
                />
                <button
                  type="button"
                  className={classes.removeButton}
                  onClick={() => handleRemoveImage(idx)}
                >
                  {locale.delete}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Другие файлы */}
      <div className={classes.fileGroup}>
        <label htmlFor="filesUploadArticle" className={classes.fileLabel}>
          {locale.article.files}
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
                <button type="button" onClick={() => handleRemoveOtherFile(idx)}>
                  {locale.delete}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? locale.article.upload : locale.article.files}
      </button>
    </form>
  )
}
