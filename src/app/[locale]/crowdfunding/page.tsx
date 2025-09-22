/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SupportUs } from '@/features/SupportUs/ui/SupportUs'

export default async function crowdfunding({
  params,
  searchParams,
}: {
  params: { locale: string } & Promise<any>
  searchParams: any
}) {
  const { locale } = await params

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/crowdfunding?locale=${locale}`
  )
  const data = await res.json()

  const crowdfundingData = data.blocks[0].data

  console.log(crowdfundingData)
  return (
    <>
      <SupportUs
        title={crowdfundingData.title}
        desc={crowdfundingData.desc}
        formData={crowdfundingData.form}
      />
    </>
  )
}
