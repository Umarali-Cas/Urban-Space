/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import classes from './AddModal.module.scss'

export function AddArticle() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFiles, setPdfFiles] = useState<File[]>([])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Статья отправлена!')
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
            <img src={coverPreview} alt="Обложка" className={classes.coverPreview} />
            <button type="button" onClick={handleRemoveCover} className={classes.removeButton}>
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
