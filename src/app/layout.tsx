import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  weight: ['500', '700'],
})

export const metadata: Metadata = {
  title: 'CRATER CODE | Engineering the Future',
  description: 'Elite technology studio crafting next-generation digital experiences. We build what others imagine.',
  keywords: ['technology', 'software development', 'innovation', 'digital experiences', 'web development'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased noise-overlay">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
