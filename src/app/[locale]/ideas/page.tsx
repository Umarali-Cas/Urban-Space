/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { LastIdeas } from '@/widgets/LastIdeas'

export default async function BankIdeas({
  params,
  searchParams,
}: {
  params: { locale: string } & Promise<any>
  searchParams: any
}) {
  const { locale } = await params

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/bank-of-ideas?locale=${locale}`
  )
  const data = await res.json()

  const heroData = data.blocks[0].data

  console.log(heroData)

  return (
    <>
      <LastIdeas
        title={heroData.title}
        subtitle={heroData.desc}
        viewCards={9}
      />
    </>
  )
}
