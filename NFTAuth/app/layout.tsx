import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import Navbar from "@/components/navbar"  // ← Make sure this is correct
import { Footer } from "@/components/footer"
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: "NFT Credentials - Blockchain Academic Verification",
  description: "Universities issue tamper-proof digital degrees as NFTs on Ethereum",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          suppressHydrationWarning
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}