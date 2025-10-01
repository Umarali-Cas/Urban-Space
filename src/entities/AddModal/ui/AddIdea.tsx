/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import classes from './AddModal.module.scss'
import {
  useCreateIdeaMutation,
  useUploadIdeaMediaMutation,
} from '@/widgets/LastIdeas/api/IdeasApi'
import { Uploaded } from './Uploaded'

export function AddIdea() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFiles, setPdfFiles] = useState<File[]>([])
  const [createIdea] = useCreateIdeaMutation()
const [uploadIdeaMedia] = useUploadIdeaMediaMutation()
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
  const description_md = (form[1] as HTMLTextAreaElement).value

  try {
    // 1. Создание идеи

    console.log('Отправка идеи:', {
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      description_md,
      category: 'general',
      tags: [],
      media: [],
      lat: 0,
      lon: 0,
      status: 'PENDING',
    })
    const newIdea = await createIdea({
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      description_md,
      category: 'general',
      tags: [],
      media: [],
      lat: 0,
      lon: 0,
      status: 'PENDING',
    }).unwrap()

    // 2. Загрузка медиа
    const allFiles = [...(coverFile ? [coverFile] : []), ...pdfFiles]
    if (allFiles.length > 0) {
      await uploadIdeaMedia({
        ideaId: newIdea.id,
        files: allFiles,
      }).unwrap()
    }

    setUploaded(true)
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
      <h2>Добавить идею</h2>

      <label>Заголовок идеи</label>
      <input type="text" placeholder="Введите заголовок идеи" required />

      <label>Описание идеи</label>
      <textarea placeholder="Опишите вашу идею" required />

      {/* Обложка */}
      <div className={classes.fileGroup}>
        {!coverPreview ? (
          <>
            <label htmlFor="coverUpload" className={classes.fileLabel}>
              Загрузить обложку
            </label>
            <input
              type="file"
              id="coverUpload"
              accept="image/*"
              onChange={handleCoverChange}
              className={classes.hiddenInput}
            />
          </>
        ) : (
          <div className={classes.coverPreviewBox}>
            <img src={coverPreview} alt="Обложка" className={classes.coverPreview} />
            <button type="button" onClick={handleRemoveCover} className={classes.removeButton}>
              Удалить
            </button>
          </div>
        )}
      </div>

      {/* PDF-файлы */}
      <div className={classes.fileGroup}>
        <label htmlFor="pdfUpload" className={classes.fileLabel}>
          Прикрепить PDF-файлы
        </label>
        <input
          type="file"
          id="pdfUpload"
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

      <button type="submit">Добавить идею</button>
    </form>
  )
}
