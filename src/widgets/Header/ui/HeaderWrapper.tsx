'use client'

import { useLoginButton } from '@/i18n/useNativeLocale'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./Header').then(mod => mod.Header), { ssr: false })


export default function HeaderWrapper({lang}: {lang: string[]}) {
  // const lang = useNavBarTiles()
  const button = useLoginButton()
  return <Header localize={lang} btn={button} />
}
