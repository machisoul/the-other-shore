'use client'

import { useEffect, useState } from 'react'

export default function VisitCounter() {
  const [visits, setVisits] = useState<string>('...')

  useEffect(() => {
    // Using hits.seeyoufarm.com - a reliable free visit counter
    // This increments on each page load/refresh
    const namespace = 'shore-vidge-me'
    const key = 'homepage-visits'

    // Method 1: Using CountAPI (simple and reliable)
    const countApiUrl = `https://api.countapi.xyz/hit/${namespace}/${key}`

    fetch(countApiUrl)
      .then(response => {
        if (!response.ok) throw new Error('API error')
        return response.json()
      })
      .then(data => {
        setVisits(data.value.toLocaleString('zh-CN'))
      })
      .catch(error => {
        console.error('Failed to fetch visit count:', error)
        // Fallback: show placeholder
        setVisits('---')
      })
  }, [])

  return (
    <span style={{ color: '#8b6f47', fontSize: '0.9rem' }}>
      访问量: {visits}
    </span>
  )
}
