import './globals.css'
import type { Metadata } from 'next'
import VisitCounter from '@/components/VisitCounter'
import CopyProtection from '@/components/CopyProtection'

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
        <CopyProtection />
        <VisitCounter displayOnly={false} />
        {children}
      </body>
    </html>
  )
}
