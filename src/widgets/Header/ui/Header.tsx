/* eslint-disable react-hooks/exhaustive-deps */
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

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useGetProfileQuery } from '@/features/auth/api/authApi'
import profileImg from '../assets/images/profile.svg'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'

const BurgerMenu = dynamic(
  () =>
    import('@/entities/BurgerMenu/ui/BurgerMenu').then(mod => mod.BurgerMenu),
  { ssr: false }
)

const languages = [
  {
    value: 'ru',
    label: 'ru',
  },
  { value: 'en', label: 'en' },
  { value: 'kg', label: 'kg' },
]

export function Header({ localize, btn }: { localize: string[]; btn: string }) {
  const router = useRouter()
  const pathname = usePathname() // текущий путь без домена
  const token = useSelector((state: RootState) => state.auth.token)
  const {
    data: user,
    isLoading,
    refetch,
  } = useGetProfileQuery(undefined, {
    skip: !token, // если нет токена — пропускаем запрос
  })

  useEffect(() => {
    if (token) {
      refetch()
    }
  }, [token])

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

  const showProfileOrButton = () => {
    if (isLoading) return null
    if (user)
      return (
        <Link href="/profile">
          <Button
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
            }}
            text={
              <Image src={profileImg} alt={'profile'} width={24} height={24} />
            }
          />
        </Link>
      )
    if (width !== null && width >= 555)
      return (
        <Link href="/login">
          <Button text={btn} />
        </Link>
      )
    return null
  }
  const shouldShowLoginButton = !user && width !== null && width < 555

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
            button={classes.header__actions__lang__btn}
            itemsClassName={classes.header__actions__lang__item}
          />
          {/* {width !== null && width > 555 && (
            <Link href="/login">
              <Button text={btn} />
            </Link>
          )} */}
          {showProfileOrButton()}
          <BurgerMenu
            isVisibleLoginButton={shouldShowLoginButton ? true : false}
            btn={btn}
            localizedTitles={localize}
          />
        </div>
      </div>
    </header>
  )
}
