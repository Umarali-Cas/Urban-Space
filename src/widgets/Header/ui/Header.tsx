import { Logo } from '@/entities/Logo'
import classes from './Header.module.scss'
import { NavBar } from '@/features/NavBar'
import { Button } from '@/shared/Button'
<<<<<<< HEAD
import Link from 'next/link'
=======
import { BurgerMenu } from '@/entities/BurgerMenu'
>>>>>>> 4f1a6fcbc4a2a699a47af26e209f2d829d051c4f

export function Header() {
  return (
    <header className={classes.header}>
<<<<<<< HEAD
      <Logo />
      <NavBar />
      <Link href="/login">
        <Button text="Войти" />
      </Link>
=======
      <div className={classes.header__content}>
        <Logo />
        <NavBar />
        <div className={classes.header__actions}>
          <Button text="Войти" />
          <BurgerMenu />
        </div>
      </div>
>>>>>>> 4f1a6fcbc4a2a699a47af26e209f2d829d051c4f
    </header>
  )
}
