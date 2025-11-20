
import { Play, Info, Plus } from "lucide-react"

// Datos mock de películas
const MOVIES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: `Película Estreno ${i + 1}`,
  category: ["Acción", "Sci-Fi", "Drama"][i % 3],
  rating: (Math.random() * 2 + 3).toFixed(1),
  image: `/placeholder.svg?height=600&width=400&query=movie-poster-${i}`,
}))

export function MovieCatalog() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <header className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Catálogo</h2>
          <p className="text-white/60">Las mejores películas seleccionadas para ti</p>
        </div>
        <div className="hidden md:flex gap-4 text-sm font-medium text-white/60">
          <span className="text-white cursor-pointer">Todos</span>
          <span className="hover:text-white cursor-pointer transition-colors">Películas</span>
          <span className="hover:text-white cursor-pointer transition-colors">Series</span>
          <span className="hover:text-white cursor-pointer transition-colors">Novedades</span>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {MOVIES.map((movie) => (
          <div
            key={movie.id}
            className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="aspect-[2/3] relative">
              <img
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay al hacer hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-4">
                <button className="bg-white text-black rounded-full p-3 hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 fill-current" />
                </button>
                <div className="flex gap-3">
                  <button className="bg-white/20 text-white rounded-full p-2 hover:bg-white/40 transition-colors">
                    <Plus className="h-5 w-5" />
                  </button>
                  <button className="bg-white/20 text-white rounded-full p-2 hover:bg-white/40 transition-colors">
                    <Info className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 backdrop-blur-md backdrop-saturate-150 bg-black/30">
              <h3 className="font-semibold text-white truncate">{movie.title}</h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-white/50">{movie.category}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs text-white/70">{movie.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Espacio extra para scroll */}
      <div className="h-20" />
    </div>
  )
}
