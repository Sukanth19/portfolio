import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Sukanth - Developer / Builder / Experimenter',
  description: 'Computer Science student who learns by building. Exploring systems, AI/ML, cybersecurity, game development, and more.',
  keywords: ['developer', 'portfolio', 'computer science', 'AI', 'ML', 'cybersecurity', 'game development'],
  authors: [{ name: 'Sukanth' }],
  creator: 'Sukanth',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/Sukanth19',
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
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
