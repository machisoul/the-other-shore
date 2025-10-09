'use client'

import { useEffect, useState } from 'react'

export default function VisitCounter() {
  const [visits, setVisits] = useState<string>('...')

  useEffect(() => {
    // Only fetch the current count without incrementing
    // Use the 'get' endpoint instead of 'up'
    const counterUrl = 'https://api.counterapi.dev/v1/shore-vidge-me/homepage'

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
    <span style={{ textAlign: 'center', fontSize: '0.85rem', color: '#a0896d', marginBottom: '3rem', textIndent: 0 }}>
      访问量: {visits}
    </span>
  )
}
