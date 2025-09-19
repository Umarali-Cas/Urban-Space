'use client'

import { Header } from './Header'

export function HeaderWrapper({languages, button} : {languages: string[], button: string}) {
  return <Header localize={languages} btn={button}/>
}
