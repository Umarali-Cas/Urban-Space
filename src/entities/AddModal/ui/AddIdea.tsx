/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import classes from './AddModal.module.scss'
import {
  useCreateIdeaMutation,
  useUploadIdeaMediaMutation,
} from '@/widgets/LastIdeas/api/IdeasApi'
import { Uploaded } from './Uploaded'

export function AddIdea() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const [files, setFiles] = useState<File[]>([])

  const [createIdea] = useCreateIdeaMutation()
  const [uploadIdeaMedia] = useUploadIdeaMediaMutation()
  const [uploaded, setUploaded] = useState<boolean | null>(null)

  // Превью картинок
  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f))
    imagePreviews.forEach((u) => URL.revokeObjectURL(u))
    setImagePreviews(urls)

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  // Cover preview cleanup
  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview)
    }
  }, [coverPreview])

  // Cover
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (coverPreview) URL.revokeObjectURL(coverPreview)
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }
  const handleRemoveCover = () => {
    if (coverPreview) URL.revokeObjectURL(coverPreview)
    setCoverFile(null)
    setCoverPreview(null)
  }

  // Images
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setImages(prev => [...prev, ...Array.from(files)])
  }
  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  // Files
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files
    if (!filesList) return
    setFiles(prev => [...prev, ...Array.from(filesList)])
  }
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  // Submit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const title = (form[0] as HTMLInputElement).value
  const description_md = (form[1] as HTMLTextAreaElement).value

  try {
    // 1️⃣ Сначала создаём идею без медиа
    const ideaPayload = {
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      description_md,
      media: [],
      tags: [],
    }
    const newIdea = await createIdea(ideaPayload).unwrap()
    console.log("📤 Идея создана:", newIdea)

    // 2️⃣ Загружаем все файлы к реальному ideaId
    const allFiles: File[] = [
      ...(coverFile ? [coverFile] : []),
      ...images,
      ...files,
    ]

    let mediaObjects: any[] = []
    if (allFiles.length) {
      const uploadedFiles = await uploadIdeaMedia({
        ideaId: newIdea.id,
        files: allFiles
      }).unwrap()

      // Преобразуем файлы в нужный формат для media
      mediaObjects = uploadedFiles.map(f => ({
        file_key: f.file_key,
        mime: f.mime,
        size_bytes: f.size_bytes,
        meta: {},
      }))
      console.log("📤 Файлы для media:", mediaObjects)

      // 3️⃣ Если бэкенд требует media внутри идеи, обновляем её
      // Assuming you have a separate API endpoint for updating an existing idea
      // await updateIdea({
      //   id: newIdea.id,
      //   media: mediaObjects
      // }).unwrap()
    }

    setUploaded(true)
  } catch (err: any) {
    console.error('❌ Ошибка при публикации:', err)
    setUploaded(false)
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

      {/* Несколько фото */}
      <div className={classes.fileGroup}>
        <label htmlFor="imagesUpload" className={classes.fileLabel}>
          Добавить фотографии
        </label>
        <input
          type="file"
          id="imagesUpload"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          className={classes.hiddenInput}
        />

        {imagePreviews.length > 0 && (
          <div className={classes.imagesGrid}>
            {imagePreviews.map((src, idx) => (
              <div key={src} className={classes.imageCard}>
                <img src={src} alt={`Фото ${idx + 1}`} className={classes.imagePreview} />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className={classes.removeButton}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Файлы */}
      <div className={classes.fileGroup}>
        <label htmlFor="filesUpload" className={classes.fileLabel}>
          Прикрепить файлы
        </label>
        <input
          type="file"
          id="filesUpload"
          multiple
          onChange={handleFilesChange}
          className={classes.hiddenInput}
        />
        {files.length > 0 && (
          <ul className={classes.fileList}>
            {files.map((file, idx) => (
              <li key={file.name}>
                <span className={classes.fileNameSpan}>{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className={classes.removeButton}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit">Добавить идею</button>
    </form>
  )
}
