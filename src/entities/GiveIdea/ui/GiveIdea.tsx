'use client'

// import { IdeaForm } from '@/features/IdeaForm/ui/IdeaForm'
import classes from './GiveIdea.module.scss'
// import { SupportUs } from '@/features/SupportUs/ui/SupportUs'
import dynamic from 'next/dynamic'

const IdeaForm = dynamic(() =>
  import('@/features/IdeaForm/ui/IdeaForm').then((mod) => mod.IdeaForm),
  { ssr: false }
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
    </section>
  )
}
