/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import classes from './AddModal.module.scss'
import {
  useCreateIdeaMutation,
  useUpdateIdeaMutation,
  useUploadIdeaMediaMutation,
} from '@/widgets/LastIdeas/api/IdeasApi'
import { Uploaded } from './Uploaded'

export function AddIdea() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const [files, setFiles] = useState<File[]>([])

  const [createIdea] = useCreateIdeaMutation()
  const [uploadIdeaMedia] = useUploadIdeaMediaMutation()
  const [updateIdea] = useUpdateIdeaMutation()
  const [uploaded, setUploaded] = useState<boolean | null>(null)

  // контролируемое поле description для надёжности
  const [description, setDescription] = useState('')

  // Превью картинок
  useEffect(() => {
    const urls = images.map(f => URL.createObjectURL(f))
    imagePreviews.forEach(u => URL.revokeObjectURL(u))
    setImagePreviews(urls)

    return () => {
      urls.forEach(u => URL.revokeObjectURL(u))
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
    if (isSubmitting) return
    setIsSubmitting(true)
    setUploadProgress(null)

    try {
      const form = e.target as HTMLFormElement

      // Надёжное получение title: сначала FormData, затем form.elements
      const fd = new FormData(form)
      let titleVal = fd.get('title')
      if (titleVal === null || typeof titleVal !== 'string') {
        const el = form.elements.namedItem('title') as HTMLInputElement | null
        titleVal = el ? el.value : ''
      }
      const title = String(titleVal || '').trim()
      const description_md = String(
        description || (fd.get('description_md') as string) || ''
      ).trim()

      if (!title) {
        console.error('Title is required')
        setUploaded(false)
        setIsSubmitting(false)
        return
      }

      if (!description_md) {
        console.error('Description is required')
        setUploaded(false)
        setIsSubmitting(false)
        return
      }

      const ideaPayload = {
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        description_md,
        description: description_md,
        media: [],
        tags: [],
      }

      // 1) Создаём идею
      console.log('createIdea payload (stringified):', JSON.stringify(ideaPayload))
      const newIdea = await createIdea(ideaPayload).unwrap()
      console.log('Server returned description_md:', newIdea.description_md)

      // 2) Собираем все файлы
      const allFiles: File[] = [
        ...(coverFile ? [coverFile] : []),
        ...images,
        ...files,
      ]

      if (allFiles.length === 0) {
        setUploaded(true)
        return
      }

      // 3) Загружаем файлы одним запросом через RTK mutation
      const uploadedFiles = await uploadIdeaMedia({
        ideaId: newIdea.id,
        files: allFiles,
      }).unwrap()

      // 4) Преобразуем ответ в media объекты и обновляем идею
      const mediaObjects = uploadedFiles.map((f: any) => ({
        file_key: f.file_key ?? f.key ?? f.fileKey,
        mime: f.mime ?? f.content_type,
        size_bytes: f.size_bytes ?? f.size,
        meta: f.meta ?? {},
      }))

      await updateIdea({
        id: newIdea.id,
        data: {
          media: mediaObjects,
        },
      }).unwrap()

      setUploaded(true)
    } catch (err: any) {
      console.error('❌ Ошибка при публикации:', err)
      if (err?.status === 422 && err?.data) {
        console.error('Validation details:', err.data.detail ?? err.data)
      }
      setUploaded(false)
    } finally {
      setIsSubmitting(false)
      setUploadProgress(null)
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
      <input
        name="title"
        type="text"
        placeholder="Введите заголовок идеи"
        required
      />

      <label>Описание идеи</label>
      <textarea
        name="description_md"
        placeholder="Опишите вашу идею"
        required
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

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
                <img
                  src={src}
                  alt={`Фото ${idx + 1}`}
                  className={classes.imagePreview}
                />
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

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Добавить идею'}
      </button>
    </form>
  )
}
