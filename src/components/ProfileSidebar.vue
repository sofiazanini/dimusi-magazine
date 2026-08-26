<template>
  <aside class="w-full md:w-80 lg:w-88 shrink-0 flex flex-col gap-6 text-left">
    
    <!-- menu -->
    <div class="relative bg-zinc-50 border border-black/10 rounded-3xl overflow-hidden select-none">
      <nav class="relative z-20 flex flex-col">
        <div v-for="voce in listaVociMenu" :key="voce.etichetta" class="relative border-b border-black/10 last:border-b-0 group overflow-hidden">
          <div class="absolute inset-0 transition-transform duration-200 ease-out origin-left pointer-events-none"
          :class="[voce.classeSfondo, voce.percorso === '/social' ? 'scale-x-100 opacity-90' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100']"></div>
          
          <router-link :to="voce.percorso" class="relative z-10 flex items-center justify-between px-6 py-4.5 no-underline cursor-pointer transition-transform duration-150 group-hover:translate-x-2">
            <span class="font-pixel text-3xl sm:text-4xl md:text-3xl leading-none tracking-tight transition-colors duration-150"
            :class="[voce.classeTesto, voce.percorso === '/social' ? 'text-white!' : 'group-hover:text-white! group-active:text-white!']">
              {{ voce.etichetta }}
            </span>
              
            <span class="font-pixel text-xl sm:text-2xl md:text-lg text-white transition-all duration-150" :class="voce.percorso === '/social' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'"> → </span>
          </router-link>
        </div>
      </nav>
    </div>

    <!-- profilo -->
    <div class="border border-black/20 rounded-3xl p-6 lg:p-7 space-y-5 transition-all duration-300 relative overflow-hidden" 
    :class="haBadgeVol1 ? 'bg-red-mag/5 border-red-mag/30' : 'bg-zinc-50 '">
      
      <!-- foto + sticker + username -->
      <div class="flex flex-col gap-4 relative">
        <div class="relative w-full h-full aspect-square max-h-lg rounded-2xl overflow-visible shrink-0">
          <img :src="datiProfilo.avatar" :alt="datiProfilo.nome" class="w-full h-full object-cover rounded-2xl border transition-colors duration-300 shadow-xs" :class="haBadgeVol1 ? 'border-red-mag' : 'border-zinc-950'"/>
          <div v-if="haBadgeVol1" class="absolute -top-2.5 -right-2.5 bg-zinc-50 border text-red-mag font-pixel text-xs px-2 py-0.5 rounded-md shadow-md rotate-12 uppercase tracking-tighter cursor-default select-none" title="Badge Sbloccato: Vol. 01 — Dove il velo si lacera">
            ★ VOL.01
          </div>
        </div>
        
        <div class="space-y-0.5">
          <div class="flex gap-1.5">
            <h2 class="font-pixel text-lg md:text-2xl text-zinc-950 leading-tight">{{ datiProfilo.nome }}</h2>
          </div>
          <p class="font-clash text-sm md:text-lg text-zinc-400">{{ datiProfilo.username }}</p>
        </div>
      </div>
      <!-- info -->
      <p class="font-clash text-sm md:text-base text-zinc-600">
        {{ datiProfilo.bio }}
      </p>

      <!-- statistiche -->
      <div class="grid grid-cols-2 gap-2 py-2 border-y border-black/10 font-pixel text-xs">
        <div>
          <span class="text-zinc-400 block uppercase text-[10px]">ZIDRISE</span>
          <span class="text-zinc-950 text-base font-bold">{{ totaleCanzoni }}</span>
        </div>
        <div class="border-l border-black/10 pl-3">
          <span class="text-zinc-400 block uppercase text-[10px]">SEGUITI</span>
          <span class="text-zinc-950 text-base font-bold">{{ totaleSeguiti }}</span>
        </div>
      </div>

      <!-- btn -->
      <div class="space-y-2 pt-1">
        <button type="button" @click="$emit('apriModificaProfilo')"
         class="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-pixel text-xs tracking-wider uppercase rounded-2xl transition-colors cursor-pointer text-center shadow-xs">
          MODIFICA PROFILO
        </button>
        <button type="button" @click="copiaLinkProfilo"
         class="w-full py-2 rounded-2xl font-pixel text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-2 border" :class="linkCopiato ? 'bg-[#1DB954] text-white border-[#1DB954] shadow-md' : 'bg-white hover:bg-zinc-100 text-zinc-800 border-black/10'">
          <span>{{ linkCopiato ? '✓ LINK COPIATO NEGLI APPUNTI' : '↗ CONDIVIDI PROFILO' }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  datiProfilo: { type: Object, required: true },
  totaleCanzoni: { type: Number, default: 0 },
  totaleSeguiti: { type: Number, default: 0 },
  haBadgeVol1: { type: Boolean, default: false }
})

defineEmits(['apriModificaProfilo'])

const listaVociMenu = [
  { etichetta: 'HOME', percorso: '/', classeSfondo: 'bg-green-mag', classeTesto: 'text-green-mag' },
  { etichetta: 'GLOSSARIO', percorso: '/glossario', classeSfondo: 'bg-[#F59B45]', classeTesto: 'text-[#F59B45]' },
  { etichetta: 'MAGAZINE', percorso: '/magazine', classeSfondo: 'bg-red-mag', classeTesto: 'text-red-mag' },
  { etichetta: 'SOCIAL', percorso: '/social', classeSfondo: 'bg-[#36BDEE]', classeTesto: 'text-[#36BDEE]' }
]

const linkCopiato = ref(false)

const copiaLinkProfilo = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    linkCopiato.value = true
    setTimeout(() => { linkCopiato.value = false }, 2500)
  } catch (errore) {
    linkCopiato.value = false
  }
}
</script>
