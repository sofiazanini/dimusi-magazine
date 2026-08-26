<template>
  <form @submit.prevent="submitForm" class="bg-white border border-black/10 rounded-2xl p-6 md:p-8 space-y-6 text-left shadow-xl">
    
    <div class="border-b border-black/10 pb-4 flex items-center justify-between">
      <div class="space-y-1">
        <span class="font-pixel text-xs text-red-mag uppercase tracking-widest">[ NUOVA REGISTRAZIONE ]</span>
        <h3 class="font-pixel text-xl text-zinc-950 uppercase">Archivia una Zidrise</h3>
      </div>
      <button 
        type="button" 
        @click="$emit('cancel')" 
        class="font-pixel text-xs text-zinc-400 hover:text-zinc-950 uppercase cursor-pointer"
      >
        [ CHIUDI ✕ ]
      </button>
    </div>

    <!-- ricerca traccia & fetch cover automatica -->
    <div class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="font-pixel text-xs text-zinc-500 uppercase block">TITOLO BRANO *</label>
          <input 
            v-model="form.title" 
            type="text" 
            required
            placeholder="Es. Reckoner" 
            class="w-full px-4 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm text-zinc-900 focus:outline-hidden focus:border-red-mag"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-pixel text-xs text-zinc-500 uppercase block">ARTISTA *</label>
          <input 
            v-model="form.artist" 
            type="text" 
            required
            placeholder="Es. Radiohead" 
            class="w-full px-4 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm text-zinc-900 focus:outline-hidden focus:border-red-mag"
          />
        </div>
      </div>

      <!-- pulsante recupero automatico cover via API -->
      <div class="flex items-center gap-3">
        <button 
          type="button" 
          @click="fetchCoverFromAPI" 
          :disabled="isSearching || !form.title"
          class="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-pixel text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
        >
          {{ isSearching ? 'RECUPERO COVER IN CORSO...' : '⚡ CERCA COVER UFFICIALE' }}
        </button>
        <span v-if="coverPreview" class="font-pixel text-xs text-green-mag">✓ COVER TROVATA</span>
      </div>

      <!-- anteprima della cover trovata -->
      <div v-if="coverPreview" class="flex items-center gap-4 p-3 bg-zinc-50 rounded-xl border border-black/5">
        <img :src="coverPreview" alt="Anteprima Cover" class="w-14 h-14 rounded-lg object-cover shadow-sm"/>
        <div class="space-y-0.5 font-pixel text-xs text-zinc-600">
          <p class="text-zinc-950 font-semibold">{{ form.title }} — {{ form.artist }}</p>
          <p class="text-zinc-400">Artwork sincronizzato in alta risoluzione</p>
        </div>
      </div>
    </div>

    <!-- archetipo e volume collegato -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="space-y-1.5">
        <label class="font-pixel text-xs text-zinc-500 uppercase block">ARCHETIPO CONCETTUALE</label>
        <select 
          v-model="form.archetype" 
          class="w-full px-4 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-pixel text-xs text-zinc-900 focus:outline-hidden focus:border-red-mag"
        >
          <option value="Apollineo">APOLLINEO (Ordine / Forma)</option>
          <option value="Dionisiaco">DIONISIACO (Estasi / Caos)</option>
          <option value="Ibrido">IBRIDO (Sospensione)</option>
          <option value="Catartico">CATARTICO (Liberazione)</option>
        </select>
      </div>

      <div class="space-y-1.5">
        <label class="font-pixel text-xs text-zinc-500 uppercase block">COLLEGAMENTO VOLUME</label>
        <select 
          v-model="form.volume" 
          class="w-full px-4 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-pixel text-xs text-zinc-900 focus:outline-hidden focus:border-red-mag"
        >
          <option value="Vol. 01">VOL. 01 — Dove il velo si lacera</option>
          <option value="Nessuno">NESSUN VOLUME DIRETTO</option>
        </select>
      </div>
    </div>

    <!-- arkelo (memoria / risonanza) -->
    <div class="space-y-1.5">
      <label class="font-pixel text-xs text-zinc-500 uppercase block">
        ARKELO // COSA HA PORTATO ALLA MENTE? *
      </label>
      <textarea 
        v-model="form.arkelo" 
        rows="3" 
        required
        placeholder="Descrivi l'immagine, il ricordo o il pensiero riaffiorato durante l'ascolto..." 
        class="w-full px-4 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm text-zinc-900 focus:outline-hidden focus:border-red-mag"
      ></textarea>
    </div>

    <!-- sensazioni provate -->
    <div class="space-y-1.5">
      <label class="font-pixel text-xs text-zinc-500 uppercase block">
        SENSAZIONI & VERTIGINI PROVATE *
      </label>
      <input 
        v-model="form.feelings" 
        type="text" 
        required
        placeholder="Es. Senso di galleggiamento, brivido al minuto 2:14..." 
        class="w-full px-4 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm text-zinc-900 focus:outline-hidden focus:border-red-mag"
      />
    </div>

    <!-- bottoni azione -->
    <div class="flex items-center justify-end gap-3 pt-2">
      <button 
        type="button" 
        @click="$emit('cancel')" 
        class="px-5 py-2.5 font-pixel text-xs text-zinc-500 hover:text-zinc-950 uppercase cursor-pointer"
      >
        Annulla
      </button>
      <button 
        type="submit" 
        class="px-6 py-2.5 bg-red-mag text-white font-pixel text-xs tracking-widest uppercase rounded-full hover:bg-zinc-950 transition-colors cursor-pointer shadow-md"
      >
        SALVA NELL'ARCHIVIO →
      </button>
    </div>

  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['save', 'cancel'])

const isSearching = ref(false)
const coverPreview = ref('')
const previewAudioUrl = ref('')

const form = reactive({
  title: '',
  artist: '',
  archetype: 'Apollineo',
  volume: 'Vol. 01',
  arkelo: '',
  feelings: ''
})

// Chiamata all'API pubblica musicale di iTunes
const fetchCoverFromAPI = async () => {
  if (!form.title) return
  isSearching.value = true
  try {
    const query = encodeURIComponent(`${form.title} ${form.artist}`)
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=1`)
    const data = await res.json()
    if (data.results && data.results.length > 0) {
      const track = data.results[0]
      // Trasforma la miniatura 100x100 in copertina HD 600x600
      coverPreview.value = track.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg')
      previewAudioUrl.value = track.previewUrl || ''
    } else {
      // Fallback a copertina placeholder stilizzata se il brano non viene trovato
      coverPreview.value = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80'
    }
  } catch (error) {
    coverPreview.value = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80'
  } finally {
    isSearching.value = false
  }
}

const submitForm = () => {
  emit('save', {
    ...form,
    cover: coverPreview.value || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioPreview: previewAudioUrl.value,
    id: Date.now(),
    author: 'Sofia Zanini',
    isMine: true,
    date: new Date().toLocaleDateString('it-IT')
  })
}
</script>
