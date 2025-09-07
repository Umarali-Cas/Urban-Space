// components/Loader.tsx
'use client'
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import classes from './Loader.module.scss'

export function Loader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 400) // имитация перехода
    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div style={{width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.71)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999}}>
      <div className={classes.loader}></div>
    </div>
  )
}
