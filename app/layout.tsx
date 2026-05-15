import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mossel Bay Padel — Indoor Courts, Hartenbos',
  description: "Mossel Bay's premier indoor padel club. Book courts, join events, and compete at Hart & Bosch Village, Hartenbos.",
  openGraph: {
    title: 'Mossel Bay Padel',
    description: "Play. Compete. Connect.",
    images: ['/mbp_poster.webp'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed.variable} ${dmSans.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}
