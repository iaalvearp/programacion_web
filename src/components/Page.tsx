"use client"

import { useState, useEffect } from "react"
import { BackgroundSlider } from "./react-components/BackgroundSlider"
import { LoginForm } from "./react-components/LoginForm"
import { MovieCatalog } from "./react-components/MovieCatalog"
import { AnimatePresence, motion } from "framer-motion"

// Imágenes de ejemplo para el fondo (Películas de estreno)
const ALL_WALLPAPERS = [
  "/img/wallpapers/300.webp",
  "/img/wallpapers/aladino.webp",
  "/img/wallpapers/alien.webp",
  "/img/wallpapers/batman.webp",
  "/img/wallpapers/cazafantasmas.webp",
  "/img/wallpapers/dayz.webp",
  "/img/wallpapers/deadpool.webp",
  "/img/wallpapers/interestellar.webp",
  "/img/wallpapers/raya.webp",
  "/img/wallpapers/spiderman.webp",
  "/img/wallpapers/tron.webp",
]

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [shuffledImages, setShuffledImages] = useState<string[]>([])

  useEffect(() => {
    // Shuffle images on mount
    setShuffledImages([...ALL_WALLPAPERS].sort(() => Math.random() - 0.5))
  }, [])

  // Controlamos el scroll del body dependiendo del estado de autenticación
  useEffect(() => {
    if (isAuthenticated) {
      document.body.style.overflow = "auto"
    } else {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isAuthenticated])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  return (
    <main className="relative min-h-screen w-full text-white">
      {/* Fondo que cambia dinámicamente */}
      <div className="fixed inset-0 z-0">
        <BackgroundSlider images={shuffledImages.length > 0 ? shuffledImages : ALL_WALLPAPERS} />
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Contenido Principal */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center justify-center p-4"
            >
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </motion.div>
          ) : (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1"
            >
              <MovieCatalog />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
