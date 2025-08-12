import Link from 'next/link'
import classes from './NavBar.module.scss'
import { NavBarTitles } from '../lib/NavBar.helpers'

export function NavBar() {
  return (
    <nav className={classes.navbar}>
      {NavBarTitles.map(item => (
        <Link href={'#'} key={item.title} className={classes.navbar__link}> 
            {item.title}
        </Link>
      ))}
    </nav>
  )
}
