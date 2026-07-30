<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const glossaryTerms = [
  { term: 'Zidrisa',    def: 'Melodia breve e ossessiva che riattiva ricordi profondi.', bg: '#111111', color: '#FFFFFF' },
  { term: 'Kesond',     def: 'Il mix di emozioni provate durante l\'ascolto di una zidrisa.', bg: '#F2C14E', color: '#111111' },
  { term: 'Arkèlo',     def: 'Il ricordo che riemerge grazie a una zidrisa.', bg: '#FFFFFF', color: '#111111' },
  { term: 'Xalidèrno',  def: 'Il ritorno alla realtà dopo l\'immersione in una zidrisa.', bg: '#8C1C1C', color: '#FFFFFF' },
  { term: 'Dimusi',     def: 'La ricerca ossessiva della zidrisa perfetta.', bg: '#1C4C3B', color: '#FFFFFF' },
  { term: 'Skelo',      def: 'L\'artista che ha prodotto la tua zidrisa principale.', bg: '#D9D9D9', color: '#111111' },
]

const glossaryWrapEl = ref(null)
const glossaryTrackEl = ref(null)

let scrollTriggers = []

function initGlossaryScroll() {
  const track = glossaryTrackEl.value
  
  // Calcoliamo esattamente quanto deve scorrere in base alla larghezza reale della traccia
  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

  const st = ScrollTrigger.create({
    trigger: glossaryWrapEl.value,
    start: 'top top',
    // Sostituiamo il calcolo approssimativo con la larghezza reale in pixel
    end: () => `+=${track.scrollWidth - window.innerWidth}`,
    pin: true,
    scrub: 1, // Leggermente aumentato per dare fluidità ed evitare micro-scatti
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.set(track, {
        x: getScrollAmount() * self.progress
      })
    }
  })
  scrollTriggers.push(st)
}

onMounted(async () => {
  if (document.fonts?.ready) await document.fonts.ready
  initGlossaryScroll()
})

onBeforeUnmount(() => {
  scrollTriggers.forEach(st => st.kill())
  ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<template>
  <section ref="glossaryWrapEl" class="relative w-full h-screen overflow-hidden">
    <!-- Rimuoviamo style="width: 600%;" e usiamo w-max per farlo adattare dinamicamente senza errori di arrotondamento -->
    <div ref="glossaryTrackEl" class="flex h-full w-max">
      <div
        v-for="(item, i) in glossaryTerms"
        :key="item.term"
        class="w-screen h-full shrink-0 flex flex-col justify-center items-start px-6 md:px-16 relative"
        :style="{ backgroundColor: item.bg, color: item.color }"
      >
        <span class="font-mono text-sm md:text-base opacity-60 mb-4">
          {{ String(i + 1).padStart(2, '0') }} / {{ String(glossaryTerms.length).padStart(2, '0') }}
        </span>
        <h3 class="font-clash uppercase font-bold leading-none text-[clamp(3rem,12vw,9rem)]">
          {{ item.term }}
        </h3>
        <p class="font-sans text-base md:text-xl max-w-md mt-6 opacity-90">
          {{ item.def }}
        </p>
      </div>
    </div>
  </section>
</template>