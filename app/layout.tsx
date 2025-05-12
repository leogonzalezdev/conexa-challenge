import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import { Toaster } from 'sonner'
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rick & Morty - Conexa Challenge",
  description: "Technical challenge for Conexa",
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-[#0f0f0f] text-white">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
