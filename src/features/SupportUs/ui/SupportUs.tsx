'use client'

import Image from 'next/image'
import classes from './SupportUs.module.scss'
import qr from '../assets/image-224x224.jpg'
import { FormEvent } from 'react'

export function SupportUs() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // собираем объект
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = String(value)
    })

    console.log('Отправленные данные:', data)
  }

  return (
    <form className={classes.supportUs} onSubmit={handleSubmit}>
      <label>
        ФИО
        <input className={classes.supportUs__input}  type="text" name="fullname" placeholder="Введите ваше ФИО" required />
      </label>

      <label>
        Email
        <input className={classes.supportUs__input} type="email" name="email" placeholder="Введите вашу почту" required />
      </label>

      <label>
        Номер телефона
        <input className={classes.supportUs__input} type="tel" name="phone" placeholder="+996(xxx)_____" required />
      </label>

      <label>
        QR-code для переводов
        <div className={classes.qrCode__box}>
          <Image
            className={classes.qrCode__box__image}
            src={qr}
            alt="QR-code для переводов"
            width={224}
            height={224}
          />
        </div>
      </label>

      <button type="submit">Отправить</button>
    </form>
  )
}
