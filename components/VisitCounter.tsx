'use client'

import { useEffect, useState } from 'react'

export default function VisitCounter() {
  const [visits, setVisits] = useState<string>('...')

  useEffect(() => {
    // Use a more reliable counter API with proper CORS support
    // Option 1: api.counterapi.dev (free, no registration)
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
      })
      .catch(error => {
        console.error('Visit counter error:', error)
        // Fallback: Don't show the counter if it fails
        setVisits('---')
      })
  }, [])

  return (
    <span style={{ color: '#8b6f47', fontSize: '0.9rem' }}>
      访问量: {visits}
    </span>
  )
}
