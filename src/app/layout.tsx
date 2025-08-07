import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description: 'Modern portfolio showcasing creative web development projects with smooth animations and innovative design.',
  keywords: ['portfolio', 'web development', 'react', 'next.js', 'framer motion'],
  authors: [{ name: 'Mayukh Das' }],
  creator: 'Mayukh Das',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Portfolio | Mayukh Das',
    description: 'Modern portfolio showcasing creative web development projects',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider>
          <CustomCursor />
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
