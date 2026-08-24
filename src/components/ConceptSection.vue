<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const section2El = ref(null)
const textEl = ref(null)
let split

const initSplit = () => {
  split = SplitText.create(textEl.value, {
    type: 'lines, words, chars',
    mask: 'lines',
    autoSplit: true, // ri-splitta e richiama onSplit ad ogni resize: gestisce la responsività
    linesClass: 'line',
    wordsClass: 'word',
    charsClass: 'char',
    onSplit(self) {
      const entrance = gsap.from(self.lines, {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section2El.value,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })  
      
      // stato di partenza: forziamo il colore grigio iniziale su tutti i caratteri generati
      gsap.set(self.chars, { color: '#d9d9d9' })
      
      // testo colorato allo scroll
      
      const colorFill = gsap.to(self.chars, {
        color: '#F2C14E', 
        ease: 'none',
        stagger: 0.05,    
        scrollTrigger: {
          trigger: section2El.value,
          start: 'top top',
          end: '+=300%', // Dà abbastanza spazio di scroll per colorare tutto con calma
          scrub: true,    
          pin: true,      
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })
      
      // SplitText farà il revert/kill automatico di queste animazioni al prossimo resize
      return [entrance, colorFill]
    }
  })
}

onMounted(async () => {
  if (document.fonts?.ready) {
    await document.fonts.ready
  }
  initSplit()
})

onBeforeUnmount(() => {
  split?.revert()
  ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<template>
  <section ref="section2El" class="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-24">
    <h2 class="font-pixel uppercase font-bold text-[clamp(2rem,6.5vw,7rem)]">
      Cos'è?
    </h2>
    
    <h2 ref="textEl" class="font-clash uppercase font-bold leading-[0.92] text-[clamp(2rem,6.5vw,7rem)]">
      Dimusi è la ricerca del divino nell'ascolto contemporaneo
    </h2>
  </section>
</template>