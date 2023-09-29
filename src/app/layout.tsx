import './globals.scss'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import NavBar from '@/components/NavBar/NavBar'
import Ligth from '@/components/Ligth/Ligth'

const figtree = Figtree({ subsets: ['latin'], weight:['400', '700'] })

export const metadata: Metadata = {
  title: 'Shamy Movie Application',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={figtree.className}>
        <NavBar />
        <Ligth id={1}/>
        <Ligth id={2}/>
        {children}
      </body>
    </html>
  )
}
