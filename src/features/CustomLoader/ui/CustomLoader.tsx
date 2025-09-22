'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function CustomLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const timeout = setTimeout(() => {
      setLoading(false)
    }, 500) // ⏱️ задержка чтобы лоадер был виден хотя бы чуть-чуть

    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="global-loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-gray-400 border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
