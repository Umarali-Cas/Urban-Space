'use client'

import { Logo } from '@/entities/Logo'
import classes from './Header.module.scss'
import { NavBar } from '@/features/NavBar'
import { Button } from '@/shared/Button'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { DropDown } from '@/features/DropDown'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import kg from '../assets/images/kg.jpg'
import ru from '../assets/images/ru.jpg'
import uk from '../assets/images/uk.jpg'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const BurgerMenu = dynamic(
  () =>
    import('@/entities/BurgerMenu/ui/BurgerMenu').then(mod => mod.BurgerMenu),
  { ssr: false }
)

const languages = [
  {
    value: 'ru',
    label: <Image src={ru} width={30} height={20} alt="ru" />,
  },
  { value: 'en', label: <Image src={uk} width={30} height={20} alt="en" /> },
  { value: 'kg', label: <Image src={kg} width={30} height={20} alt="kg" /> },
]

export function Header({ localize, btn }: { localize: string[]; btn: string }) {
  const router = useRouter()
  const pathname = usePathname() // текущий путь без домена

  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLanguageChange = (lang: string) => {
    Cookies.set('locale', lang, { expires: 365 })
    const segments = pathname.split('/') // ['', 'ru', 'about']
    if (segments[1] && languages.some(l => l.value === segments[1])) {
      segments[1] = lang
    } else {
      segments.unshift('', lang)
    }
    const newPath = segments.join('/') || '/'
    router.push(newPath, { scroll: false })
  }

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Logo />
        <NavBar localizedTitles={localize} />
        <div className={classes.header__actions}>
          <DropDown
            visibleArrow={false}
            className={classes.header__actions__lang}
            arr={languages}
            onSelect={value => handleLanguageChange(value as string)}
            isLanguage={true}
          />
          {width !== null && width > 555 && (
            <Link href="/login">
              <Button text={btn} />
            </Link>
          )}
          <BurgerMenu btn={btn} localizedTitles={localize} />
        </div>
      </div>
    </header>
  )
}
