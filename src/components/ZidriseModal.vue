  <template> <!-- NUOVA ZIDRISA --> 
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs" @click.self="$emit('chiudi')">
      <div class="bg-white border border-black/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 text-left shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <!-- chiudi -->
        <button type="button" @click="$emit('chiudi')" class="absolute top-5 right-5 font-pixel text-xs px-3 py-1 bg-zinc-100 rounded-full cursor-pointer">CHIUDI ✕</button>
        
        <!-- testata -->
        <div class="space-y-1 border-b border-black/10 pb-3">
          <span class="font-pixel text-xs text-red-mag uppercase">[ {{ staModificando ? 'MODIFICA REGISTRAZIONE' : 'NUOVA REGISTRAZIONE' }} ]</span>
          <h2 class="font-pixel text-2xl text-zinc-950 uppercase">{{ staModificando ? 'Aggiorna Zidrisa' : 'Archivia una Zidrisa' }}</h2>
        </div>
        
        <form @submit.prevent="inviaForm" class="space-y-4">
          
          <!-- ricerca live spotify -->
          <div class="space-y-1 relative">
            <label class="font-pixel text-xs text-zinc-500 uppercase flex items-center justify-between">
              <span>CERCA BRANO SU SPOTIFY *</span>
              <span v-if="staCercando" class="text-[#1DB954] text-[10px] animate-pulse font-bold">RICERCA SU SPOTIFY...</span>
            </label>
            
            <input 
            v-model="modulo.titolo" 
            @input="gestisciInputRicerca"
            type="text" 
            required 
            placeholder="Digita il titolo (es. Birds of a feather, Starless...)" 
            class="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm focus:outline-hidden focus:border-red-mag"
            />
            
            <!-- tendina risultati -->
            <div 
            v-if="suggerimenti.length > 0 && mostraTendina" 
            class="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
            >
            <div 
            v-for="suggerimento in suggerimenti" 
            :key="suggerimento.id"
            @click="selezionaSuggerimento(suggerimento)"
            class="flex items-center gap-3 p-3 hover:bg-zinc-50 cursor-pointer border-b border-black/5 last:border-b-0 transition-colors"
            >
            <img :src="suggerimento.cover" alt="Cover" class="w-11 h-11 rounded-lg object-cover shrink-0 border border-black/10" />
            <div class="overflow-hidden">
              <h4 class="font-pixel text-xs text-zinc-950 truncate uppercase">{{ suggerimento.titolo }}</h4>
              <p class="font-clash text-xs text-zinc-500 truncate">{{ suggerimento.artista }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- artista -->
      <div class="space-y-1">
        <label class="font-pixel text-xs text-zinc-500 uppercase">ARTISTA *</label>
        <input v-model="modulo.artista" type="text" required placeholder="Es. Billie Eilish" class="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm focus:outline-hidden focus:border-red-mag"/>
      </div>
      
      <!-- anteprima cover -->
      <div v-if="modulo.cover" class="flex items-center gap-3 p-2.5 bg-zinc-50 rounded-2xl border border-black/5">
        <img :src="modulo.cover" alt="Cover" class="w-14 h-14 rounded-xl object-cover border border-black/10" />
        <div class="space-y-0.5 text-left font-pixel text-xs">
          <span class="text-zinc-900 font-bold block truncate">{{ modulo.titolo }}</span>
          <span class="text-zinc-400 block truncate">{{ modulo.artista }}</span>
          <span class="text-[#1DB954] block text-[10px] font-bold">✓ COPERTINA UFFICIALE SPOTIFY</span>
        </div>
      </div>
      
      <!-- archetipo e volume -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="space-y-1">
          <label class="font-pixel text-xs text-zinc-500 uppercase">ARCHETIPO</label>
          <select v-model="modulo.archetipo" class="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-pixel text-xs">
            <option value="Apollineo">APOLLINEO</option>
            <option value="Dionisiaco">DIONISIACO</option>
            <option value="Ibrido">IBRIDO</option>
            <option value="Catartico">CATARTICO</option>
          </select>
        </div>
        <div class="space-y-1">
          <label class="font-pixel text-xs text-zinc-500 uppercase">VOLUME</label>
          <select v-model="modulo.volume" class="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-pixel text-xs">
            <option value="Vol. 01">VOL. 01 — Dove il velo si lacera</option>
            <option value="Nessuno">NESSUN VOLUME</option>
          </select>
        </div>
      </div>
      
      <!-- arkelo e sensazioni -->
      <div class="space-y-1">
        <label class="font-pixel text-xs text-zinc-500 uppercase">ARKELO *</label>
        <textarea v-model="modulo.arkelo" rows="3" required placeholder="Descrivi la memoria o le sensazioni provate..." class="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/10 rounded-xl font-clash text-sm focus:outline-hidden focus:border-red-mag"></textarea>
      </div>
      
      <!-- TAGS -->
      <div class="space-y-1">
        <label class="font-pixel text-xs text-zinc-500 uppercase">TAGS</label>
        <div class="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/10 rounded-xl flex flex-wrap items-center gap-1.5 focus-within:border-red-mag">
          <span v-for="(tag, index) in modulo.tags" :key="index"
           class="font-pixel text-[9px] px-2.5 py-1 rounded-full bg-zinc-950 text-white transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
          {{ tag }}
          <button type="button" @click="rimuoviTag(index)" class="hover:text-red-mag font-bold cursor-pointer">✕</button>
        </span>
        
        <!-- Input di digitazione inline con gestione spazio e virgola -->
        <input v-model="inputTagTemporaneo" 
        @keydown.space.prevent="aggiungiTagDaInput"
        @keydown.enter.prevent="aggiungiTagDaInput"
        @keydown.comma.prevent="aggiungiTagDaInput"
        type="text" placeholder="Scrivi e premi spazio..." 
        class="flex-1 bg-transparent border-0 font-clash text-sm focus:outline-hidden min-w-35 px-1 py-0.5"
        />
      </div>
    </div>
    
    <!-- pulsanti -->
    <div class="flex justify-end gap-3 pt-2">
      <button type="button" @click="$emit('chiudi')" class="px-4 py-2 font-pixel text-xs text-zinc-400 uppercase cursor-pointer">Annulla</button>
      <button type="submit" class="px-6 py-2.5 bg-red-mag text-white font-pixel text-xs uppercase tracking-widest rounded-full hover:bg-zinc-950 transition-colors cursor-pointer shadow-md">
        {{ staModificando ? 'SALVA MODIFICHE →' : 'SALVA →' }}
      </button>
    </div>
    
  </form>
</div>
</div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  datiIniziali: { type: Object, default: () => ({}) },
  staModificando: { type: Boolean, default: false }
})

const emit = defineEmits(['salva', 'chiudi'])

const staCercando = ref(false)
const mostraTendina = ref(false)
const suggerimenti = ref([])
const inputTagTemporaneo = ref('') // Variabile dichiarata correttamente
let timerRicerca = null

const modulo = reactive({
  titolo: '',
  artista: '',
  archetipo: 'Dionisiaco',
  volume: 'Vol. 01',
  arkelo: '',
  cover: '',
  tags: []
})

watch(() => props.datiIniziali, (nuoviDati) => {
  if (nuoviDati) {
    modulo.titolo = nuoviDati.titolo || ''
    modulo.artista = nuoviDati.artista || ''
    modulo.archetipo = nuoviDati.archetipo || 'Dionisiaco'
    modulo.volume = nouveauxDatiVolume(nuoviDati.volume)
    modulo.arkelo = nuoviDati.arkelo || ''
    modulo.cover = nuoviDati.cover || ''
    modulo.tags = Array.isArray(nuoviDati.tags) ? [...nuoviDati.tags] : []
  }
}, { immediate: true })

function nouveauxDatiVolume(val) {
  return val || 'Vol. 01'
}

const gestisciInputRicerca = () => {
  clearTimeout(timerRicerca)
  if (!modulo.titolo.trim() || modulo.titolo.length < 2) {
    suggerimenti.value = []
    mostraTendina.value = false
    return
  }

  timerRicerca = setTimeout(async () => {
    staCercando.value = true
    try {
      const risposta = await fetch(`/api/spotify?q=${encodeURIComponent(modulo.titolo.trim())}`)
      const dati = await risposta.json()
      // mappiamo i campi dell'endpoint (title, artist, cover...) su quelli usati dal form (titolo, artista, cover...)
      suggerimenti.value = (dati.tracks || []).map(t => ({
        id: t.id,
        titolo: t.title,
        artista: t.artist,
        cover: t.cover
      }))
    } catch (errore) {
      console.error('Errore ricerca Spotify:', errore)
      suggerimenti.value = []
    }
    mostraTendina.value = suggerimenti.value.length > 0
    staCercando.value = false
  }, 250)
}

const selezionaSuggerimento = (suggerimento) => {
  modulo.titolo = suggerimento.titolo
  modulo.artista = suggerimento.artista
  modulo.cover = suggerimento.cover
  mostraTendina.value = false
  suggerimenti.value = []
}

const aggiungiTagDaInput = () => {
  const valore = inputTagTemporaneo.value.trim().replace(/,/g, '')
  if (valore) {
    const tagPulito = valore.startsWith('#') ? valore : '#' + valore
    if (!modulo.tags.includes(tagPulito)) {
      modulo.tags.push(tagPulito)
    }
    inputTagTemporaneo.value = ''
  }
}

const rimuoviTag = (index) => {
  modulo.tags.splice(index, 1)
}

const inviaForm = () => {
  // Gestisce direttamente l'array di tag esistente senza .split()
  emit('salva', { 
    ...modulo, 
    tags: [...modulo.tags],
    isMine: true 
  })
}
</script>