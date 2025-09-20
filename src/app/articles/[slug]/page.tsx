/* eslint-disable react-hooks/rules-of-hooks */
/* app/articles/[slug]/page.tsx */
'use client'

import { useParams } from 'next/navigation'
import { useGetArticleBySlugQuery } from '@/widgets/Articles/api/articlesApi'
import { ArticlesInfo } from '@/entities/ArticlesInfo/ui/ArticlesInfo'

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  console.log(slug)
    if (!slug) return <p>Идентификатор идеи не найден</p>
  const { data: article, isLoading, error } = useGetArticleBySlugQuery(slug)

  if (isLoading) return <p>Загрузка...</p>
  if (error || !article) return <p>Статья не найдена</p>

  console.log(article)

  return (
    <section>
      <ArticlesInfo desc={article.summary} title={article.title}/>
    </section>
  )
}
