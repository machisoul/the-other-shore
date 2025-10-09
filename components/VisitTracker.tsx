'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function VisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track visit on every page navigation using Vercel proxy
    const counterUrl = '/api/counter/increment'

    fetch(counterUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Counter API failed')
        }
        return response.json()
      })
      .then(data => {
        console.log('Visit tracked:', data.count)
      })
      .catch(error => {
        console.error('Visit tracker error:', error)
      })
  }, [pathname]) // Trigger on pathname change

  return null // This component doesn't render anything
}
