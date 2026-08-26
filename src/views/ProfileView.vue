<template>
  <div class="relative w-full min-h-screen bg-white text-zinc-950 p-4 sm:p-6 md:p-8 flex flex-col justify-between select-none overflow-x-hidden">
    <div class="w-full my-auto flex flex-col md:flex-row items-start gap-8 lg:gap-10 flex-1">

      <!-- sidebar -->
      <ProfileSidebar 
        :dati-profilo="datiProfilo" 
        :totale-canzoni="mieCanzoni.length" 
        :totale-seguiti="utentiSeguiti.length" 
        :ha-badge-vol1="haBadgeVol1" 
        @apri-modifica-profilo="mostraModaleProfilo = true" 
      />

      <!-- contenuti -->
      <main class="flex-1 w-full space-y-6 text-left">
        
        <!-- comandi -->
        <header v-if="!utenteIspezionato" class="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 font-pixel text-xs">
          <div class="flex items-center gap-2 sm:gap-3">
            <button type="button" @click="schedaAttiva = 'mie'" class="px-4 py-2 rounded-full uppercase cursor-pointer transition-all" 
              :class="schedaAttiva === 'mie' ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'">ARCHIVIO</button>
            <button type="button" @click="schedaAttiva = 'seguiti'" class="px-4 py-2 rounded-full uppercase cursor-pointer transition-all" 
              :class="schedaAttiva === 'seguiti' ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'">SEGUITI</button>
            <button type="button" @click="schedaAttiva = 'consigliati'" class="px-4 py-2 rounded-full uppercase cursor-pointer transition-all" 
              :class="schedaAttiva === 'consigliati' ? 'bg-red-mag text-white shadow-xs' : 'bg-red-mag/10 text-red-mag hover:bg-red-mag/20'">★ CONSIGLIATI</button>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <input v-if="schedaAttiva === 'mie'" v-model="testoRicerca" type="text" placeholder="CERCA LE ZIDRISE..." 
              class="px-4 py-2 bg-zinc-100 rounded-full font-pixel text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:bg-zinc-200 uppercase w-auto" />
            <button type="button" @click="apriModaleCreazione" 
              class="px-5 py-2 bg-red-mag hover:bg-zinc-950 text-white font-pixel text-xs tracking-widest uppercase rounded-full cursor-pointer shadow-md shrink-0">+ NUOVA ZIDRISA</button>
          </div>
        </header>

        <!-- profilo utente ispezionato -->
        <ProfiloUtenteIspezionato 
          v-if="utenteIspezionato" 
          :utente="utenteIspezionato" 
          :is-seguito="staSeguendo(utenteIspezionato.nome)" 
          @chiudi="utenteIspezionato = null" 
          @toggleFollow="gestisciFollow" 
        />

        <!-- schede -->
        <DiarioSection v-if="!utenteIspezionato && schedaAttiva === 'mie'" :canzoni="mieCanzoniFiltrate" 
          @mouseEntra="onTrackHover" @mouseEsce="onTrackLeave" @mouseMuove="onTrackMove" @seleziona="apriDettaglio" />

        <FollowerSection v-if="!utenteIspezionato && schedaAttiva === 'seguiti'" :lista-utenti="utentiSeguiti" 
          @ispezionaUtente="(u) => utenteIspezionato = u" />

        <ConsigliatiSection v-if="!utenteIspezionato && schedaAttiva === 'consigliati'" :canzoni="canzoniConsigliate" 
          @mouseEntra="onTrackHover" @mouseEsce="onTrackLeave" @mouseMuove="onTrackMove" @seleziona="apriDettaglio" />

        <!-- griglia utente ispezionato -->
        <section v-if="utenteIspezionato" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 w-full">
          <ZidriseCard v-for="c in utenteIspezionato.canzoni" :key="c.id" :canzone="c" 
            @mouseEntra="onTrackHover" @mouseEsce="onTrackLeave" @mouseMuove="onTrackMove" @seleziona="apriDettaglio" />
        </section>

      </main>
    </div>

    <!-- tooltip -->
    <div ref="tooltipElemento" class="fixed pointer-events-none z-50 p-3.5 rounded-2xl bg-zinc-950 text-white shadow-2xl border border-white/10 w-64 space-y-1.5 opacity-0 transition-opacity duration-200 text-left" style="transform: translate(-9999px, -9999px);">
      <div class="flex items-center justify-between border-b border-white/10 pb-1.5">
        <span class="font-pixel text-[10px] text-red-mag uppercase">[ {{ canzoneHoverAttiva?.archetipo || 'ARCHETIPO' }} ]</span>
        <span class="font-pixel text-[9px] text-zinc-400">{{ canzoneHoverAttiva?.autore }}</span>
      </div>
      <div>
        <h4 class="font-pixel text-sm text-white uppercase truncate">{{ canzoneHoverAttiva?.titolo }}</h4>
        <p class="font-clash text-xs text-zinc-400 uppercase tracking-wider truncate">{{ canzoneHoverAttiva?.artista }}</p>
      </div>
    </div>

    <!-- modali -->
    <ZidriseDetailModal v-if="canzoneSelezionata" :canzone="canzoneSelezionata" @chiudi="canzoneSelezionata = null" @modifica="apriModaleModifica" @elimina="eliminaCanzone" />
    <ZidriseModal v-if="mostraModale" :sta-modificando="staModificando" :dati-iniziali="datiCanzoneInModifica" @salva="salvaCanzone" @chiudi="mostraModale = false" />
    <ProfileEditModal v-if="mostraModaleProfilo" :dati-attuali="datiProfilo" @salva="salvaDatiProfilo" @chiudi="mostraModaleProfilo = false" />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import ProfileEditModal from '../components/ProfileEditModal.vue'
import ProfiloUtenteIspezionato from '../components/ProfiloUtenteIspezionato.vue'
import ZidriseCard from '../components/ZidriseCard.vue'
import ZidriseModal from '../components/ZidriseModal.vue'
import ZidriseDetailModal from '../components/ZidriseDetailModal.vue'
import DiarioSection from '../components/DiarioSection.vue'
import FollowerSection from '../components/FollowerSection.vue'
import ConsigliatiSection from '../components/ConsigliatiSection.vue'
import { mieCanzoniIniziali, utentiSeguitiIniziali, canzoniConsigliateIniziali } from '../data/canzoniData.js'

const CHIAVE_STORAGE_CANZONI = 'dimusi_mie_zidrise'
const CHIAVE_STORAGE_PROFILO = 'dimusi_dati_profilo'

const schedaAttiva = ref('mie')
const testoRicerca = ref('')
const mostraModale = ref(false)
const mostraModaleProfilo = ref(false)
const staModificando = ref(false)
const idInModifica = ref(null)
const datiCanzoneInModifica = ref({})

const canzoneSelezionata = ref(null)
const utenteIspezionato = ref(null)
const haBadgeVol1 = ref(false)
const tooltipElemento = ref(null)
const canzoneHoverAttiva = ref(null)

const datiProfilo = ref({
  nome: 'Sofia Zanini',
  username: '@sofiazanini',
  bio: "Appassionata di musica con abitudini d'ascolto senza senso logico. Passo troppe ore a creare playlist per ogni singolo stato d'animo.",
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
})

const mieCanzoni = ref(mieCanzoniIniziali)
const utentiSeguiti = ref(utentiSeguitiIniziali)
const canzoniConsigliate = ref(canzoniConsigliateIniziali)

const mieCanzoniFiltrate = computed(() => {
  if (!testoRicerca.value.trim()) return mieCanzoni.value
  const q = testoRicerca.value.toLowerCase()
  return mieCanzoni.value.filter(c => c.titolo.toLowerCase().includes(q) || c.artista.toLowerCase().includes(q))
})

let xTo, yTo

onMounted(() => {
  haBadgeVol1.value = localStorage.getItem('dimusi_vol01_badge') === 'true'
  
  const canzoniSalvate = localStorage.getItem(CHIAVE_STORAGE_CANZONI)
  if (canzoniSalvate) {
    try { mieCanzoni.value = JSON.parse(canzoniSalvate) } catch (e) { mieCanzoni.value = mieCanzoniIniziali }
  }

  const profiloSalvato = localStorage.getItem(CHIAVE_STORAGE_PROFILO)
  if (profiloSalvato) {
    try { datiProfilo.value = JSON.parse(profiloSalvato) } catch (e) {}
  }

  if (tooltipElemento.value) {
    xTo = gsap.quickTo(tooltipElemento.value, 'x', { duration: 0.3, ease: 'power3' })
    yTo = gsap.quickTo(tooltipElemento.value, 'y', { duration: 0.3, ease: 'power3' })
  }
})

const onTrackHover = (canzone, e) => {
  canzoneHoverAttiva.value = canzone
  if (tooltipElemento.value) {
    tooltipElemento.value.style.opacity = '1'
    onTrackMove(e)
  }
}

const onTrackMove = (e) => {
  if (xTo && yTo) {
    const offsetX = e.clientX + 16
    const offsetY = e.clientY + 12
    xTo(offsetX > window.innerWidth - 270 ? e.clientX - 270 : offsetX)
    yTo(offsetY > window.innerHeight - 150 ? e.clientY - 120 : offsetY)
  }
}

const onTrackLeave = () => {
  if (tooltipElemento.value) tooltipElemento.value.style.opacity = '0'
}

const apriDettaglio = (canzone) => {
  onTrackLeave()
  canzoneSelezionata.value = canzone
}

const apriModaleCreazione = () => {
  staModificando.value = false
  idInModifica.value = null
  datiCanzoneInModifica.value = { titolo: '', artista: '', archetipo: 'Dionisiaco', volume: 'Vol. 01', arkelo: '', cover: '' }
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
  if (confirm('Vuoi rimuovere questa Zidrise dal tuo diario?')) {
    mieCanzoni.value = mieCanzoni.value.filter(c => c.id !== id)
    localStorage.setItem(CHIAVE_STORAGE_CANZONI, JSON.stringify(mieCanzoni.value))
    canzoneSelezionata.value = null
  }
}

const staSeguendo = (nome) => utentiSeguiti.value.some(u => u.nome === nome)

const gestisciFollow = (utente) => {
  if (staSeguendo(utente.nome)) {
    utentiSeguiti.value = utentiSeguiti.value.filter(u => u.nome !== utente.nome)
  } else {
    utentiSeguiti.value.push(utente)
  }
}

const salvaCanzone = (datiForm) => {
  if (staModificando.value) {
    const indice = mieCanzoni.value.findIndex(c => c.id === idInModifica.value)
    if (indice !== -1) mieCanzoni.value[indice] = { ...mieCanzoni.value[indice], ...datiForm }
  } else {
    const nuova = {
      ...datiForm,
      id: Date.now(),
      autore: datiProfilo.value.nome,
      isMine: true,
      cover: datiForm.cover || 'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62',
      data: new Date().toLocaleDateString('it-IT')
    }
    mieCanzoni.value.unshift(nuova)
  }
  localStorage.setItem(CHIAVE_STORAGE_CANZONI, JSON.stringify(mieCanzoni.value))
  mostraModale.value = false
}

const salvaDatiProfilo = (nuoviDati) => {
  datiProfilo.value = { ...nuoviDati }
  localStorage.setItem(CHIAVE_STORAGE_PROFILO, JSON.stringify(datiProfilo.value))
  mostraModaleProfilo.value = false
}
</script>