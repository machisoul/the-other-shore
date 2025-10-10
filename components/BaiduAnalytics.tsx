'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    _hmt: any[]
  }
}

export default function BaiduAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // 初始化百度统计
    if (typeof window !== 'undefined') {
      window._hmt = window._hmt || []

      // 加载百度统计脚本
      const hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?ecc58db907ef8780e2bc1439d3b6c6bc'
      const s = document.getElementsByTagName('script')[0]
      s.parentNode?.insertBefore(hm, s)
    }
  }, [])

  useEffect(() => {
    // 每次路由变化时发送 PV
    if (typeof window !== 'undefined' && window._hmt) {
      window._hmt.push(['_trackPageview', pathname])
      console.log('Baidu Analytics tracked:', pathname)
    }
  }, [pathname])

  return null
}
