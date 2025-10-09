/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import classes from './IdeaForm.module.scss'
import profilePic from '../assets/user-icon.svg'
import { useSelectFile } from '@/i18n/useNativeLocale'
import { useCreateCrowdsourceMutation } from '../api/CrowdsourceApi'

export function IdeaForm({ formData }: { formData: any }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [createCrowdsource] = useCreateCrowdsourceMutation()
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

    const formDataObj = new FormData()
    formDataObj.append('theme', fd.get('theme') as string)
    formDataObj.append('description', fd.get('description') as string)

    if (file) {
      formDataObj.append('file', file)
    }

    try {
      const plainFormData = Object.fromEntries(formDataObj.entries()) as any
      const res = await createCrowdsource(plainFormData).unwrap()
      console.log('✅ Создано:', res)

      form.reset()
      setFile(null)
      setPreview(null)
    } catch (err) {
      console.error('❌ Ошибка при отправке:', err)
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
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
      </label>

      <button type="submit">{formData.button.title}</button>
    </form>
  )
}
