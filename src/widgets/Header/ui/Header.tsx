import { Logo } from '@/entities/Logo'
import classes from './Header.module.scss'
import { NavBar } from '@/features/NavBar'
import { Button } from '@/shared/Button'
import { BurgerMenu } from '@/entities/BurgerMenu'

export function Header() {


  return (
    <header className={classes.header}>
        <Logo />
        <NavBar />
        <div className={classes.header__actions}>
          <Button text='Войти'/>
          <BurgerMenu />
        </div>
    </header>
  )
}
