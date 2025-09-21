// app/admin/layout.tsx
'use client'

import React from 'react'
import { Providers } from '@/app/[locale]/providers'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      {children}
    </Providers>
  )
}
