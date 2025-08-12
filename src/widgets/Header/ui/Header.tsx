import { Logo } from '@/entities/Logo'
import classes from './Header.module.scss'
import { NavBar } from '@/features/NavBar'
import { Button } from '@/shared/Button'

export function Header() {
  return (
    <header className={classes.header}>
        <Logo />
        <NavBar />
        <Button text='Войти'/>
    </header>
  )
}
