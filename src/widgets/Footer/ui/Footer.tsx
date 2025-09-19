import { Logo } from '@/entities/Logo'
import classes from './Footer.module.scss'
import { NavBar } from '@/features/NavBar'
import Image from 'next/image'
import instagram from '../assets/icons/instagram.svg'
import telegram from '../assets/icons/telegram.svg'
import Link from 'next/link'

export function Footer({currentLocale} : {currentLocale: string[]}) {
  return (
    <footer className={classes.footer}>
      <Logo />
      <NavBar localizedTitles={currentLocale}/>
      <div className={classes.footer__contacts}>
        <Link href={'#'}>
          <Image className={classes.footer__icon} src={telegram} alt="telegram" width={24} height={24} />
        </Link>
        <Link href={'#'}>
          <Image className={classes.footer__icon} src={instagram} alt="instagram" width={24} height={24} />
        </Link>
      </div>
    </footer>
  )
}
