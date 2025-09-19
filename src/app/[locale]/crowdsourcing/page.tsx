import { GiveIdea } from "@/entities/GiveIdea";

export default async function crowdsourcing({
  params,
}: {
  params: { locale: string }
}) {
    const { locale } = await Promise.resolve(params)

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/crowdsourcing?locale=${locale}`
  )
  const data = await res.json()

  const crowdsourcingData = data.blocks[0].data

  return (
    <>
      <GiveIdea title={crowdsourcingData.title} desc={crowdsourcingData.desc} formData={crowdsourcingData.form}/>
    </>
  )
}