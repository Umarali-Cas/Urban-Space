/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import classes from './SupportUs.module.scss'
import qr from '../assets/image-224x224.jpg'
import { FormEvent, useState } from 'react'
import { IdeaCard } from '@/entities/IdeaCard'
import { LastIdeas } from '@/widgets/LastIdeas'

export function SupportUs() {
  const [selectedIdea, setSelectedIdea] = useState<any | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    if (!selectedIdea) {
      alert('Пожалуйста, выберите проект для поддержки!')
      return
    }

    const fullname = formData.get('fullname')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const phone = formData.get('phone')?.toString().trim()

    if (!fullname || !email || !phone) {
      alert('Пожалуйста, заполните все обязательные поля!')
      return
    }

    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = String(value)
    })

    data['selectedIdeaId'] = selectedIdea.id
    data['selectedIdeaTitle'] = selectedIdea.title

    console.log('Отправленные данные:', data)
  }

  return (
    <div className={classes.support}>
      {/* Выбор проекта через LastIdeas */}
      <LastIdeas
        title="Оказать финансовую поддержку"
        subtitle="Вы можете оставить свое предложение или помочь развитию нашей инициативы"
        viewCards={3}
        selected={setSelectedIdea} // передаём выбранную идею наверх
        showSelectButton={true}
      />

      {/* Отображение выбранного проекта */}
      <div className={classes.support__bottom}>
        <div className={classes.support__bottom__select}>
          <h2 className={classes.support__bottom__select__title}>
            Выбранный проект
          </h2>
          {selectedIdea ? (
            <IdeaCard
              slug={selectedIdea.slug || ''}
              uniqueId={selectedIdea.id}
              date={selectedIdea.created_at || ''}
              likes={selectedIdea.likes_count || 0}
              link={selectedIdea.link || ''}
              subtitle={selectedIdea.description_md || ''}
              title={selectedIdea.title || ''}
              userName={selectedIdea.author_name}
              avatarUrl={selectedIdea.author_avatar}
              imageUrl={selectedIdea.media?.[0]?.meta?.url}
            />
          ) : (
            <p style={{ color: 'gray' }}>Ничего не выбрано</p>
          )}
        </div>

        {/* Форма поддержки */}
        <form className={classes.supportUs} onSubmit={handleSubmit}>
          <label>
            ФИО
            <input
              className={classes.supportUs__input}
              type="text"
              name="fullname"
              placeholder="Введите ваше ФИО"
              required
            />
          </label>

          <label>
            Email
            <input
              className={classes.supportUs__input}
              type="email"
              name="email"
              placeholder="Введите вашу почту"
              required
            />
          </label>

          <label>
            Номер телефона
            <input
              className={classes.supportUs__input}
              type="tel"
              name="phone"
              placeholder="+996(xxx)_____"
              required
            />
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
      </div>
    </div>
  )
}
