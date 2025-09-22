/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import classes from './SupportUs.module.scss'
import qr from '../assets/image-224x224.jpg'
import { FormEvent, useState } from 'react'
import { IdeaCard } from '@/entities/IdeaCard'
import { LastIdeas } from '@/widgets/LastIdeas'
import { useCrowdfundingData } from '@/i18n/useNativeLocale'

export function SupportUs({title, desc, formData} : {title: string, desc: string, formData: any}) {
  const [selectedIdea, setSelectedIdea] = useState<any | null>(null)
  const crowdfunding = useCrowdfundingData()

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
  }

  return (
    <div className={classes.support}>
      {/* Выбор проекта через LastIdeas */}
      <LastIdeas
        title={title}
        subtitle={desc}
        viewCards={3}
        selected={setSelectedIdea} // передаём выбранную идею наверх
        showSelectButton={true}
      />

      {/* Отображение выбранного проекта */}
      <div className={classes.support__bottom}>
        <div className={classes.support__bottom__select}>
          <h2 className={classes.support__bottom__select__title}>
            {crowdfunding.selected}
          </h2>
          {selectedIdea ? (
            <IdeaCard
              status=''
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
            <p style={{ color: 'gray' }}>{crowdfunding.unselected}</p>
          )}
        </div>

        {/* Форма поддержки */}
        <form className={classes.supportUs} onSubmit={handleSubmit}>
          <label>
            {formData.name.label}
            <input
              className={classes.supportUs__input}
              type="text"
              name="fullname"
              placeholder={formData.name.placeholder}
              required
            />
          </label>

          <label>
            {formData.mail.label}
            <input
              className={classes.supportUs__input}
              type="email"
              name="email"
              placeholder={formData.mail.placeholder}
              required
            />
          </label>

          <label>
            {formData.tel.label}
            <input
              className={classes.supportUs__input}
              type="tel"
              name="phone"
              placeholder={formData.tel.placeholder}
              required
            />
          </label>

          <label>
            {formData.qr.label}
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

          <button type="submit">{formData.button.title}</button>
        </form>
      </div>
    </div>
  )
}
