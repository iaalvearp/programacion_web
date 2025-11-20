"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Lock, User } from "lucide-react"

interface LoginFormProps {
  onLoginSuccess: () => void
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulación de validación
    // En un caso real, aquí llamarías a tu API
    setTimeout(() => {
      // Aceptamos cualquier usuario/pass para la demo, o puedes poner lógica específica
      // if (user === 'admin' && pass === '1234') ...
      setIsLoading(false)
      onLoginSuccess()
    }, 1500)
  }

  return (
    <div className="w-full max-w-md relative group font-[Helvetica,system-ui,sans-serif]">
      {/* Card Glassmorphism */}
      <div className="relative backdrop-blur-2xl backdrop-saturate-150 bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 md:p-10 overflow-hidden">
        {/* Brillo superior del borde */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Bienvenido</h1>
          <p className="text-white/60 text-sm">Ingresa a tu cuenta para ver los estrenos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label htmlFor="username" className="text-white/80 text-sm font-medium">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              <input
                id="username"
                placeholder="nombre@ejemplo.com"
                className="flex h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 pl-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="password" className="text-white/80 text-sm font-medium">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="flex h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 pl-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full bg-white/90 text-black hover:bg-white h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ingresando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-xs text-white/50 hover:text-white transition-colors">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  )
}
