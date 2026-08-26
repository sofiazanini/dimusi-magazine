<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs" @click.self="$emit('chiudi')">
    <div class="bg-white border border-black/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-left shadow-2xl relative">
      <button type="button" @click="$emit('chiudi')" class="absolute top-4 right-4 font-pixel text-xs text-zinc-400 hover:text-zinc-950 uppercase cursor-pointer">[ CHIUDI ✕ ]</button>
      
      <div class="flex items-center gap-4">
        <img :src="canzone.cover" :alt="canzone.titolo" class="w-24 h-24 rounded-2xl object-cover border border-black/10 shrink-0" />
        <div class="space-y-1">
          <span class="font-pixel text-xs text-red-mag uppercase">{{ canzone.volume }} // {{ canzone.archetipo }}</span>
          <h3 class="font-pixel text-2xl text-zinc-950 uppercase leading-tight">{{ canzone.titolo }}</h3>
          <p class="font-clash text-sm text-zinc-500 uppercase tracking-wider">{{ canzone.artista }}</p>
        </div>
      </div>

      <div class="space-y-2 bg-zinc-50 p-5 rounded-2xl border border-black/5">
        <span class="font-pixel text-xs text-zinc-400 uppercase tracking-wider block">[ ARKELO & SENSAZIONI PROVATE ]</span>
        <p class="font-clash text-sm text-zinc-800 leading-relaxed italic">"{{ canzone.arkelo }}"</p>
      </div>

      <div class="pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-3">
        <a 
          :href="`https://open.spotify.com/search/${encodeURIComponent(canzone.titolo + ' ' + canzone.artista)}`" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white font-pixel text-xs rounded-full uppercase hover:opacity-90 transition-opacity"
        >
          <span>ASCOLTA SU SPOTIFY</span> ↗
        </a>

        <div v-if="canzone.isMine" class="flex items-center gap-2">
          <button type="button" @click="$emit('modifica', canzone)" class="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-pixel text-xs rounded-full uppercase transition-colors cursor-pointer">
            MODIFICA ✎
          </button>
          <button type="button" @click="$emit('elimina', canzone.id)" class="px-3.5 py-2 bg-red-mag/10 hover:bg-red-mag hover:text-white text-red-mag font-pixel text-xs rounded-full uppercase transition-colors cursor-pointer">
            ELIMINA ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  canzone: { type: Object, required: true }
})
defineEmits(['chiudi', 'modifica', 'elimina'])
</script>
