/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import classes from './IdeaForm.module.scss'
import profilePic from '../assets/user-icon.svg'
import { useSelectFile } from '@/i18n/useNativeLocale'
import {
  useCreateCrowdsourceMutation,
  useUploadCrowdMediaMutation,
} from '../api/CrowdsourceApi'

export function IdeaForm({ formData }: { formData: any }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [createCrowdsource] = useCreateCrowdsourceMutation()
  const [uploadCrowdMedia] = useUploadCrowdMediaMutation()
  const fileNameLocale = useSelectFile()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const fd = new FormData(form)

    const theme = fd.get('theme') as string
    const description = fd.get('description') as string

    const payload = {
      theme,
      description,
      category: 'solved',
    }

    try {
      const created = await createCrowdsource(payload).unwrap()

      // если есть файл — загружаем отдельно
      if (file) {
        const mediaData = new FormData()
        mediaData.append('files', file)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await uploadCrowdMedia({
          crowd_id: created.id,
          body: mediaData, // ✅ передаём саму FormData
        }).unwrap()
      }

      form.reset()
      setFile(null)
      setPreview(null)
    } catch (err: any) {
      console.error(err)
    }
  }

  return (
    <form className={classes.ideaForm} onSubmit={handleSubmit}>
      <h2 className={classes.ideaForm__title}>{formData.title}</h2>

      <label>
        {formData.them.label}
        <input
          type="text"
          name="theme"
          maxLength={100}
          placeholder={formData.them.placeholder}
          required
        />
      </label>

      <label>
        {formData.description.label}
        <textarea
          name="description"
          placeholder={formData.description.placeholder}
          required
          rows={4}
        />
      </label>

      <label className={classes.ideaForm__fileInput}>
        {fileNameLocale}
        <div
          className={classes.ideaForm__fileInput__container}
          style={{
            backgroundImage: preview ? `url(${preview})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            height: preview ? '400px' : '88px',
          }}
        >
          {!preview && (
            <div className={classes.ideaForm__fileInput__image}>
              <Image
                src={profilePic}
                alt="profile picture"
                width={32}
                height={32}
              />
              <span>{fileNameLocale}</span>
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </label>

      <button type="submit">{formData.button.title}</button>
    </form>
  )
}
