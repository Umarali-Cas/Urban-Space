/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ArticlesWrapp from './ArticleWrapp'

// 1) Пересекаем { locale: string } с Promise<any>
// 2) Для searchParams используем any — это самое «лёгкое» совпадение с Record<...>
export default async function ArticlesPage({
  params,
  searchParams,
}: {
  params: { locale: string } & Promise<any>
  searchParams: any
}) {
  const { locale } = params

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/urban-articles?locale=${locale}`
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch articles for locale: ${locale}`)
  }
  const data = await res.json()
  const articleData = data?.blocks?.[0]?.data

  return (
    <ArticlesWrapp
      title={articleData?.title ?? 'No title'}
      desc={articleData?.desc ?? 'No description'}
    />
  )
}
