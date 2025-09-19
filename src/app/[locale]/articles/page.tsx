import ArticlesWrapp from "./ArticleWrapp";

export default async function ArticlesPage({
  params,
}: {
  params: { locale: string }
}) {
    const { locale } = await Promise.resolve(params)

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/urban-articles?locale=${locale}`
  )
  const data = await res.json()

  const articleData = data.blocks[0].data

  return <ArticlesWrapp title={articleData.title} desc={articleData.desc}/>;
}