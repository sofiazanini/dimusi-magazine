<template>
  <section>
    <!-- Messaggio quando l'archivio è vuoto -->
    <div 
      v-if="canzoni.length === 0" 
      class="p-16 text-center rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 space-y-2"
    >
      <p class="font-pixel text-xs text-zinc-400 uppercase">[ NESSUNA TRACCIA TROVATA ]</p>
      <p class="font-clash text-xs text-zinc-500">Usa il pulsante "+ NUOVA ZIDRISA" per iniziare.</p>
    </div>
    
    <!-- Griglia quadrata delle canzoni -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 w-full">
      <ZidriseCard 
        v-for="c in canzoni" 
        :key="c.id" 
        :canzone="c" 
        @mouseEntra="(canzone, e) => $emit('mouseEntra', canzone, e)" 
        @mouseEsce="$emit('mouseEsce')" 
        @mouseMuove="(e) => $emit('mouseMuove', e)" 
        @seleziona="(canzone) => $emit('seleziona', canzone)" 
      />
    </div>
  </section>
</template>

<script setup>
import ZidriseCard from './ZidriseCard.vue'

defineProps({
  canzoni: { type: Array, required: true }
})

defineEmits(['mouseEntra', 'mouseEsce', 'mouseMuove', 'seleziona'])
</script>
