/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import classes from './AddModal.module.scss'
import {
  useCreateArticleMutation,
  useUploadAttachmentsMutation,
  useUploadCoverMutation,
} from '@/widgets/Articles/api/articlesApi'
import { Uploaded } from './Uploaded'

export function AddArticle() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFiles, setPdfFiles] = useState<File[]>([])
  const [createArticle] = useCreateArticleMutation()
  const [uploadCover] = useUploadCoverMutation()
  const [uploadAttachments] = useUploadAttachmentsMutation()
  const [uploaded, setUploaded] = useState<boolean | null>(null)

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveCover = () => {
    setCoverFile(null)
    setCoverPreview(null)
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setPdfFiles(Array.from(files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const title = (form[0] as HTMLInputElement).value
    const summary = (form[1] as HTMLTextAreaElement).value
    const body_md = (form[2] as HTMLTextAreaElement).value

    try {
      let cover_key = ''
      if (coverFile) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await uploadCover(coverFile).unwrap()
        cover_key = result.cover_key
        console.log('Cover uploaded, key:', cover_key)
      }

      console.log('Отправка статьи:', {
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        title,
        summary,
        body_md,
        category: 'general',
        tags: [],
        cover_key,
        attachments: [],
      })

      console.log('cover_key:', cover_key)

      const newArticle = await createArticle({
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        title,
        summary,
        body_md,
        category: 'general',
        tags: [],
        cover_key: cover_key,
        attachments: [],
      }).unwrap()

      if (pdfFiles.length > 0) {
        await uploadAttachments({
          articleId: newArticle.id,
          files: pdfFiles,
        }).unwrap()
      }

    setUploaded(true) // ✅ успех
  } catch (error) {
    console.error('Ошибка при публикации:', error)
    setUploaded(false) // ❌ ошибка
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

      <label>Полный текст статьи</label>
      <textarea placeholder="Введите содержимое статьи" rows={6} required />

      {/* Обложка */}
      <div className={classes.fileGroup}>
        {!coverPreview ? (
          <>
            <label htmlFor="coverUploadArticle" className={classes.fileLabel}>
              Загрузить обложку
            </label>
            <input
              type="file"
              id="coverUploadArticle"
              accept="image/*"
              onChange={handleCoverChange}
              className={classes.hiddenInput}
            />
          </>
        ) : (
          <div className={classes.coverPreviewBox}>
            <img
              src={coverPreview}
              alt="Обложка"
              className={classes.coverPreview}
            />
            <button
              type="button"
              onClick={handleRemoveCover}
              className={classes.removeButton}
            >
              Удалить
            </button>
          </div>
        )}
      </div>

      {/* PDF-файлы */}
      <div className={classes.fileGroup}>
        <label htmlFor="pdfUploadArticle" className={classes.fileLabel}>
          Прикрепить PDF-файлы
        </label>
        <input
          type="file"
          id="pdfUploadArticle"
          accept="application/pdf"
          multiple
          onChange={handlePdfChange}
          className={classes.hiddenInput}
        />
        {pdfFiles.length > 0 && (
          <ul className={classes.fileList}>
            {pdfFiles.map(file => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit">Опубликовать статью</button>
    </form>
  )
}
