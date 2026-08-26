<template>
  <div class="space-y-6 border-b border-black/10 pb-6">
    <!-- torna indietro -->
    <button type="button" @click="$emit('chiudi')" class="font-pixel text-xs text-zinc-400 hover:text-zinc-950 uppercase cursor-pointer flex items-center gap-1.5">
      <span>←</span> TORNA AL MIO PROFILO
    </button>
    
    <!-- scheda dettagli utente -->
    <div class="bg-zinc-50 border border-black/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div class="flex items-center gap-4">
        <img :src="utente.avatar" :alt="utente.nome" class="w-16 h-16 rounded-2xl object-cover border border-black/10 shadow-xs" />
        <div class="space-y-1">
          <h2 class="font-pixel text-xl text-zinc-950 uppercase">{{ utente.nome }}</h2>
          <p class="font-clash text-xs text-zinc-500">{{ utente.bio }}</p>
          <span class="font-pixel text-xs text-zinc-400 block">{{ utente.canzoni.length }} ZIDRISE NEL DIARIO</span>
        </div>
      </div>

      <button type="button" @click="$emit('toggleFollow', utente)" class="px-5 py-2.5 rounded-full font-pixel text-xs uppercase tracking-wider cursor-pointer shrink-0 transition-colors" 
        :class="isSeguito ? 'bg-zinc-200 text-zinc-700 hover:bg-red-mag/10 hover:text-red-mag' : 'bg-zinc-950 text-white hover:bg-zinc-800'">
        {{ isSeguito ? '✓ SEGUITO' : '+ SEGUI' }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  utente: { type: Object, required: true },
  isSeguito: { type: Boolean, default: false }
})

defineEmits(['chiudi', 'toggleFollow'])
</script>
