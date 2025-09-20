/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useParams } from 'next/navigation'
import { useGetIdeaBySlugQuery } from '@/widgets/LastIdeas/api/IdeasApi'
import Image from 'next/image'
import classes from './IdeaDetailPage.module.scss'

export default function IdeaDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  console.log(slug)
    if (!slug) return <p>Идентификатор идеи не найден</p>
  const { data: idea, isLoading, error } = useGetIdeaBySlugQuery(slug)

  if (isLoading) return <p>Загрузка...</p>
  if (error || !idea) return <p>Статья не найдена</p>

  return (
    <section className={classes.ideaDetail}>
      <div className={classes.ideaDetail__header}>
        {idea.media?.[0]?.meta?.url && (
          <Image
            src={idea.media[0].meta.url}
            alt="idea image"
            width={600}
            height={400}
            className={classes.ideaDetail__header__image}
          />
        )}
      </div>
      <div className={classes.ideaDetail__author}>
        <Image
          src={idea.author_avatar || ''}
          alt="avatar"
          width={48}
          height={48}
          style={{ borderRadius: '50%' }}
        />
        <span style={{ marginLeft: '12px' }}>
          {idea.author_name || 'Неизвестный'}
        </span>
      </div>
      <h1>{idea.title}</h1>
      <p>{idea.description_md}</p>

      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>
        <Image src={''} alt="likes" width={24} height={24} />
        <span style={{ marginLeft: '8px' }}>{idea.likes_count}</span>
      </div>
    </section>
  )
}
