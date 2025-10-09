import './globals.css'
import type { Metadata } from 'next'
import VisitTracker from '@/components/VisitTracker'

export const metadata: Metadata = {
  title: '此岸彼岸',
  description: '关于穿越、遗憾与无法抵达的救赎',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <VisitTracker />
        {children}
      </body>
    </html>
  )
}
