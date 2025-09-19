'use client'

import { Logo } from '@/entities/Logo'
import classes from './Header.module.scss'
import { NavBar } from '@/features/NavBar'
import { Button } from '@/shared/Button'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { DropDown } from '@/features/DropDown'
import { usePathname, useRouter} from 'next/navigation'
import Cookies from 'js-cookie'


const BurgerMenu = dynamic(() =>
  import('@/entities/BurgerMenu/ui/BurgerMenu').then((mod) => mod.BurgerMenu),
  { ssr: false }
)

const languages = ['ru', 'en', 'kg'] 

export function Header({localize, btn}: {localize: string[], btn: string}) {
  const router = useRouter()
  const pathname = usePathname() // текущий путь без домена


  const handleLanguageChange = (lang: string) => {
    Cookies.set('locale', lang, { expires: 365 })
    const segments = pathname.split('/') // ['', 'ru', 'about']
    if (segments[1] && languages.includes(segments[1])) {
      segments[1] = lang // заменяем сегмент с локалью
    } else {
      segments.unshift('', lang) // если нет локали в пути
    }
    const newPath = segments.join('/') || '/'
    router.push(newPath, { scroll: false })
  }

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Logo />
        <NavBar localizedTitles={localize}/>
        <div className={classes.header__actions}>
          <DropDown
            visibleArrow={false}
            className={classes.header__actions__lang}
            arr={languages}
            onSelect={(value) => handleLanguageChange(value as string)} // вот здесь
          />
          <Link href="/login">
            <Button text={btn} />
          </Link>
          <BurgerMenu />
        </div>
      </div>
    </header>
  )
}
