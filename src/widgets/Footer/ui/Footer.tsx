import { Logo } from '@/entities/Logo'
import classes from './Footer.module.scss'
import { NavBar } from '@/features/NavBar'
import Image from 'next/image'
import instagram from '../assets/icons/instagram.svg'
import telegram from '../assets/icons/telegram.svg'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Logo />
      <NavBar />
      <div className={classes.footer__contacts}>
        <Link href={'#'}>
          <Image src={telegram} alt="telegram" width={24} height={24} />
        </Link>
        <Link href={'#'}>
          <Image src={instagram} alt="instagram" width={24} height={24} />
        </Link>
      </div>
    </footer>
  )
}
