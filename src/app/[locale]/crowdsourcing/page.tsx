/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { GiveIdea } from '@/entities/GiveIdea'

export default async function crowdsourcing({
  params,
  searchParams,
}: {
  params: { locale: string } & Promise<any>
  searchParams: any
}) {
  const { locale } = await params

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/crowdsourcing?locale=${locale}`
  )
  const data = await res.json()

  const crowdsourcingData = data.blocks[0].data

  return (
    <>
      <GiveIdea
        title={crowdsourcingData.title}
        desc={crowdsourcingData.desc}
        formData={crowdsourcingData.form}
      />
    </>
  )
}
