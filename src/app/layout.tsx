import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/global.scss'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'

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
      <body className={`${inter.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
