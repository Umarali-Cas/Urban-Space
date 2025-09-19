/* eslint-disable @typescript-eslint/no-explicit-any */
import { EcoBaner } from '@/entities/EcoBaner'
import { LoginW } from '@/features/auth/ui/Login'

export default async function Login({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = await Promise.resolve(params)

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/home?locale=${locale}`
  )
  const logRes = await fetch(
    `https://api.urbanspace.sdinis.org/pages/login?locale=${locale}`
  )
  const data = await res.json()
  const logData = await logRes.json()

  const ecoBaner = data.blocks.find((b: any) => b.type === 'features')?.data
  console.log(logData?.blocks[0].data)

  return (
    <>
      <EcoBaner title={ecoBaner.title} desc={ecoBaner.desc} />
      <LoginW
        mail={logData?.blocks[0].data.mail}
        pass={logData?.blocks[0].data.pass}
        loginBtn={logData?.blocks[0].data.loginButton}
        regBtn={logData?.blocks[0].data.RegisterButton}
        remember={logData?.blocks[0].data.remember}
        title={logData?.blocks[0].data.title}
      />
    </>
  )
}
