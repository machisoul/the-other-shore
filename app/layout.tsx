import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '王与笑',
  description: '一段关于寻找自我、逃离现实，却意外卷入未知事件的旅程',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
