'use client'

import { useGetProfileQuery } from '@/features/auth/api/authApi'
import classes from './AddArticleOrIdea.module.scss'
import Image from 'next/image'
import typewritter from '../assets/icons/typewritter.svg'
import yellowlight from '../assets/icons/yellowlight.svg'
import { AddModal } from '@/entities/AddModal/ui/AddModal'
import { useState } from 'react'

type Props = {
  isArticle: boolean
  show: boolean
}

export function AddArticleOrIdea({ isArticle, show }: Props) {
  const { data: user } = useGetProfileQuery()
  const [isOpen, setIsOpen] = useState(false)

  if (!show || !user) return null

  return (
    <div className={classes.addArticleOrIdea_wrapper}>
    <AddModal isOpen={isOpen} onClose={() => setIsOpen(false)} isArticle={isArticle}/>
      <div className={classes.addArticleOrIdea}>
        <Image
          className={isArticle ? classes.typewritter : classes.yellowlight}
          src={isArticle ? typewritter : yellowlight}
          alt="icon"
          width={100}
          height={100}
        />
        <div className={classes.addArticleOrIdea__content}>
          <p className={classes.addArticleOrIdea__content__text}>
            {isArticle
              ? 'Поделитесь своими мыслями и исследованиями об урбанистике'
              : 'Поделитесь своими идеями улучшения условий для горожан'}
          </p>
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className={classes.addArticleOrIdea__content__button}
          >
            {isArticle ? 'Добавить статью' : 'Предложить идею'}
          </button>
        </div>
      </div>
    </div>
  )
}
