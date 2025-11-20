<!-- Contador.vue -->

<!-- 1. LA PLANTILLA (HTML) -->
<template>
  <div class="contador">
    <h3>Contador: {{ contador }}</h3>
    <!-- v-on escucha eventos (como 'click') -->
    <button @click="incrementar">Incrementar</button>
    <button @click="decrementar">Decrementar</button>
    <!-- v-if muestra un elemento condicionalmente -->
    <p v-if="contador > 5">¡El contador es mayor que 5!</p>
  </div>
</template>
<!-- 2. LA LÓGICA (JavaScript / Composition API) -->
<script setup>
import { ref } from "vue";
// 'ref' crea una variable reactiva (el estado)
const contador = ref(0);
// Funciones que modifican el estado
function incrementar() {
  console.log("Incrementando...");
  contador.value++;
}
function decrementar() {
  if (contador.value > 0) {
    console.log("Decrementando...");
    contador.value--;
  }
}
</script>
<!-- 3. LOS ESTILOS (CSS) -->
<!-- 'scoped' significa que estos estilos SOLO se aplican a este componente -->
<style scoped>
.contador {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}
button {
  margin: 5px;
  padding: 10px;
  background-color: #42b983; /* Color de Vue */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #34a06f;
}
</style>
