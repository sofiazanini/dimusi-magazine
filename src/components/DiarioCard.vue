<template>
    <article class="group bg-white border border-black/10 hover:border-black/30 rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer text-left w-full"   
    @click="$emit('seleziona', canzone)">
    
    <!-- VERSIONE COMPATTA (Solo per il Drawer laterale) -->
    <div v-if="isCompact" class="flex flex-col gap-3">
        <div class="flex items-center gap-3.5">
            <div class="w-20 aspect-square rounded-2xl overflow-hidden border border-black/10 bg-zinc-100 shrink-0">
                <img :src="canzone.cover" :alt="canzone.titolo" @error="gestisciErroreImg" class="w-full h-full object-cover"/>
            </div>
            <div class="flex flex-col justify-center min-w-0 flex-1 space-y-0.5">
                <h3 class="font-pixel text-sm text-zinc-950 leading-tight truncate">{{ canzone.titolo }}</h3>
                <p class="font-clash text-xs text-zinc-400 uppercase tracking-wider truncate">{{ canzone.artista }}</p>
                <div class="flex items-center gap-1.5 font-pixel text-[9px] uppercase tracking-widest text-zinc-400 pt-1 flex-wrap">
                    <span>{{ canzone.data || '—' }}</span>
                    <span class="text-zinc-300">/</span>
                    <span class="text-red-mag font-semibold">{{ canzone.archetipo }}</span>
                </div>
            </div>
        </div>

        <p class="font-clash text-base text-zinc-800 leading-relaxed italic wrap-break-word">{{ canzone.arkelo }}</p>

        <div v-if="canzone.tags && canzone.tags.length" class="flex flex-wrap gap-1.5 pt-1">
            <button v-for="t in canzone.tags" :key="t" type="button" @click.stop="$emit('selezionaTag', t)"
             class="font-pixel text-[9px] px-2.5 py-1 rounded-full bg-zinc-50 hover:bg-zinc-950 text-zinc-600 hover:text-white transition-colors uppercase tracking-wider border border-black/5 cursor-pointer">
                {{ t.startsWith('#') ? t : `#${t}` }}
            </button>
        </div>
    </div>

    <!-- VERSIONE NORMALE (Timeline principale: Mobile con testi a lato + Desktop originale) -->
    <div v-else class="flex flex-col sm:flex-row lg:gap-6 items-start">
        <div class="w-full sm:w-36 md:w-40 shrink-0 flex flex-row sm:flex-col items-center sm:items-start gap-3.5 sm:gap-2.5 pb-3 sm:pb-0">
            <div class="relative w-20 sm:w-full sm:aspect-square rounded-2xl overflow-hidden border border-black/10 bg-zinc-100 shrink-0">
                <img :src="canzone.cover" :alt="canzone.titolo" @error="gestisciErroreImg" class="w-full aspect-square object-cover transition-all duration-500"/>
            </div>
            <!-- Info visibili accanto alla copertina su mobile/tablet nella timeline -->
            <div class="flex xl:hidden flex-col justify-center min-w-0 flex-1 space-y-0.5">
                <h3 class="font-pixel text-sm text-zinc-950 leading-tight truncate">{{ canzone.titolo }}</h3>
                <p class="font-clash text-xs text-zinc-400 uppercase tracking-wider truncate">{{ canzone.artista }}</p>
                <div class="flex items-center gap-1.5 font-pixel text-[9px] uppercase tracking-widest text-zinc-400 pt-1 flex-wrap">
                    <span>{{ canzone.data || '—' }}</span>
                    <span class="text-zinc-300">/</span>
                    <span class="text-red-mag font-semibold">{{ canzone.archetipo }}</span>
                </div>
            </div>
        </div>

        <div class="flex-1 w-full flex flex-col justify-between self-stretch gap-2 min-w-0">        
            <!-- Header desktop originale -->
            <div class="hidden xl:flex flex-wrap items-center justify-between gap-2 border-b border-black/5 py-2">
                <div class="min-w-0 flex-1 space-y-0.5">
                    <h3 class="font-pixel sm:text-base text-zinc-950 leading-tight transition-colors">{{ canzone.titolo }}</h3>
                    <p class="font-clash text-xs text-zinc-400 uppercase tracking-wider">{{ canzone.artista }}</p>
                </div>
                <div class="flex items-center gap-2 font-pixel text-[10px] uppercase tracking-widest text-zinc-400">
                    <span>{{ canzone.data || '—' }}</span>
                    <span class="text-zinc-300">/</span>
                    <span class="text-red-mag font-semibold">{{ canzone.archetipo }}</span>
                    <span class="text-zinc-300">/</span>
                    <span class="text-zinc-600">[{{ canzone.tipo }}]</span>
                </div>
            </div>

            <p class="font-clash text-base sm:text-lg text-zinc-800 leading-relaxed italic wrap-break-word">{{ canzone.arkelo }}</p>
            
            <!-- Tag -->
            <div v-if="canzone.tags && canzone.tags.length" class="flex flex-wrap gap-1.5 pt-2 mt-auto">
                <button v-for="t in canzone.tags" :key="t" type="button" @click.stop="$emit('selezionaTag', t)"
                 class="font-pixel text-[9px] px-2.5 py-1 rounded-full bg-zinc-50 hover:bg-zinc-950 text-zinc-600 hover:text-white transition-colors uppercase tracking-wider border border-black/5 cursor-pointer">
                    {{ t.startsWith('#') ? t : `#${t}` }}
                </button>
            </div>
        </div>
    </div>
</article>
</template>

<script setup>
defineProps({
    canzone: { type: Object, required: true },
    isCompact: { type: Boolean, default: false }
})

defineEmits(['seleziona', 'selezionaTag'])

const gestisciErroreImg = (e) => {
    e.target.src = 'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62'
}
</script>