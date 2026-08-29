<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/30 backdrop-blur-xs" @click.self="$emit('chiudi')">
    <div class="bg-white border border-black/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 text-left shadow-2xl relative">
      <button type="button" @click="$emit('chiudi')" class="absolute top-5 right-5 font-pixel text-xs px-3 py-1 bg-zinc-100 rounded-full cursor-pointer">CHIUDI ✕</button>
      
      <div class="flex items-start gap-3">
        <img :src="canzone.cover" :alt="canzone.titolo" class="w-26 h-26 rounded-2xl object-cover border border-black/10 shrink-0" />
        <div class="space-y-1 pt-1">
          <div class="flex gap-1.5 font-pixel text-[9px] uppercase tracking-widest text-zinc-400 py-1 flex-col">
            <span class="text-zinc-600">[{{ canzone.tipo }}]</span>
            <div class="flex flex-row">
              <span>{{ canzone.data || '—' }}</span>
              <span class="text-zinc-300">/</span>
              <span class="text-red-mag font-semibold">{{ canzone.archetipo }}</span>
            </div>
          </div>
          <h3 class="font-pixel text-2xl text-zinc-950 leading-none">{{ canzone.titolo }}</h3>
          <p class="font-clash text-sm text-zinc-500 uppercase tracking-wider">{{ canzone.artista }}</p>
        </div>
      </div>
      
      <div class="space-y-2 bg-zinc-50 p-5 rounded-2xl border border-black/5">
        <span class="font-pixel text-xs text-zinc-400 uppercase tracking-wider block">[ ARKELO ]</span>
        <p class="font-clash text-sm text-zinc-800 leading-relaxed italic">"{{ canzone.arkelo }}"</p>
      </div>
      
      <!-- Tag -->
      <div v-if="canzone.tags && canzone.tags.length" class="flex flex-wrap gap-1.5 mt-auto">
        <button v-for="t in canzone.tags" :key="t" type="button" @click.stop="$emit('selezionaTag', t)"
        class="font-pixel text-[9px] px-2.5 py-1 rounded-full bg-zinc-50 hover:bg-zinc-950 text-zinc-600 hover:text-white transition-colors uppercase tracking-wider border border-black/5 cursor-pointer">
        {{ t.startsWith('#') ? t : `#${t}` }}
      </button>
    </div>
    
    <div class="flex flex-wrap items-center justify-between gap-3">
      <a :href="`https://open.spotify.com/search/${encodeURIComponent(canzone.titolo + ' ' + canzone.artista)}`"  target="_blank"  rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white font-pixel text-xs rounded-full uppercase hover:opacity-90 transition-opacity">
      <span>ASCOLTA SU SPOTIFY</span> ↗
    </a>
    
    <div class="flex items-center gap-2">
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