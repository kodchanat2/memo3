import { useState, useEffect } from 'react'

export function useVisualViewport() {
  const [viewport, setViewport] = useState({
    height: window.visualViewport?.height || window.innerHeight,
    offsetTop: window.visualViewport?.offsetTop || 0,
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        setViewport({
          height: window.visualViewport.height,
          offsetTop: window.visualViewport.offsetTop,
        })
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
      window.visualViewport.addEventListener('scroll', handleResize)
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
        window.visualViewport.removeEventListener('scroll', handleResize)
      }
    }
  }, [])

  return viewport
}
