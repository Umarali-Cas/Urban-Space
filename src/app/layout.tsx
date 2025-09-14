import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/global.scss'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { Providers } from '@/app/providers'
import { Loader } from '@/entities/Loader'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.variable}`}>
        <Loader />
        <Header />
        <Providers>
          <main>{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
