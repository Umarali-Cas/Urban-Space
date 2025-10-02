/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/global.scss'
import { Footer } from '@/widgets/Footer'
import { Providers } from '@/app/[locale]/providers'
import { Loader } from '@/entities/Loader'
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'
import HeaderWrapper from '@/widgets/Header/ui/HeaderWrapper'
import { cookies } from 'next/headers'
import { useNavBarTiles } from '@/i18n/useNativeLocale'

const inter = Inter({
  variable: '--font-family',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Urban Space',
  description: 'Urban Space - Ideas for the city, solutions for life',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default async function RootLayout({
  children,
  params,
  searchParams,
}: {
  params: { locale: string } & Promise<any>
  children: ReactNode
  searchParams: any
}) {
  let { locale } = await params

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/home?locale=${locale}`,
    { cache: 'no-store' }
  )
  const data = await res.json()

  // Преобразуем в messages

  const messages: Record<string, any> = {}
  data.blocks.forEach((block: { type: string; data: any }, index: number) => {
    if (
      data.blocks.filter((b: { type: string }) => b.type === block.type)
        .length > 1
    ) {
      messages[`${block.type}${index}`] = block.data
    } else {
      messages[block.type] = block.data
    }
  })

  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('locale')?.value
  if (cookieLocale && ['ru', 'en', 'kg'].includes(cookieLocale)) {
    locale = cookieLocale
  }

  const navCta = data.blocks.filter((b: any) => b.type === 'html')

  return (
    <html lang={locale}>
      <body className={`${inter.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Loader />
          <Providers>
          <HeaderWrapper/>
            <main>{children}</main>
          </Providers>
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
