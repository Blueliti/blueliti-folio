import { useEffect, useRef, useState } from 'react'

// Hook personnalisé pour détecter quand un élément entre dans le viewport
export const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return [ref, isInView]
}

// Composant pour les animations de fade-in
export const FadeInOnScroll = ({ children, className = "", delay = 0 }) => {
  const [ref, isInView] = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isInView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Composant pour les animations de slide-in depuis la gauche
export const SlideInLeft = ({ children, className = "", delay = 0 }) => {
  const [ref, isInView] = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isInView 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Composant pour les animations de slide-in depuis la droite
export const SlideInRight = ({ children, className = "", delay = 0 }) => {
  const [ref, isInView] = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isInView 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Composant pour les animations de scale
export const ScaleOnScroll = ({ children, className = "", delay = 0 }) => {
  const [ref, isInView] = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isInView 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Composant pour l'effet parallax
export const ParallaxElement = ({ children, speed = 0.5, className = "" }) => {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * speed
        setOffset(rate)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`
      }}
    >
      {children}
    </div>
  )
}

// Composant pour les animations de compteur
export const CounterAnimation = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0)
  const [ref, isInView] = useInView(0.5)

  useEffect(() => {
    if (isInView) {
      let startTime = null
      const startCount = 0

      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        setCount(Math.floor(progress * (end - startCount) + startCount))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

export default {
  FadeInOnScroll,
  SlideInLeft,
  SlideInRight,
  ScaleOnScroll,
  ParallaxElement,
  CounterAnimation,
  useInView
}

