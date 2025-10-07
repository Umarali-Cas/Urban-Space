/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useParams } from 'next/navigation'
import { useGetIdeaBySlugQuery } from '@/widgets/LastIdeas/api/IdeasApi'
import { IdeasDetailPage } from '@/entities/IdeasDetailPage/IdeasDetailPage'

export default function IdeaInfoPage() {
  const { slug } = useParams<{ slug: string }>()
  if (!slug) return <p>Идентификатор идеи не найден</p>
  const { data: idea, isLoading, error } = useGetIdeaBySlugQuery(slug)
  
  if (isLoading) return <p style={{ textAlign: 'center' }}>Загрузка...</p>
  if (error || !idea) return <p>Статья не найдена</p>

  return (
    <>
      <IdeasDetailPage id={idea.id} timeCreate={idea.created_at} image={idea.media} desc={idea.description_md} title={idea.title} />
    </>
  )
}
