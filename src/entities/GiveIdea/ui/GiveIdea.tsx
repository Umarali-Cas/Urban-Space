/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import classes from './GiveIdea.module.scss'
import dynamic from 'next/dynamic'

const IdeaForm = dynamic(() =>
  import('@/features/IdeaForm/ui/IdeaForm').then((mod) => mod.IdeaForm),
  { ssr: false }
)

export function GiveIdea({title, desc, formData} : {title: string, desc: string, formData: any}) {
  console.log('formData', formData)
  return (
    <section className={classes.giveIdea}>
      <div className={classes.giveIdea__header}>
        <h1 className={classes.giveIdea__header__title}>{title}</h1>
        <p className={classes.giveIdea__header__description}>
          {desc}
        </p>
      </div>
      <IdeaForm formData={formData}/>
    </section>
  )
}
