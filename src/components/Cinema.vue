<template>
  <div class="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <Film class="w-8 h-8 text-red-500" />
          <h1 class="text-2xl font-bold text-white">CinemaHub</h1>
        </div>
        <div class="text-sm text-slate-400">
          {{ currentStep }} / 4
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Step 1: Select Movie -->
      <div v-if="currentStep === 1" class="space-y-6">
        <div>
          <h2 class="text-3xl font-bold text-white mb-2">Selecciona una película</h2>
          <p class="text-slate-400">Elige tu película favorita</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="movie in movies"
            :key="movie.id"
            @click="selectMovie(movie)"
            class="group cursor-pointer rounded-lg overflow-hidden transition-all duration-300"
            :class="[
              selectedMovie?.id === movie.id 
                ? 'ring-4 ring-red-500 scale-105 shadow-2xl shadow-red-500/20' 
                : 'hover:scale-105 hover:shadow-xl'
            ]"
          >
            <div 
              class="relative h-64 bg-cover bg-center"
              :style="{ backgroundImage: `url(${movie.image})` }"
            >
              <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
              <div class="absolute inset-0 flex items-end p-4">
                <div class="text-white">
                  <p class="font-semibold text-lg shadow-black/50 drop-shadow-md">{{ movie.name }}</p>
                  <p class="text-sm text-slate-200 shadow-black/50 drop-shadow-md">{{ movie.duration }} min</p>
                </div>
              </div>
            </div>
            <div 
              class="p-4 border border-slate-700/50 transition-colors duration-300"
              :class="selectedMovie?.id === movie.id ? 'bg-red-950/30 border-red-500/50' : 'bg-slate-800'"
            >
              <h3 class="font-semibold text-white">{{ movie.name }}</h3>
              <p class="text-sm text-slate-400 mt-1">{{ movie.genre }}</p>
              <p class="text-red-500 font-bold mt-2">${{ movie.price }}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            @click="nextStep"
            :disabled="!selectedMovie"
            class="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed cursor-pointer text-white font-semibold rounded-lg transition-colors"
          >
            Siguiente <ChevronRight class="w-4 h-4 inline ml-2" />
          </button>
        </div>
      </div>

      <!-- Step 2: Select Time -->
      <div v-else-if="currentStep === 2" class="space-y-6">
        <div>
          <h2 class="text-3xl font-bold text-white mb-2">{{ selectedMovie?.name }}</h2>
          <p class="text-slate-400">Selecciona una hora</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="time in times"
            :key="time"
            @click="selectedTime = time"
            class="p-4 rounded-lg border-2 cursor-pointer text-center font-semibold transition-all"
            :class="selectedTime === time ? 'border-red-500 bg-red-500/20 text-red-400' : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-red-400'"
          >
            {{ time }}
          </div>
        </div>
        <div class="flex justify-between">
          <button
            @click="prevStep"
            class="px-8 py-3 bg-slate-700 hover:bg-slate-600 cursor-pointer text-white font-semibold rounded-lg transition-colors"
          >
            <ChevronLeft class="w-4 h-4 inline mr-2" /> Atrás
          </button>
          <button
            @click="nextStep"
            :disabled="!selectedTime"
            class="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed cursor-pointer text-white font-semibold rounded-lg transition-colors"
          >
            Siguiente <ChevronRight class="w-4 h-4 inline ml-2" />
          </button>
        </div>
      </div>

      <!-- Step 3: Select Seats - THE SHOWPIECE -->
      <div v-else-if="currentStep === 3" class="space-y-8">
        <div>
          <h2 class="text-3xl font-bold text-white mb-2">Selecciona tus asientos</h2>
          <p class="text-slate-400">{{ selectedMovie?.name }} - {{ selectedTime }}</p>
        </div>

        <!-- Seat Legend -->
        <div class="flex flex-wrap gap-8 justify-center p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
              <Check class="w-5 h-5 text-green-500" />
            </div>
            <span class="text-slate-300">Disponible</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
              <Heart class="w-5 h-5 text-red-500" />
            </div>
            <span class="text-slate-300">Seleccionado</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-slate-600/20 border-2 border-slate-600 flex items-center justify-center">
              <X class="w-5 h-5 text-slate-600" />
            </div>
            <span class="text-slate-400">Ocupado</span>
          </div>
        </div>

        <!-- Screen -->
        <div class="flex justify-center mb-8">
          <div class="w-full max-w-2xl">
            <div class="bg-linear-to-b from-cyan-400/20 to-transparent p-6 rounded-t-full border-2 border-cyan-400/30 relative">
              <div class="text-center text-cyan-400 font-semibold text-sm tracking-widest">PANTALLA</div>
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent"></div>
            </div>
          </div>
        </div>

        <!-- Seats Grid -->
        <div class="flex justify-center">
          <div class="space-y-4">
            <!-- Rows -->
            <div v-for="(row, rowIndex) in seatGrid" :key="rowIndex" class="flex items-center gap-3 justify-center">
              <span class="w-6 text-center text-slate-500 font-semibold text-sm">{{ String.fromCharCode(65 + rowIndex) }}</span>
              <div class="flex gap-3">
                <button
                  v-for="(seat, seatIndex) in row"
                  :key="`${rowIndex}-${seatIndex}`"
                  @click="toggleSeat(rowIndex, seatIndex)"
                  :disabled="seat.occupied"
                  class="seat-button group relative"
                  :class="{
                    'seat-available': !seat.occupied && !seat.selected,
                    'seat-selected': seat.selected,
                    'seat-occupied': seat.occupied,
                  }"
                >
                  <span class="seat-icon">
                    <Check v-if="!seat.occupied && !seat.selected" class="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    <Heart v-else-if="seat.selected" class="w-4 h-4" />
                    <X v-else-if="seat.occupied" class="w-4 h-4" />
                  </span>
                  <span class="seat-label">{{ seatIndex + 1 }}</span>
                </button>
              </div>
              <span class="w-6 text-center text-slate-500 font-semibold text-sm">{{ String.fromCharCode(65 + rowIndex) }}</span>
            </div>
            <!-- Column Numbers -->
            <div class="flex items-center gap-3 justify-center mt-6">
              <span class="w-6"></span>
              <div class="flex gap-3">
                <div v-for="i in 10" :key="i" class="w-8 h-8 flex items-center justify-center text-slate-600 text-xs font-semibold">
                  {{ i }}
                </div>
              </div>
              <span class="w-6"></span>
            </div>
          </div>
        </div>

        <!-- Selected Seats Info -->
        <div v-if="selectedSeats.length > 0" class="p-6 bg-linear-to-r from-red-500/10 to-red-500/5 rounded-lg border border-red-500/30">
          <p class="text-slate-300 mb-2">
            <span class="font-semibold text-red-500">{{ selectedSeats.length }}</span>
            asiento(s) seleccionado(s):
            <span class="font-semibold text-white">{{ selectedSeats.join(', ') }}</span>
          </p>
          <p class="text-slate-400 text-sm">Total: <span class="text-red-500 font-bold text-lg">${{ totalPrice }}</span></p>
        </div>

        <div class="flex justify-between">
          <button
            @click="prevStep"
            class="px-8 py-3 bg-slate-700 hover:bg-slate-600 cursor-pointer text-white font-semibold rounded-lg transition-colors"
          >
            <ChevronLeft class="w-4 h-4 inline mr-2" /> Atrás
          </button>
          <button
            @click="nextStep"
            :disabled="selectedSeats.length === 0"
            class="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
          >
            Siguiente <ChevronRight class="w-4 h-4 inline ml-2" />
          </button>
        </div>
      </div>

      <!-- Step 4: Confirmation -->
      <div v-else-if="currentStep === 4" class="space-y-6">
        <div class="text-center">
          <CheckCircle class="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 class="text-3xl font-bold text-white mb-2">¡Reserva confirmada!</h2>
          <p class="text-slate-400">Tu boleto está listo para descargar</p>
        </div>

        <div class="bg-linear-to-br from-slate-800 to-slate-900 p-8 rounded-lg border border-slate-700/50 space-y-4">
          <div class="flex justify-between items-start pb-4 border-b border-slate-700/50">
            <div>
              <p class="text-slate-500 text-sm">Película</p>
              <p class="text-white font-semibold text-lg">{{ selectedMovie?.name }}</p>
            </div>
            <div class="text-right">
              <p class="text-slate-500 text-sm">Hora</p>
              <p class="text-white font-semibold text-lg">{{ selectedTime }}</p>
            </div>
          </div>

          <div class="flex justify-between items-start pb-4 border-b border-slate-700/50">
            <div>
              <p class="text-slate-500 text-sm">Asientos</p>
              <p class="text-white font-semibold">{{ selectedSeats.join(', ') }}</p>
            </div>
            <div class="text-right">
              <p class="text-slate-500 text-sm">Cantidad</p>
              <p class="text-white font-semibold">{{ selectedSeats.length }} boleto(s)</p>
            </div>
          </div>

          <div class="flex justify-between items-center pt-4">
            <p class="text-slate-400">Total a pagar</p>
            <p class="text-red-500 font-bold text-3xl">${{ totalPrice }}</p>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            @click="resetBooking"
            class="flex-1 px-8 py-3 bg-slate-700 hover:bg-slate-600 cursor-pointer text-white font-semibold rounded-lg transition-colors"
          >
            Nueva Reserva
          </button>
          <button
            @click="completeBooking"
            class="flex-1 px-8 py-3 bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download class="w-4 h-4" /> Descargar Boleto
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Film, Popcorn, ChevronRight, ChevronLeft, Check, Heart, X, CheckCircle, Download } from 'lucide-vue-next'

const currentStep = ref(1)
const selectedMovie = ref(null)
const selectedTime = ref(null)
const selectedSeats = ref([])

const movies = [
  { id: 1, name: 'Superman', genre: 'Acción/Superhéroes', price: 15.00, duration: 135, image: '/img/superman.avif' },
  { id: 2, name: 'Un Película de Minecraft', genre: 'Aventura/Fantasía', price: 12.50, duration: 110, image: '/img/minecraft.avif' },
  { id: 3, name: 'Avatar: Fuego y Ceniza', genre: 'Ciencia Ficción', price: 18.00, duration: 190, image: '/img/avatar.avif' },
]

const times = ['10:00 AM', '1:30 PM', '4:00 PM', '7:30 PM', '10:00 PM']

// Initialize seat grid (8 rows x 10 columns)
const seatGrid = ref(
  Array(8)
    .fill(null)
    .map((_, rowIndex) =>
      Array(10)
        .fill(null)
        .map((_, seatIndex) => ({
          occupied: Math.random() > 0.7, // 30% occupied
          selected: false,
        }))
    )
)

const totalPrice = computed(() => {
  const basePrice = selectedMovie.value?.price || 0
  return (selectedSeats.value.length * basePrice).toFixed(2)
})

const toggleSeat = (rowIndex, seatIndex) => {
  const seat = seatGrid.value[rowIndex][seatIndex]
  if (seat.occupied) return

  seat.selected = !seat.selected

  const seatLabel = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`
  if (seat.selected) {
    selectedSeats.value.push(seatLabel)
  } else {
    selectedSeats.value = selectedSeats.value.filter((s) => s !== seatLabel)
  }

  selectedSeats.value.sort((a, b) => {
    const rowA = a.charCodeAt(0)
    const rowB = b.charCodeAt(0)
    return rowA !== rowB ? rowA - rowB : parseInt(a.slice(1)) - parseInt(b.slice(1))
  })
}

const selectMovie = (movie) => {
  selectedMovie.value = movie
}

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const resetBooking = () => {
  currentStep.value = 1
  selectedMovie.value = null
  selectedTime.value = null
  selectedSeats.value = []
  seatGrid.value = Array(8)
    .fill(null)
    .map((_, rowIndex) =>
      Array(10)
        .fill(null)
        .map((_, seatIndex) => ({
          occupied: Math.random() > 0.7,
          selected: false,
        }))
    )
}

const completeBooking = () => {
  alert(`¡Boleto descargado! ${selectedSeats.value.length} asiento(s) en ${selectedMovie.value.name}`)
  resetBooking()
}
</script>

<style scoped>
@reference "../styles/global.css";
.seat-button {
  @apply w-8 h-8 rounded flex items-center justify-center relative text-xs font-semibold transition-all duration-200 cursor-pointer;
}

.seat-available {
  @apply bg-green-500/20 border-2 border-green-500 text-green-500 hover:bg-green-500/40 hover:scale-110 shadow-lg shadow-green-500/20;
}

.seat-selected {
  @apply bg-red-500/40 border-2 border-red-500 text-red-400 scale-110 shadow-lg shadow-red-500/40;
}

.seat-occupied {
  @apply bg-slate-600/20 border-2 border-slate-600 text-slate-600 cursor-not-allowed opacity-60;
}

.seat-icon {
  @apply absolute transition-all opacity-100;
}

.seat-label {
  @apply text-[10px];
}

.seat-available:hover .seat-label {
  @apply opacity-0;
}
</style>