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
    // Use /up to increment counter on every page visit
    const counterUrl = 'https://api.counterapi.dev/v1/shore-vidge-me/homepage/up'

    fetch(counterUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Counter API failed')
        }
        return response.json()
      })
      .then(data => {
        // The API returns { count: number }
        const count = data.count || data.value || 0
        setVisits(count.toLocaleString('zh-CN'))
        console.log('Visit tracked:', count)
      })
      .catch(error => {
        console.error('Visit counter error:', error)
        // Fallback: Don't show the counter if it fails
        setVisits('---')
      })
  }, [pathname]) // Trigger on pathname change to track all page visits

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
