"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"


interface BackgroundSliderProps {
  images: string[]
  interval?: number
}

export function BackgroundSlider({ images, interval = 5000 }: BackgroundSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt="Movie Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
