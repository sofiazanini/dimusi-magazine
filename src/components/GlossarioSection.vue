<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Glossario — sostituisci le definizioni placeholder e i colori con   */
/* la palette definitiva di Dimusi                                    */
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

/* ------------------------------------------------------------------ */
/* Glossario: sezione pinnata, 6 pannelli in fila orizzontale che     */
/* scorrono uno dopo l'altro mentre scrolli in verticale (equivalente */
/* del meccanismo "a capitoli" di tutorial073)                        */
/* ------------------------------------------------------------------ */
function initGlossaryScroll() {
  const panels = glossaryTrackEl.value.children
  const total = panels.length

  const st = ScrollTrigger.create({
    trigger: glossaryWrapEl.value,
    start: 'top top',
    end: () => `+=${total * window.innerHeight}`,
    pin: true,
    scrub: 0.6,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.set(glossaryTrackEl.value, {
        xPercent: -100 * (total - 1) * self.progress
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
  <!-- GLOSSARIO — pannelli orizzontali a scorrimento, sfondo/parola cambiano -->
  <section ref="glossaryWrapEl" class="relative w-full h-screen overflow-hidden">
    <div ref="glossaryTrackEl" class="flex h-full" style="width: 600%;">
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
        <!-- qui in seguito inserirai il poster dedicato al termine -->
      </div>
    </div>
  </section>
</template>