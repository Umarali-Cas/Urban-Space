import Link from 'next/link'
import classes from './NavBar.module.scss'
import { NavBarTitles } from '../lib/NavBar.helpers'

interface NavBarItem {
  title: string
  href: string
}

export function NavBar({ localizedTitles }: { localizedTitles: string[] }) {
  return (
    <nav className={classes.navbar}>
      {NavBarTitles.map((item: NavBarItem, index: number) => (
        <Link
          href={item.href}
          key={item.title}
          className={classes.navbar__link}
          prefetch
        >
          {localizedTitles?.[index] ?? item.title}
        </Link>
      ))}
    </nav>
  )
}
