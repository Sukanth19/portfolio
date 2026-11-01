import type { Metadata } from 'next'
import { Archivo_Black, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const display = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--display' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://sukanth19.vercel.app'),
  title: 'Sukanth - Developer / Builder / Experimenter',
  description: 'Computer Science student who learns by building. Exploring systems, AI/ML, cybersecurity, game development, and more.',
  keywords: ['developer', 'portfolio', 'computer science', 'AI', 'ML', 'cybersecurity', 'game development'],
  authors: [{ name: 'Sukanth' }],
  creator: 'Sukanth',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sukanth19.vercel.app',
    title: 'Sukanth - Developer Portfolio',
    description: 'Computer Science student who learns by building.',
    siteName: 'Sukanth Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sukanth - Developer Portfolio',
    description: 'Computer Science student who learns by building.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
