'use client'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./Header').then(mod => mod.Header), { ssr: false })

export default function HeaderWrapper({
  languages,
  button,
}: {
  languages: string[]
  button: string
}) {
  return <Header localize={languages} btn={button} />
}
