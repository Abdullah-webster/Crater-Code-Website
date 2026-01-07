/**
 * Image optimization utilities for responsive loading
 */

export interface ImageConfig {
  src: string
  width?: number
  height?: number
  quality?: number
  priority?: boolean
}

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(src: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920]): string {
  return widths
    .map(width => `${src}?w=${width} ${width}w`)
    .join(', ')
}

/**
 * Get optimized image URL with quality and format
 */
export function getOptimizedImageUrl(
  src: string, 
  options: { width?: number; quality?: number; format?: 'webp' | 'avif' | 'jpg' } = {}
): string {
  const { width, quality = 75, format = 'webp' } = options
  const params = new URLSearchParams()
  
  if (width) params.append('w', width.toString())
  params.append('q', quality.toString())
  params.append('f', format)
  
  return `${src}?${params.toString()}`
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        img.src = src
        img.classList.add('loaded')
        observer.unobserve(img)
      }
    })
  }, { rootMargin: '50px' })
  
  observer.observe(img)
  return () => observer.disconnect()
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, priority: 'high' | 'low' = 'low') {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  link.fetchPriority = priority
  document.head.appendChild(link)
}
