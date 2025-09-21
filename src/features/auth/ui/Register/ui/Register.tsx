/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/shared/Button'
import { Input } from '@/shared/Input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import cls from './Register.module.scss'
import userIcon from '@/features/auth/assets/user-icon.svg'
import eyesIcon from '@/features/auth/assets/eye-icon.svg'
import closedEyesIcon from '@/features/auth/assets/closed-eye-icon.svg'
import { useRegisterMutation } from '@/features/auth/api/authApi'
import { useAppDispatch } from '@/shared/hooks/reduxHooks'
import { setCredentials } from '@/features/auth/lib/authSlice'
import { useRouter } from 'next/navigation'
import { Modal } from '@/shared/Modal'

export const RegisterW = ({title, form, remember, pass} : {title: string, form: any, remember: any | string, pass: any | string}) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation()

  const [showPassword, setShowPassword] = useState(false)
  const [showCheckPassword, setShowCheckPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  type FormDataType = {
    username: string
    region: string
    email: string
    phone_number: string
    password: string
    checkPassword: string
  }

  const [formData, setFormData] = useState<FormDataType>({
    username: '',
    region: '',
    email: '',
    phone_number: '',
    password: '',
    checkPassword: '',
  })

  const fields = [
    {
      name: 'username',
      label: form.name.label,
      placeholder: form.name.placeholder,
      type: 'text',
    },
    { name: 'region', label: form.region.label, type: 'select' },
    {
      name: 'email',
      label: form.mail.label,
      placeholder: form.mail.placeholder,
      type: 'email',
    },
    {
      name: 'phone_number',
      label: form.tel.label,
      placeholder: form.tel.placeholder,
      type: 'tel',
    },
  ]

  useEffect(() => {
    const saved = localStorage.getItem('authData')
    if (saved) {
      const parsed = JSON.parse(saved)
      setFormData(prev => ({
        ...prev,
        email: parsed.email || '',
        password: parsed.password || '',
      }))
      setRememberMe(true)
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    if (formData.password !== formData.checkPassword) {
      setError('Пароли не совпадают')
      setIsModalOpen(true)
      return
    }
    if (
      !formData.email ||
      !formData.password ||
      !formData.username ||
      !formData.region
    ) {
      setError('Заполните все обязательные поля')
      setIsModalOpen(true)
      return
    }
    if (formData.password.length < 8) {
      setError('Пароль должен содержать минимум 8 символов')
      setIsModalOpen(true)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Некорректный формат email')
      setIsModalOpen(true)
      return
    }

    try {
      setError(null)
      setIsModalOpen(false)

      const payload = {
        username: formData.username.trim(),
        region: formData.region || undefined,
        email: formData.email.trim(),
        phone_number: formData.phone_number || undefined,
        password: formData.password,
      }

      const result = await registerUser(payload).unwrap()
      dispatch(setCredentials({ user: result, token: ""})) //Исправил typeScript проблему но не уверен использует ли токен строку

      if (rememberMe) {
        localStorage.setItem(
          'authData',
          JSON.stringify({
            email: formData.email,
            password: formData.password,
          })
        )
      } else {
        localStorage.removeItem('authData')
      }

      router.push('/')
    } catch (err: any) {
      console.error('Ошибка регистрации:', err)

      if (err?.data?.detail) {
        setError(err.data.detail)
      } else if (err?.data?.message) {
        setError(err.data.message)
      } else {
        setError('Ошибка регистрации, попробуйте снова')
      }

      setIsModalOpen(true)
    }
  }

  return (
    <section className={cls.registerWidget}>
      <Image src={userIcon} alt="user-icon" width={32} height={32} />
      <h3>{title}</h3>

      {fields.map(field => (
        <div className={cls.formGroup} key={field.name}>
          <p>{field.label}</p>
          {field.type === 'select' ? (
            <select
              name={field.name}
              className={cls.selectInput}
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">{form.region.placeholder}</option>
              {form.region.regions.map((city : any)  => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          ) : (
            <Input
              text={field.placeholder || ''}
              type={field.type}
              className={cls.input}
              name={field.name}
              value={formData[field.name as keyof FormDataType] as string}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <div className={cls.formGroup}>
        <p>{pass.label}</p>
        <div className={cls.passwordContainer}>
          <Input
            text={pass.placeholder}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            text={
              showPassword ? (
                <Image src={closedEyesIcon} alt="eye" width={20} height={20} />
              ) : (
                <Image src={eyesIcon} alt="eye" width={20} height={20} />
              )
            }
            onClick={() => setShowPassword(!showPassword)}
            className={cls.eyeButton}
          />
        </div>

        <p>{form.returnPass.label}</p>
        <div className={cls.passwordContainer}>
          <Input
            text={form.returnPass.placeholder}
            type={showCheckPassword ? 'text' : 'password'}
            name="checkPassword"
            value={formData.checkPassword}
            onChange={handleChange}
          />
          <Button
            text={
              showCheckPassword ? (
                <Image src={closedEyesIcon} alt="eye" width={20} height={20} />
              ) : (
                <Image src={eyesIcon} alt="eye" width={20} height={20} />
              )
            }
            onClick={() => setShowCheckPassword(!showCheckPassword)}
            className={cls.eyeButton}
          />
        </div>

        <div className={cls.memoryGroup}>
          <input
            type="checkbox"
            className={cls.checkBox}
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          <p className={cls.rememberMe}>{remember}</p>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={error || 'Произошла ошибка'}
        />

        <Button
          text={
            isRegisterLoading ? 'Загрузка...' : form.title
          }
          className={cls.registerButton}
          onClick={handleSubmit}
          disabled={isRegisterLoading}
        />

        <Link href="/login">
          <Button text={form.haveAccount} className={cls.loginButton} />
        </Link>
      </div>
    </section>
  )
}
