/* eslint-disable @typescript-eslint/no-explicit-any */
import { EcoBaner } from '@/entities/EcoBaner'
import { RegisterW } from '@/features/auth/ui/Register'

export default async function Register({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = await Promise.resolve(params)

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/home?locale=${locale}`
  )
  const registerRes = await fetch(
    `https://api.urbanspace.sdinis.org/pages/registration?locale=${locale}`
  )
  const loginRes = await fetch(
    `https://api.urbanspace.sdinis.org/pages/login?locale=${locale}`
  )
  const data = await res.json()
  const regData = await registerRes.json()
  const logData = await loginRes.json()


  const ecoBaner = data.blocks.find((b: any) => b.type === 'features')?.data
  console.log(regData?.blocks[0].data)
  return (
    <section>
      <EcoBaner title={ecoBaner.title} desc={ecoBaner.desc} />
      <RegisterW
        title={regData?.blocks[0].data.title}
        form={regData?.blocks[0].data}
        remember={logData?.blocks[0].data.remember}
        pass={logData?.blocks[0].data.pass}
      />
    </section>
  )
}
