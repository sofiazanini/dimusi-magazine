<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs" @click.self="$emit('chiudi')">
    <div class="bg-white border border-black/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 text-left shadow-2xl relative max-h-[90vh] overflow-y-auto">
      
      <!-- chiudi -->
      <button type="button" @click="$emit('chiudi')" class="absolute top-5 right-5 font-pixel text-xs px-3 py-1 bg-zinc-100 rounded-full cursor-pointer">CHIUDI ✕</button>

      <div class="space-y-1 border-b border-black/10 pb-3">
        <span class="font-pixel text-xs text-red-mag uppercase">[ PERSONALIZZAZIONE ]</span>
        <h2 class="font-pixel text-2xl text-zinc-950 uppercase">Modifica Profilo</h2>
      </div>

      <form @submit.prevent="inviaDati" class="space-y-4">
        
        <!-- nome e username -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="font-pixel text-xs text-zinc-500 uppercase">NOME E COGNOME *</label>
            <input v-model="moduloProfilo.nome" type="text" required placeholder="Es. Sofia Zanini" 
              class="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm focus:outline-hidden focus:border-red-mag"
            />
          </div>
          <div class="space-y-1">
            <label class="font-pixel text-xs text-zinc-500 uppercase">TAG / USERNAME *</label>
            <input v-model="moduloProfilo.username" type="text" required placeholder="Es. @sofiazanini" 
              class="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm focus:outline-hidden focus:border-red-mag"
            />
          </div>
        </div>

        <!-- img profilo -->
        <div class="space-y-1">
          <label class="font-pixel text-xs text-zinc-500 uppercase">FOTO PROFILO</label>
          <div class="flex flex-row gap-3">
            <input type="file" accept="image/*" @change="gestisciCaricamentoImmagine" 
              class="w-full px-3.5 py-2 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm text-zinc-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:font-pixel file:text-xs file:bg-red-mag file:text-white hover:file:bg-zinc-950 cursor-pointer"/>
            <img v-if="moduloProfilo.avatar" :src="moduloProfilo.avatar" alt="Anteprima" class="w-12 h-12 rounded-xl object-cover border border-black/10" />
          </div>
        </div>
        
        <!-- bio -->
        <div class="space-y-1">
          <label class="font-pixel text-xs text-zinc-500 uppercase">BIOGRAFIA EDITORIALE *</label>
          <textarea v-model="moduloProfilo.bio" rows="3" required placeholder="Descrivi i tuoi interessi, studi e risonanze sonore..." 
            class="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm focus:outline-hidden focus:border-red-mag"
          ></textarea>
        </div>

        <!-- btn -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('chiudi')" class="px-4 py-2 font-pixel text-xs text-zinc-400 uppercase cursor-pointer">
            Annulla
          </button>
          <button type="submit" class="px-6 py-2.5 bg-red-mag text-white font-pixel text-xs uppercase tracking-widest rounded-full hover:bg-zinc-950 transition-colors cursor-pointer shadow-md">
            SALVA PROFILO →
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  datiAttuali: { type: Object, required: true }
})

const emit = defineEmits(['salva', 'chiudi'])

const moduloProfilo = reactive({
  nome: '',
  username: '',
  bio: '',
  avatar: ''
})

watch(() => props.datiAttuali, (nuoviDati) => {
  if (nuoviDati) {
    moduloProfilo.nome = nuoviDati.nome || ''
    moduloProfilo.username = nuoviDati.username || ''
    moduloProfilo.bio = nuoviDati.bio || ''
    moduloProfilo.avatar = nuoviDati.avatar || ''
  }
}, { immediate: true })

const inviaDati = () => {
  emit('salva', { ...moduloProfilo })
}
</script>
