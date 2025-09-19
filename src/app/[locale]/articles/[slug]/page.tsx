/* eslint-disable react-hooks/rules-of-hooks */
/* app/articles/[slug]/page.tsx */
'use client'

import { useParams } from 'next/navigation'
import { useGetArticleBySlugQuery } from '@/widgets/Articles/api/articlesApi'
import { ArticlesInfo } from '@/entities/ArticlesInfo/ui/ArticlesInfo'
import Image from 'next/image'

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  console.log(slug)
  if (!slug) return <p>Идентификатор идеи не найден</p>
  const { data: article, isLoading, error } = useGetArticleBySlugQuery(slug)

  if (isLoading) return <p>Загрузка...</p>
  if (error || !article)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Image className='global-image-nothing' src="/nothing.svg" alt="404" width={600} height={400} />
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Статья не найдена
        </p>
      </div>
    )

  return (
    <>
      <ArticlesInfo desc={article.summary} title={article.title} />
    </>
  )
}
