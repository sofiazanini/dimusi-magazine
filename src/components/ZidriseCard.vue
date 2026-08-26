<template>
  <div 
    class="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-black/10 cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-300 hover:scale-103 hover:z-20"
    @mouseenter="$emit('mouseEntra', canzone, $event)"
    @mouseleave="$emit('mouseEsce')"
    @mousemove="$emit('mouseMuove', $event)"
    @click="$emit('seleziona', canzone)"
  >
    <!-- cover -->
    <img 
      :src="canzone.cover" 
      :alt="canzone.titolo" 
      @error="gestisciErroreImg"
      class="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-108 transition-all duration-700 ease-out" 
    />
    
    <!-- badge volume -->
    <div v-if="canzone.volume && canzone.volume !== 'Nessuno'" class="absolute top-2.5 right-2.5 bg-zinc-950/80 backdrop-blur-xs text-white font-pixel text-[9px] px-2 py-0.5 rounded-full uppercase border border-white/10 pointer-events-none">
      {{ canzone.volume }}
    </div>

    <!-- badge archetipo -->
    <div v-if="mostraBadgeArchetipo" class="absolute top-2.5 left-2.5 bg-red-mag text-white font-pixel text-[9px] px-2 py-0.5 rounded-full uppercase shadow-xs pointer-events-none">
      {{ canzone.archetipo }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  canzone: { type: Object, required: true },
  mostraBadgeArchetipo: { type: Boolean, default: false }
})

defineEmits(['mouseEntra', 'mouseEsce', 'mouseMuove', 'seleziona'])

const gestisciErroreImg = (e) => {
  e.target.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'
}
</script>