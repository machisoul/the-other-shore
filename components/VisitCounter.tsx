'use client'

import { useEffect, useState } from 'react'

export default function VisitCounter() {
  const [visits, setVisits] = useState<string>('...')

  useEffect(() => {
    // Only fetch the current count without incrementing using Vercel proxy
    const counterUrl = '/api/counter/get'

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
      })
      .catch(error => {
        console.error('Visit counter error:', error)
        // Fallback: Don't show the counter if it fails
        setVisits('---')
      })
  }, [])

  return (
    <span>
      访问量：{visits}
    </span>
  )
}
