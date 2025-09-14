import Image from 'next/image'
import logo from '../assets/icons/logo.svg'
import classes from './Logo.module.scss'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href={'/'} className={classes.logo__link}>
      <div className={classes.logo}>
        <Image
          className={classes.logo__icon}
          src={logo}
          alt="logo-urban-space"
        />
        <h2 className={classes.logo__title}>URBAN SPACE</h2>
      </div>
    </Link>
  )
}
