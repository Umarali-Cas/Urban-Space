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
import {
  useRegisterMutation,
  useUploadAvatarMutation,
} from '@/features/auth/api/authApi'
import { useAppDispatch } from '@/shared/hooks/reduxHooks'
import { setCredentials } from '@/features/auth/lib/authSlice'
import { useRouter } from 'next/navigation'
import { Modal } from '@/shared/Modal'

export const RegisterW = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation()
  const [uploadAvatar, { isLoading: isAvatarLoading }] =
    useUploadAvatarMutation()

  const [showPassword, setShowPassword] = useState(false)
  const [showCheckPassword, setShowCheckPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // Добавляем для модалки

  const [formData, setFormData] = useState({
    username: '',
    region: '',
    email: '',
    phone_number: '',
    avatar: null as File | null,
    password: '',
    checkPassword: '',
  })

  const fields = [
    {
      name: 'username',
      label: 'Имя пользователя',
      placeholder: 'Введите ваше имя',
      type: 'text',
    },
    { name: 'region', label: 'Регион', type: 'select' },
    {
      name: 'email',
      label: 'Почта',
      placeholder: 'Введите вашу почту',
      type: 'email',
    },
    {
      name: 'phone_number',
      label: 'Номер телефона',
      placeholder: '+996(xxx)______',
      type: 'tel',
    },
    { name: 'avatar', label: 'Фото профиля', type: 'file' },
  ]

  const kyrgyzCities = [
    'Бишкек',
    'Ош',
    'Джалал-Абад',
    'Каракол',
    'Токмок',
    'Нарын',
    'Баткен',
    'Талас',
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
    const { name, value, files } = e.target as any
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
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
        username: formData.username,
        region: formData.region,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
      }
      const result = await registerUser(payload).unwrap()
      dispatch(setCredentials(result))

      if (formData.avatar) {
        const formDataAvatar = new FormData()
        formDataAvatar.append('file', formData.avatar)
        await uploadAvatar(formDataAvatar).unwrap()
      }

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
      setError(err?.data?.message || 'Ошибка регистрации')
      setIsModalOpen(true)
    }
  }

  return (
    <section className={cls.registerWidget}>
      <Image src={userIcon} alt="user-icon" width={32} height={32} />
      <h3>Регистрация</h3>

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
              <option value="">Выберите регион</option>
              {kyrgyzCities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          ) : field.type === 'file' ? (
            <label className={cls.fileInput}>
              <Image src={userIcon} alt="upload" width={20} height={20} />
              <span>
                {formData.avatar ? formData.avatar.name : 'Прикрепите фото'}
              </span>
              <input
                type="file"
                name={field.name}
                accept="image/jpeg,image/png,image/webp"
                onChange={handleChange}
                hidden
              />
            </label>
          ) : (
            <Input
              text={field.placeholder || ''}
              type={field.type}
              className={cls.input}
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <div className={cls.formGroup}>
        <p>Пароль</p>
        <div className={cls.passwordContainer}>
          <Input
            text="Пароль"
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

        <p>Подтвердите пароль</p>
        <div className={cls.passwordContainer}>
          <Input
            text="Пароль"
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
          <p className={cls.rememberMe}>Запомнить меня</p>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={error || 'Произошла ошибка'}
        />

        <Button
          text={
            isRegisterLoading || isAvatarLoading ? 'Загрузка...' : 'Регистрация'
          }
          className={cls.registerButton}
          onClick={handleSubmit}
          disabled={isRegisterLoading || isAvatarLoading}
        />

        <Link href="/login">
          <Button text="У меня уже есть аккаунт" className={cls.loginButton} />
        </Link>
      </div>
    </section>
  )
}
