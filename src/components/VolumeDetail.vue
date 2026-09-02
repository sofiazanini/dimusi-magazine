<template>
  <div class="relative w-full min-h-screen bg-white text-zinc-950 p-6 md:p-12 lg:p-20">
    <Navbar />
    
    <!-- indietro -->
    <router-link to="/magazine" class="fixed z-40 top-6 left-6 md:top-8 md:left-12 group flex items-center gap-2 px-4.5 py-2.5 bg-zinc-950 text-white hover:bg-zinc-800 transition-all duration-200 cursor-pointer select-none border border-white/15 shadow-xl rounded-full no-underline">
      <p class="font-pixel text-xs md:text-xs tracking-widest text-zinc-300 group-hover:text-white transition-colors duration-150 uppercase">← INDIETRO</p>
    </router-link>
    
    <!-- volume -->
    <main class="max-w-7xl mx-auto pt-16 md:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      <!-- cover -->
      <div class="lg:col-span-5 flex flex-col items-center space-y-4">
        <div class="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-2xl bg-zinc-950 border border-black/10 transition-transform duration-500 hover:scale-102 hover:-rotate-1">
          <img :src="coverVol1" alt="Dimusi Vol. 01 - Dove il velo si lacera" class="w-full h-full object-cover scale-102"/>
        </div>
      </div>
      
      <!-- info -->
      <div class="lg:col-span-7 flex flex-col space-y-8 max-w-xl">
        <div class="space-y-3 max-w-md">
          <div class="flex items-center gap-3 font-pixel text-xs">
            <p class="text-red-mag uppercase tracking-widest">[ VOLUME 01 ]</p> <p class="text-zinc-400">///</p> <p class="text-zinc-500 uppercase">10 OTTOBRE 2026</p>
          </div>
          
          <h1 class="font-pixel text-3xl sm:text-5xl md:text-6xl text-zinc-950 leading-tight tracking-tight ">
            Dove il velo <span class="text-red-mag">si lacera</span>.
          </h1>
        </div>
        
        <!-- archetipo -->
        <div class="space-y-2 bg-zinc-50 border border-black/5 p-5 rounded-xl">
          <span class="font-pixel text-xs text-zinc-400 tracking-wider uppercase block">ARCHETIPO</span>
          <p class="font-clash text-xl md:text-2xl text-zinc-900 font-medium">
            Apollineo e Dionisiaco
          </p>
        </div>
        
        <!-- descrizione -->
        <div class="space-y-3">
          <p class="font-clash text-base sm:text-lg text-zinc-700">
            Il primo numero di Dimusi indaga la tensione costante tra l'ordine formale della struttura musicale e l'estasi caotica che travolge l'ascoltatore. Il volume esplora come gli artisti contemporanei riattivano il sacro e l'ossessione musicale.
          </p>
        </div>
        
        <div class="border-t border-black/10 pt-6 space-y-4">
          <div class="space-y-1">
            <span class="font-pixel text-xs text-red-mag tracking-widest uppercase block">[ CONTENUTI ESCLUSIVI ]</span>
            <p class="font-pixel text-sm text-zinc-600">
              Inserisci il codice univoco per sbloccare altri contenuti.
            </p>
          </div>
          
          <!-- input codice / sblocco -->
          <div v-if="!isUnlocked" class="flex flex-col sm:flex-row gap-3 pt-1">
            <input v-model="unlockCode" type="text" placeholder="INSERISCI IL CODICE QR/PASS..." 
            class="flex-1 px-4 py-3 bg-zinc-50 border border-black/15 rounded-xl font-pixel text-xs tracking-wider uppercase text-zinc-900 focus:outline-hidden focus:border-red-mag"/>
            
            <button type="button" @click="handleUnlock" 
            class="px-6 py-3 bg-red-mag text-white font-pixel text-xs tracking-widest uppercase rounded-xl hover:bg-zinc-950 transition-colors cursor-pointer shadow-md shrink-0">
            SBLOCCA ORA →
            </button>
          </div>
          
          <!-- stato sbloccato -->
          <div v-else class="p-4 bg-green-mag/10 border border-green-mag/30 rounded-xl space-y-1">
            <p class="font-pixel text-xs text-green-mag uppercase font-semibold">✓ VOLUME 01 SBLOCCATO CON SUCCESSO</p>
            <p class="font-clash text-sm text-zinc-700">Il badge esclusivo è stato sincronizzato con la tua scheda profilo.</p>
          </div>
        </div>
        
        <!-- playlist -->
        <div class="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16">
          <div class="space-y-1">
            <span class="font-pixel text-xs text-zinc-400 tracking-wider uppercase block">SOUNDTRACK</span>
            <p class="font-clash text-sm text-zinc-800">Ascolta la selezione di tracce analizzate nel numero.</p>
          </div>
          
          <a href="https://open.spotify.com/playlist/1MJIwNwj8vybaHPgojPWEq?si=fbd40375b6844632" target="_blank" rel="noopener noreferrer"
            class="w-fit self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 text-white font-pixel text-xs tracking-widest uppercase rounded-full hover:bg-zinc-800 transition-colors shrink-0 shadow-sm">PLAYLIST UFFICIALE ↗
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import coverVol1 from '../assets/cover-volume-1.webp'

const isUnlocked = ref(false)
const unlockCode = ref('')

const handleUnlock = () => {
  if (unlockCode.value.trim().length > 0) {
    isUnlocked.value = true
    localStorage.setItem('dimusi_vol01_badge', 'true')
  }
}
</script>