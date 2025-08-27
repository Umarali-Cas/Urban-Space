import { Logo } from '@/entities/Logo'
import classes from './Header.module.scss'
import { NavBar } from '@/features/NavBar'
import { Button } from '@/shared/Button'
import Link from 'next/link'

export function Header() {
  return (
    <header className={classes.header}>
      <Logo />
      <NavBar />
      <Link href="/login">
        <Button text="Войти" />
      </Link>
    </header>
  )
}
