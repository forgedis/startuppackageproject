import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: {
    default: 'StartupPackage | Vše, co váš startup potřebuje k rozjezdu',
    template: '%s | StartupPackage',
  },
  description:
    'StartupPackage přináší startupům v rané fázi zvýhodněné balíčky nástrojů, služeb a know-how od ověřených partnerů. Šetříme vám čas, peníze i energii při vstupu na trh.',
  keywords: [
    'startup balíček',
    'startup nástroje',
    'služby pro startupy',
    'startup ČR',
    'early stage startup',
  ],
  authors: [{ name: 'StartupPackage' }],
  creator: 'StartupPackage',
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://startuppackage.cz',
    title: 'StartupPackage | Vše, co váš startup potřebuje k rozjezdu',
    description:
      'Zvýhodněné balíčky nástrojů a služeb pro startupy v rané fázi od ověřených partnerů.',
    siteName: 'StartupPackage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StartupPackage',
    description: 'Vše, co váš startup potřebuje k rozjezdu',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
