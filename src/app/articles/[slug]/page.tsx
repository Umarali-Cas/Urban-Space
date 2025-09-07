/* eslint-disable react-hooks/rules-of-hooks */
/* app/articles/[slug]/page.tsx */
'use client'

import { useParams } from 'next/navigation'
import { useGetArticleBySlugQuery } from '@/widgets/Articles/api/articlesApi'

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  console.log(slug)
    if (!slug) return <p>Идентификатор идеи не найден</p>
  const { data: article, isLoading, error } = useGetArticleBySlugQuery(slug)

  if (isLoading) return <p>Загрузка...</p>
  if (error || !article) return <p>Статья не найдена</p>

  return (
    <section>
      <h1>{article.title}</h1>
      <p>{article.summary}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </section>
  )
}
