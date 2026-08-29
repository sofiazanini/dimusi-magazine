<template>
  <div class="w-full min-h-screen bg-white text-zinc-950 p-4 sm:p-6 lg:p-10 flex flex-col justify-between">
    
    <!-- Contenitore principale con self-start per permettere lo sticky -->
    <div class="w-full flex flex-col md:flex-row items-start gap-6 lg:gap-10 flex-1 max-w-7xl mx-auto">
      
      <ProfileSidebar
        class="w-full md:w-88 lg:w-90 md:sticky md:top-6 shrink-0"
        :dati-profilo="datiProfilo"
        :ha-badge-vol1="haBadgeVol1"
        :affinita-settimanale="affinitaSettimanale"
        @apri-modifica-profilo="mostraModaleProfilo = true"
        @apri-profilo-affine="utenteAffineAperto = $event"
      />
    
      <!-- Diario e Controlli -->
      <main class="flex-1 w-full space-y-6 text-left min-w-0">

        <!-- Filtri e Ricerca -->
        <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
          <p class="font-pixel pt-2 text-xs text-zinc-400 uppercase tracking-widest">[ ARCHVIO ]</p>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <input
              v-model="testoRicerca"
              type="text"
              placeholder="CERCA NEL DIARIO..."
              class="px-4 py-2 bg-zinc-100 rounded-full font-pixel text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:bg-zinc-200 uppercase flex-1 sm:w-60"/>
            <button
              type="button"
              @click="apriModaleCreazione"
              class="px-4 py-2 bg-red-mag hover:bg-zinc-950 text-white font-pixel text-xs tracking-widest uppercase rounded-full cursor-pointer shadow-md shrink-0 transition-colors">
              + NUOVA ZIDRISA
            </button>
          </div>
        </header>

        <!-- Filtri Rapidi -->
        <div class="flex flex-wrap items-center gap-2 font-pixel text-[10px] uppercase">
          <div class="flex items-center gap-1 bg-zinc-50 p-1 rounded-xl border border-black/5">
            <button
              v-for="arc in ['TUTTI', 'Apollineo', 'Dionisiaco']"
              :key="arc"
              type="button"
              @click="filtroArchetipo = arc"
              class="px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              :class="filtroArchetipo === arc ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-zinc-950'">
              {{ arc }}
            </button>
          </div>

          <div class="flex items-center gap-1 bg-zinc-50 p-1 rounded-xl border border-black/5">
            <button
              v-for="t in ['TUTTI', 'Canzone', 'Album']"
              :key="t"
              type="button"
              @click="filtroTipo = t"
              class="px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              :class="filtroTipo === t ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-zinc-950'">
              {{ t }}
            </button>
          </div>

          <button
            v-if="filtroTagAttivo"
            type="button"
            @click="filtroTagAttivo = ''"
            class="px-2.5 py-1.5 rounded-xl bg-red-mag/10 text-red-mag border border-red-mag/20 flex items-center gap-1.5 cursor-pointer">
            <span>TAG: {{ filtroTagAttivo }}</span>
            <span class="font-bold">✕</span>
          </button>
        </div>

        <!-- Timeline Sequenziale -->
        <DiarioTimeline
          :canzoni="mieCanzoniFiltrate"
          @seleziona="canzoneSelezionata = $event"
          @seleziona-tag="filtroTagAttivo = $event"/>
      </main>
    </div>

    <!-- Drawer Affinità Elettiva -->
    <div v-if="utenteAffineAperto" class="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex justify-end p-4 sm:p-6" @click.self="utenteAffineAperto = null">
      <div class="w-full max-w-xl bg-white h-full p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between rounded-2xl">
        <div class="space-y-5">
          <div>
            <div class="flex items-center justify-between">
              <div class="flex flex-row gap-3 items-center">
                <img :src="affinitaSettimanale.avatar" class="w-20 h-20 rounded-xl object-cover border border-black/10 shrink-0" />
                <div>
                  <p class="font-pixel text-base sm:text-2xl text-zinc-950 mt-2">{{ utenteAffineAperto.nome }}</p>
                  <p class="font-clash text-sm text-zinc-400 leading-relaxed">{{ utenteAffineAperto.username }}</p>
                  <p class="font-pixel text-xs text-red-mag uppercase">{{ utenteAffineAperto.risonanza }} risonanza</p>
                </div>
              </div>
              <button type="button" @click="utenteAffineAperto = null" class="font-pixel text-xs px-3 py-1 bg-zinc-100 rounded-full cursor-pointer">CHIUDI ✕</button>
            </div>
            <p class="font-clash text-sm text-zinc-600 leading-tight tracking-wide italic py-3">{{ utenteAffineAperto.bio }}</p>
            <div class="px-5 py-3 border border-zinc-200 rounded-2xl">
              <p class="font-clash text-sm text-zinc-400">{{ utenteAffineAperto.notaRisonanza }}</p>
            </div>
          </div>
          <DiarioTimeline :canzoni="utenteAffineAperto.canzoni" :is-read-only="true" :is-compact="true" @seleziona="canzoneSelezionata = $event" />
        </div>
      </div>
    </div>

    <!-- Modali Standard -->
    <ZidriseDetailModal v-if="canzoneSelezionata" :canzone="canzoneSelezionata" @chiudi="canzoneSelezionata = null" @modifica="apriModaleModifica" @elimina="eliminaCanzone" />
    <ZidriseModal v-if="mostraModale" :sta-modificando="staModificando" :dati-iniziali="datiCanzoneInModifica" @salva="salvaCanzone" @chiudi="mostraModale = false" />
    <ProfileEditModal v-if="mostraModaleProfilo" :dati-attuali="datiProfilo" @salva="salvaDatiProfilo" @chiudi="mostraModaleProfilo = false" />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import ProfileEditModal from '../components/ProfileEditModal.vue'
import ZidriseModal from '../components/ZidriseModal.vue'
import ZidriseDetailModal from '../components/ZidriseDetailModal.vue'
import DiarioTimeline from '../components/DiarioTimeline.vue'
import { mieCanzoniIniziali } from '../data/canzoniData.js'
import ImgProfilo from '../assets/social-profilo.webp'

const CHIAVE_STORAGE = 'dimusi_mie_zidrise'
const testoRicerca = ref('')
const filtroArchetipo = ref('TUTTI')
const filtroTipo = ref('TUTTI')
const filtroTagAttivo = ref('')

const mostraModale = ref(false)
const mostraModaleProfilo = ref(false)
const staModificando = ref(false)
const idInModifica = ref(null)
const datiCanzoneInModifica = ref({})
const canzoneSelezionata = ref(null)
const haBadgeVol1 = ref(false)
const utenteAffineAperto = ref(null)

const datiProfilo = ref({
  nome: 'Sofia Zanini',
  username: '@sofiazanini',
  bio: "Literally, this is the reason why ears were invented 🌈",
  avatar: ImgProfilo
})

const affinitaSettimanale = ref({
  nome: 'Elena Riva',
  username: '@elenariva',
  avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  risonanza: '94%',
  notaRisonanza: 'Avete registrato entrambi un arkèlo dionisiaco durante l\'ascolto notturno di Ditonellapiaga.',
  bio: 'In cerca di melodie che dissolvono il confine tra veglia e trance sonora.',
  canzoni: [
    {
      id: 101,
      titolo: 'Pazza di te',
      artista: 'Ditonellapiaga',
      archetipo: 'Dionisiaco',
      tipo: 'Canzone',
      tags: ['#notturno', '#catarsi'],
      data: '22.08.2026',
      cover: 'https://i.scdn.co/image/ab67616d0000e1a3e558ef906fbb726e274a9f43',
      arkelo: 'Un battito viscerale che azzera ogni pensiero razionale fino alle prime luci dell\'alba.'
    }
  ]
  
})

const mieCanzoni = ref(mieCanzoniIniziali)

const mieCanzoniFiltrate = computed(() => {
  return mieCanzoni.value.filter(c => {
    const q = testoRicerca.value.trim().toLowerCase()
    const matchTesto = !q || (
      c.titolo?.toLowerCase().includes(q) || 
      c.artista?.toLowerCase().includes(q) || 
      c.arkelo?.toLowerCase().includes(q) 
    )
    const matchArchetipo = filtroArchetipo.value === 'TUTTI' || c.archetipo?.toLowerCase() === filtroArchetipo.value.toLowerCase()
    const matchTipo = filtroTipo.value === 'TUTTI' || c.tipo?.toLowerCase() === filtroTipo.value.toLowerCase()
    const matchTag = !filtroTagAttivo.value || (c.tags && c.tags.some(t => t.toLowerCase() === filtroTagAttivo.value.toLowerCase()))
    
    return matchTesto && matchArchetipo && matchTipo && matchTag
  })
})

onMounted(() => {
  haBadgeVol1.value = localStorage.getItem('dimusi_vol01_badge') === 'true'
  const canzoniSalvate = localStorage.getItem(CHIAVE_STORAGE)
  if (canzoniSalvate) {
    try { mieCanzoni.value = JSON.parse(canzoniSalvate) } catch (e) { mieCanzoni.value = mieCanzoniIniziali }
  }
})

const apriModaleCreazione = () => {
  staModificando.value = false
  idInModifica.value = null
  datiCanzoneInModifica.value = { titolo: '', artista: '', archetipo: 'Dionisiaco', volume: 'Vol. 01', arkelo: '', tipo: 'Canzone', tags: [], cover: '' }
  mostraModale.value = true
}

const apriModaleModifica = (canzone) => {
  staModificando.value = true
  idInModifica.value = canzone.id
  datiCanzoneInModifica.value = { ...canzone }
  canzoneSelezionata.value = null
  mostraModale.value = true
}

const eliminaCanzone = (id) => {
  if (confirm('Vuoi rimuovere questo frammento dal tuo diario?')) {
    mieCanzoni.value = mieCanzoni.value.filter(c => c.id !== id)
    localStorage.setItem(CHIAVE_STORAGE, JSON.stringify(mieCanzoni.value))
    canzoneSelezionata.value = null
  }
}

const salvaCanzone = (datiForm) => {
  if (staModificando.value) {
    const idx = mieCanzoni.value.findIndex(c => c.id === idInModifica.value)
    if (idx !== -1) mieCanzoni.value[idx] = { ...mieCanzoni.value[idx], ...datiForm }
  } else {
    mieCanzoni.value.unshift({ ...datiForm, id: Date.now(), data: new Date().toLocaleDateString('it-IT') })
  }
  localStorage.setItem(CHIAVE_STORAGE, JSON.stringify(mieCanzoni.value))
  mostraModale.value = false
}

const salvaDatiProfilo = (nuoviDati) => {
  datiProfilo.value = { ...nuoviDati }
  mostraModaleProfilo.value = false
}
</script>