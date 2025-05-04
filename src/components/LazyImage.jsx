"use client"

import { useState, useEffect, useRef } from "react"

const LazyImage = ({ src, alt, width, height, placeholderSrc = "/placeholder.svg", className = "", ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "100px",
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div
      ref={imgRef}
      className={`lazy-image-container ${className}`}
      style={{
        position: "relative",
        width: width || "100%",
        height: height || "auto",
        overflow: "hidden",
      }}
    >
      {/* Placeholder image */}
      {!isLoaded && (
        <img
          src={placeholderSrc || "/placeholder.svg"}
          alt={alt}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(10px)",
            transform: "scale(1.1)",
            opacity: isLoaded ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
          width={width}
          height={height}
        />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          onLoad={handleImageLoad}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
          width={width}
          height={height}
          {...props}
        />
      )}
    </div>
  )
}

export default LazyImage

