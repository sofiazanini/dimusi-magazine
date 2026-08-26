<template>
  <section class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full">
      <article 
        v-for="c in canzoni" 
        :key="c.id" 
        class="group bg-white hover:bg-zinc-50 border border-black/10 hover:border-black/20 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xs" 
        @mouseenter="$emit('mouseEntra', c, $event)" 
        @mouseleave="$emit('mouseEsce')" 
        @mousemove="$emit('mouseMuove', $event)" 
        @click="$emit('seleziona', c)"
      >
        <!-- cover -->
        <div class="relative w-full aspect-square bg-zinc-950 overflow-hidden">
          <img 
            :src="c.cover" 
            :alt="c.titolo" 
            @error="gestisciErroreImg"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
          <div class="absolute top-2.5 left-2.5 bg-red-mag text-white font-pixel text-[9px] px-2 py-0.5 rounded-full uppercase shadow-xs">
            {{ c.archetipo }}
          </div>
        </div>
        
        <!-- info brano -->
        <div class="p-4 space-y-3 flex-1 flex flex-col justify-between text-left">
          <div>
            <h4 class="font-pixel text-sm text-zinc-950 uppercase truncate">{{ c.titolo }}</h4>
            <p class="font-clash text-xs text-zinc-400 uppercase truncate">{{ c.artista }}</p>
          </div>
          
          <p class="font-clash text-xs text-zinc-600 leading-snug">{{ c.motivoConsiglio }}</p>
          
          <div class="pt-2 border-t border-black/5 flex items-center justify-between">
            <span class="font-pixel text-[9px] text-zinc-400">♥ {{ c.amicoCheHaSalvat }}</span>
            <a 
              :href="`https://open.spotify.com/search/${encodeURIComponent(c.titolo + ' ' + c.artista)}`" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="font-pixel text-[10px] text-[#1DB954] hover:underline font-bold" 
              @click.stop
            >
              SPOTIFY ↗
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  canzoni: { type: Array, required: true }
})

defineEmits(['mouseEntra', 'mouseEsce', 'mouseMuove', 'seleziona'])

const gestisciErroreImg = (e) => {
  e.target.src = 'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62'
}
</script>