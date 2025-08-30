'use client'

import classes from './GiveIdea.module.scss'
import dynamic from 'next/dynamic'

const IdeaForm = dynamic(() =>
  import('@/features/IdeaForm/ui/IdeaForm').then((mod) => mod.IdeaForm)
)

const SupportUs = dynamic(() =>
  import('@/features/SupportUs/ui/SupportUs').then((mod) => mod.SupportUs)
)

export function GiveIdea() {
  return (
    <section className={classes.giveIdea}>
      <div className={classes.giveIdea__header}>
        <h1 className={classes.giveIdea__header__title}>Предложить идею</h1>
        <p className={classes.giveIdea__header__description}>
          Вы можете оставить своё предложение или помочь развитию нашей
          инициативы
        </p>
      </div>
      <IdeaForm />
      <h1 className={classes.giveIdea__support__title}>
        Оказать финансовую поддержку
      </h1>
      <SupportUs />
    </section>
  )
}
