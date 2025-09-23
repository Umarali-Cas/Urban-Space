'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import userIcon from '@/features/auth/assets/user-icon.svg'
import { Button } from '@/shared/Button'
import Link from 'next/link'
import cls from './Login.module.scss'
import { Input } from '@/shared/Input'
import eyesIcon from '@/features/auth/assets/eye-icon.svg'
import closedEyesIcon from '@/features/auth/assets/closed-eye-icon.svg'
import { useLoginMutation } from '@/features/auth/api/authApi'
import { useAppDispatch } from '@/shared/hooks/reduxHooks'
import { setCredentials } from '@/features/auth/lib/authSlice'
import { useRouter } from 'next/navigation'
import { Modal } from '@/shared/Modal'

interface InputProps {
  label: string
  placeholder: string
}

export const LoginW = ({
  title,
  mail,
  pass,
  loginBtn,
  regBtn,
  remember,
}: {
  title: string
  mail: InputProps
  pass: InputProps
  loginBtn: string
  regBtn: string
  remember: string
}) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [login, { isLoading }] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('authData')
    if (saved) {
      const parsed = JSON.parse(saved)
      setEmail(parsed.email || '')
      setPassword(parsed.password || '')
      setRememberMe(true)
    }
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Заполните все поля')
      setIsModalOpen(true)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Некорректный формат email')
      setIsModalOpen(true)
      return
    }

    try {
      setError(null)
      setIsModalOpen(false)

      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials(result))

      if (rememberMe) {
        localStorage.setItem('authData', JSON.stringify({ email, password }))
      } else {
        localStorage.removeItem('authData')
      }

      router.push('/')
    } catch (err: unknown) {
      let errorMessage = 'Ошибка авторизации'

      if (typeof err === 'object' && err !== null) {
        if (
          'data' in err &&
          typeof err.data === 'object' &&
          err.data !== null
        ) {
          const errorData = err.data as { detail?: string }
          errorMessage = errorData.detail || errorMessage
        } else if (
          'error' in err &&
          typeof err.error === 'object' &&
          err.error !== null
        ) {
          const errorObj = err.error as { data?: { detail?: string } }
          errorMessage = errorObj.data?.detail || errorMessage
        }
      }

      setError(errorMessage)
      setIsModalOpen(true)
    }
  }

  return (
    <section className={cls.loginWidget}>
      <Image src={userIcon} alt="user-icon" width={32} height={32} />
      <h3>{title}</h3>

      <div className={cls.formGroup}>
        <p>{mail.label}</p>
        <Input
          text={mail.placeholder}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
        />
      </div>

      <div className={cls.formGroup}>
        <p>{pass.label}</p>
        <div className={cls.passwordContainer}>
          <Input
            text={pass.placeholder}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
          />
          <Button
            text={
              showPassword ? (
                <Image src={closedEyesIcon} alt="eye" width={20} height={20} />
              ) : (
                <Image src={eyesIcon} alt="eye" width={20} height={20} />
              )
            }
            onClick={togglePasswordVisibility}
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
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={error || 'Произошла ошибка'}
      />

      <Button
        text={isLoading ? 'Загрузка...' : loginBtn}
        onClick={handleLogin}
        disabled={isLoading}
        className={cls.loginButton}
      />

      <Link href="/register" className={cls.registrationButtonLink}>
        <Button text={regBtn} className={cls.registerButton} />
      </Link>
    </section>
  )
}
