import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/global.scss'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { Providers } from '@/app/providers'

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
<<<<<<< HEAD
        <Providers>{children}</Providers>
=======
        <main>{children}</main>
>>>>>>> 4f1a6fcbc4a2a699a47af26e209f2d829d051c4f
        <Footer />
      </body>
    </html>
  )
}
