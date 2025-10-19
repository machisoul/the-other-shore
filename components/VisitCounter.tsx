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
    // Only fetch if this is a display instance
    if (!displayOnly) {
      return
    }

    // Use finicounter.eu.org to track visits for the entire domain
    const counterUrl = 'https://finicounter.eu.org/counter?host=shore.vidge.me'

    fetch(counterUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Counter API failed')
        }
        return response.json()
      })
      .then(data => {
        // The API returns { views: number }
        const count = data.views || 0
        setVisits(count.toLocaleString('zh-CN'))
        console.log('Visit tracked:', count)
      })
      .catch(error => {
        console.error('Visit counter error:', error)
        // Fallback: Don't show the counter if it fails
        setVisits('---')
      })
  }, [pathname, displayOnly]) // Trigger on pathname change to track all page visits

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
