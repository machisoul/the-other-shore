'use client'

import { useEffect } from 'react'

export default function VisitTracker() {
  useEffect(() => {
    // Track visit on every page load
    const counterUrl = 'https://api.counterapi.dev/v1/shore-vidge-me/homepage/up'

    fetch(counterUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Counter API failed')
        }
        return response.json()
      })
      .catch(error => {
        console.error('Visit tracker error:', error)
      })
  }, [])

  return null // This component doesn't render anything
}
