// import { SupportUs } from "@/features/SupportUs/ui/SupportUs";

import { SupportUs } from '@/features/SupportUs/ui/SupportUs'

export default async function crowdfunding({
  params,
}: {
  params: { locale: string }
}) {
    const { locale } = await Promise.resolve(params)

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/crowdfunding?locale=${locale}`
  )
  const data = await res.json()

  const crowdfundingData = data.blocks[0].data

  console.log(crowdfundingData)
  return (
    <>
      <SupportUs title={crowdfundingData.title} desc={crowdfundingData.desc} formData={crowdfundingData.form}/>
    </>
  )
}
