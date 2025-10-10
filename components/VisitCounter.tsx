'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface VisitCounterProps {
  displayOnly?: boolean // true = only display, false = increment on load
}

export default function VisitCounter({ displayOnly = false }: VisitCounterProps) {
  const [visits, setVisits] = useState<string>('...')
  const pathname = usePathname()

  useEffect(() => {
    // 记录页面访问
    fetch('/api/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: pathname }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Visit API failed')
        }
        return response.json()
      })
      .then(data => {
        // 使用总访问量
        const count = data.total || 0
        setVisits(count.toLocaleString('zh-CN'))
        console.log('Visit tracked:', pathname, '- Total visits:', count)
      })
      .catch(error => {
        console.error('Visit counter error:', error)
        setVisits('---')
      })
  }, [pathname]) // 每次路径变化都会触发计数

  // If displayOnly is false, don't render anything (invisible tracker)
  if (!displayOnly) {
    return null
  }

  // If displayOnly is true, show the counter
  return (
    <span>
      访问量：{visits}
    </span>
  )
}
