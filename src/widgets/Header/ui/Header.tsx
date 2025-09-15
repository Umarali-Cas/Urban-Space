'use client'

import { Logo } from '@/entities/Logo'
import classes from './Header.module.scss'
import { NavBar } from '@/features/NavBar'
import { Button } from '@/shared/Button'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { DropDown } from '@/features/DropDown'

const BurgerMenu = dynamic(() =>
  import('@/entities/BurgerMenu/ui/BurgerMenu').then((mod) => mod.BurgerMenu),
  { ssr: false }
)

const languages = ['ru', 'en', 'kg'] 

export function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Logo />
        <NavBar />
        <div className={classes.header__actions}>
          <DropDown visibleArrow={false} className={classes.header__actions__lang} arr={languages} onSelect={() => console.log('awd')}/>
          <Link href="/login">
            <Button text="Войти" />
          </Link>
          <BurgerMenu />
        </div>
      </div>
    </header>
  )
}
