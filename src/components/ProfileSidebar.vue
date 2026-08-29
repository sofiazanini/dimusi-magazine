<template>
  <div class="w-full md:w-88 lg:w-90 shrink-0 select-none">
    <!-- menu chiuso mobile -->
    <header @click="apertoMobile = !apertoMobile" class="md:hidden fixed top-3 inset-x-4 z-40 flex items-center justify-between bg-zinc-50 border border-black/20 rounded-2xl p-3 shadow-xl backdrop-blur-md bg-zinc-50/95">
      <div class="flex items-center gap-2.5 min-w-0">
        <img :src="datiProfilo.avatar" :alt="datiProfilo.nome" class="w-10 h-10 rounded-md object-cover border border-black/70 shrink-0" />
        <div class="min-w-0">
          <p class="font-pixel text-base text-zinc-950 truncate tracking-tighter">{{ datiProfilo.nome }}</p>
          <p class="font-clash text-sm text-zinc-400 truncate leading-none">{{ datiProfilo.username }}</p>
        </div>
      </div>
      <button type="button" class="text-red-mag font-pixel text-lg tracking-wider uppercase rounded-md shrink-0 text-center w-10 h-10">
        {{ apertoMobile ? '✕' : '☰' }}
      </button>
      <div class="absolute inset-0 pointer-events-none z-10 opacity-20 mix-blend-multiply rounded-2xl" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIj48ZmlsdGVy idD0ibj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9ImEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg=='); background-repeat: repeat;"></div>
    </header>

    <!-- Spaziatore per evitare che il contenuto sotto finisca sotto la barra fissa -->
    <div class="md:hidden h-20 w-full"></div>
       
    <!-- overlay quando il menu è aperto -->
    <div v-if="apertoMobile" class="md:hidden fixed inset-0 z-40 bg-black/20 transition-opacity" @click="apertoMobile = false"></div>
    <!-- menu aperto mobile -->
    <div v-if="apertoMobile" class="md:hidden gap-5 fixed inset-x-4 top-3 z-50 bg-zinc-50 border border-black/20 p-4 flex flex-col rounded-2xl shadow-xl">  
      <div class="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-multiply rounded-2xl" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg=='); background-repeat: repeat;"></div>
      <div class="flex flex-row justify-between">
        <button type="button" @click="$emit('apriModificaProfilo'); apertoMobile = false" class="px-2 my-2 border leading-none border-red-mag text-red-mag font-pixel text-xs uppercase rounded-md cursor-pointer">
          MODIFICA PROFILO
        </button>
        <button type="button" @click="apertoMobile = false" class="text-red-mag font-pixel text-base tracking-wider uppercase rounded-md shrink-0 text-center w-10 h-10">
          ✕
        </button>
      </div>
      
      <!-- profilo mobile -->
      <div class="space-y-3">
        <div class="flex items-start gap-3">
          <img :src="datiProfilo.avatar" class="w-25 aspect-square rounded-xl object-cover border border-black/70 shadow-xs shrink-0" />
          <div class="pt-1 flex flex-col items-start gap-1">
            <h3 class="font-pixel text-2xl text-zinc-950 leading-none tracking-tight">{{ datiProfilo.nome }}</h3>
            <p class="font-clash text-base text-zinc-400 leading-none pb-2">{{ datiProfilo.username }}</p>
            <p class="font-clash text-sm text-zinc-600 leading-tight tracking-wide">{{ datiProfilo.bio }}</p>
          </div>
        </div>
      </div>
      
      <!-- affinità mobile -->
      <div v-if="affinitaSettimanale" @click="$emit('apriProfiloAffine', affinitaSettimanale); apertoMobile = false" class="space-y-3">
        <div class="space-y-3 bg-zinc-100 border border-black/10 rounded-2xl p-3">
          <div class="flex items-center gap-3">
            <img :src="affinitaSettimanale.avatar" class="w-12 h-12 rounded-lg object-cover border border-black/10 shrink-0" />
            <div class="min-w-0 flex-1">
              <h4 class="font-pixel text-base text-zinc-950 truncate leading-tight">{{ affinitaSettimanale.nome }}</h4>
              <span class="font-pixel text-xs text-red-mag uppercase">{{ affinitaSettimanale.risonanza }} affinità settimanale</span>
            </div>
            <p class="text-zinc-900 pr-3 font-pixel text-xl rounded-lg transition-all text-center"> → </p>
          </div>
        </div>
      </div>
      
      <!-- Navigazione Magazine Mobile -->
      <div class="relative bg-zinc-50 border border-black/10 rounded-2xl overflow-hidden select-none">
        <nav class="relative z-20 flex flex-col">
          <div v-for="voce in listaVociMenu" :key="voce.etichetta" class="relative border-b border-black/10 last:border-b-0 group overflow-hidden">
            <div class="absolute inset-0 transition-transform duration-200 ease-out origin-left pointer-events-none"
            :class="[voce.classeSfondo, voce.percorso === '/social' ? 'scale-x-100 opacity-90' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100']"></div>
            
            <router-link :to="voce.percorso" @click="apertoMobile = false" class="relative z-10 flex items-center justify-between px-6 py-4.5 no-underline cursor-pointer transition-transform duration-150 group-hover:translate-x-2">
              <span class="font-pixel text-3xl sm:text-4xl md:text-3xl leading-none tracking-tight transition-colors duration-150"
              :class="[voce.classeTesto, voce.percorso === '/social' ? 'text-white!' : 'group-hover:text-white! group-active:text-white!']">
              {{ voce.etichetta }}</span>
              
              <span class="font-pixel text-xl sm:text-2xl md:text-lg text-white transition-all duration-150" :class="voce.percorso === '/social' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'"> → </span>
            </router-link>
          </div>
        </nav>
      </div>
      <p class="font-pixel text-sm text-zinc-300 text-center"> – Dimusi Magazine – </p>
    </div>
  
    <!-- desktop tablet -->
    <aside class="hidden md:flex flex-col gap-5 text-left w-full md:sticky md:top-6">
      
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
                
                <span class="font-pixel text-xl sm:text-2xl md:text-lg text-white transition-all duration-150" 
                 :class="voce.percorso === '/social' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'">→</span>
              </router-link>
          </div>
        </nav>
      </div>

      <!-- profilo -->
      <div class="border border-black/15 rounded-3xl p-6 space-y-4 transition-all duration-300 relative overflow-hidden bg-zinc-50" :class="haBadgeVol1 ? 'bg-red-mag/5 border-red-mag/30' : 'bg-zinc-50'">
        <div class="flex items-start gap-4">
          <div class="relative w-24 h-24 shrink-0">
            <img :src="datiProfilo.avatar" :alt="datiProfilo.nome" class="w-full h-full object-cover rounded-2xl border border-zinc-950 shadow-2xs" />
            <div v-if="haBadgeVol1" class="absolute -top-2 -right-2 bg-zinc-50 border border-red-mag text-red-mag font-pixel text-[9px] px-1.5 py-0.5 rounded-md shadow-sm rotate-12 uppercase">
              ★ VOL.01
            </div>
          </div>
          
          <div class="min-w-0 flex-1 pt-1 flex flex-col items-start gap-1">
            <h3 class="font-pixel text-xl text-zinc-950 leading-none tracking-tight">{{ datiProfilo.nome }}</h3>
            <p class="font-clash text-base text-zinc-400 leading-none pb-2">{{ datiProfilo.username }}</p>
            <p class="font-clash text-sm text-zinc-600 leading-tight tracking-wide">{{ datiProfilo.bio }}</p>
          </div>
        </div>

        <button type="button" @click="$emit('apriModificaProfilo')" 
         class="w-full py-2.5 border border-red-mag bg-transparent hover:bg-red-mag text-red-mag hover:text-white font-pixel text-xs tracking-widest uppercase rounded-xl transition-colors cursor-pointer text-center">
         MODIFICA PROFILO
        </button>
      </div>

      <!-- affinità desktop -->
      <div v-if="affinitaSettimanale" @click="$emit('apriProfiloAffine', affinitaSettimanale)" class="flex flex-col gap-3 mt-3">
        <span class="font-pixel text-xs text-zinc-400 uppercase tracking-widest">[ AFFINITÀ SETTIMANALE ]</span>
        <div class="flex items-center gap-3 bg-zinc-50 border border-black/10 rounded-2xl p-3">
          <img :src="affinitaSettimanale.avatar" class="w-12 h-12 rounded-xl object-cover border border-black/10 shrink-0" />
          <div class="min-w-0 flex-1">
            <h4 class="font-pixel text-sm text-zinc-950 truncate leading-none">{{ affinitaSettimanale.nome }}</h4>
            <span class="font-pixel text-xs text-red-mag uppercase">{{ affinitaSettimanale.risonanza }} RISONANZA</span>
          </div>
          <span class="font-pixel text-lg text-zinc-900 pr-3">→</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

defineProps({
  datiProfilo: { type: Object, required: true },
  haBadgeVol1: { type: Boolean, default: false },
  affinitaSettimanale: { type: Object, default: null }
})

defineEmits(['apriModificaProfilo', 'apriProfiloAffine'])

const apertoMobile = ref(false)

const listaVociMenu = [
{ etichetta: 'HOME', percorso: '/', classeSfondo: 'bg-green-mag', classeTesto: 'text-green-mag' },
{ etichetta: 'GLOSSARIO', percorso: '/glossario', classeSfondo: 'bg-[#F59B45]', classeTesto: 'text-[#F59B45]' },
{ etichetta: 'MAGAZINE', percorso: '/magazine', classeSfondo: 'bg-red-mag', classeTesto: 'text-red-mag' },
{ etichetta: 'SOCIAL', percorso: '/social', classeSfondo: 'bg-[#36BDEE]', classeTesto: 'text-[#36BDEE]' }
]
</script>