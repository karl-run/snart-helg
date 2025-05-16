import './globals.css'

import type { Metadata } from 'next'
import { Source_Code_Pro } from 'next/font/google'
import Script from 'next/script'

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'optional',
})

export const metadata: Metadata = {
  title: 'Snart helg?',
  description: 'Er det snart helg? Kanskje.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  openGraph: {
    url: 'https://helg.karl.run',
    title: 'Er det snart helg?',
    siteName: 'Snart Helg?',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className={sourceCodePro.className}>{children}</body>
      <Script
        strategy="afterInteractive"
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "493807fafdc44cd8bb8ef13c64082007"}'
      />
    </html>
  )
}
