"use client"
import { RecoilRoot } from 'recoil'
import './globals.css'

const metadata = {
  title: 'BC Network',
  description: 'Bijective Connection Network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </body>
    </html>
  )
}
