<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionEl = ref(null)
const introEl = ref(null)
const titleTopEl = ref(null)
const titleBottomEl = ref(null)
const paragraphEl = ref(null)
const titleChange1El = ref(null)
const titleChange2El = ref(null)
const finalTitleEl = ref(null)

let splitTop, splitBottom, splitParagraph, splitChange1, splitChange2, splitFinal
let tl

onMounted(async () => {
    if (document.fonts?.ready) {
        await document.fonts.ready
    }
    
    // Split di tutti i titoli (incluso quello finale) e del paragrafo
    splitTop = SplitText.create(titleTopEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitBottom = SplitText.create(titleBottomEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitParagraph = SplitText.create(paragraphEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitChange1 = SplitText.create(titleChange1El.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitChange2 = SplitText.create(titleChange2El.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitFinal = SplitText.create(finalTitleEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    
    // Colore iniziale grigio per tutti i caratteri di tutti i titoli (incluso il finale)
    gsap.set([...splitTop.chars, ...splitBottom.chars, ...splitChange1.chars, ...splitChange2.chars, ...splitFinal.chars], { color: '#d9d9d9' })
    
    // Timeline principale della sezione pinnata
    tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionEl.value,
            start: 'top top',
            end: '+=1400%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    })
    
    // 1. PRIMA FASE: Titolo 1
    tl.from(splitTop.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.05 })
    .to(splitTop.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1.5 })
    
    // Titolo 2
    .from(splitBottom.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.05 }, '-=0.5')
    .to(splitBottom.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1.5 })
    
    // Uscita intro 1
    .to(introEl.value, { opacity: 0, y: -60, duration: 1 }, '+=0.5')
    
    // 2. SECONDA FASE: Primo Titolo Intercambiabile + Paragrafo
    .from(splitChange1.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.05 })
    .to(splitChange1.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1.5 }, '<')
    
    .from(splitParagraph.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.03 }, '<+=0.2')
    
    // Uscita primo titolo intercambiabile ed entrata del secondo
    .to(titleChange1El.value, { opacity: 0, y: -40, duration: 0.8 }, '+=1')
    .from(splitChange2.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.05 })
    .to(splitChange2.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1.5 })
    
    // 3. TERZA FASE: Titolo finale (fa uscire il secondo, compare l'ultimo e si colora)
    .to(titleChange2El.value, { opacity: 0, y: -40, duration: 0.8 }, '+=1')
    .fromTo(finalTitleEl.value, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1 }, '<')
    .to(splitFinal.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1.5 })
})

onBeforeUnmount(() => {
    splitTop?.revert()
    splitBottom?.revert()
    splitParagraph?.revert()
    splitChange1?.revert()
    splitChange2?.revert()
    splitFinal?.revert()
    tl?.kill()
    ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<template>
    <section ref="sectionEl" class="relative w-full h-screen bg-black text-white overflow-hidden px-6 md:px-16 py-16 flex flex-col justify-between">
        <!-- PRIMA FASE -->
        <div ref="introEl" class="absolute inset-0 px-6 md:px-16 py-16 flex flex-col justify-between pointer-events-none">
            <h2 ref="titleTopEl" class="font-clash uppercase font-bold leading-[0.95] text-[clamp(2rem,6.5vw,7rem)] pointer-events-auto">
                Può l'anima resistere senza musica?
            </h2>
            <h2 ref="titleBottomEl" class="text-right font-clash uppercase font-bold leading-[0.95] text-[clamp(2rem,6.5vw,7rem)] pointer-events-auto">
                Cosa trasmette la musica all'anima?
            </h2>
        </div>
        
        <!-- SECONDA FASE -->
        <div class="absolute inset-0 px-6 md:px-16 py-16 flex flex-col justify-between pointer-events-none">
            
            <!-- Paragrafo in alto -->
            <div class="w-full flex justify-end pointer-events-auto">
                <div ref="paragraphEl" class="w-full md:w-1/2 text-lg md:text-xl leading-relaxed text-[#d9d9d9] pl-0 md:pl-12">
                    Elit id eiusmod deserunt ipsum esse aute sunt aliquip tempor non laborum adipisicing est minim. Et eiusmod qui id aliqua duis qui consectetur dolore nisi enim quis id officia esse. Commodo nisi sint ea aute culpa id reprehenderit adipisicing. Excepteur ullamco excepteur occaecat cupidatat ullamco mollit esse fugiat eu anim fugiat ullamco ullamco. Elit id eiusmod deserunt ipsum esse aute sunt aliquip tempor non laborum adipisicing est minim. Et eiusmod qui id aliqua duis qui consectetur dolore nisi enim quis id officia esse. Commodo nisi sint ea aute culpa id reprehenderit adipisicing. Excepteur ullamco excepteur occaecat cupidatat ullamco mollit esse fugiat eu anim fugiat ullamco ullamco.
                </div>
            </div>
            
            <!-- Titoli intercambiabili e finale nello stesso blocco in basso -->
            <div class="relative w-full max-w-6xl h-auto pointer-events-auto">
                <h2 ref="titleChange1El" class="absolute bottom-0 left-0 font-clash uppercase font-bold leading-[0.95] text-[clamp(2rem,6.5vw,7rem)]">
                    Dimusi prova a spiegarlo
                </h2>
                <h2 ref="titleChange2El" class="absolute bottom-0 left-0 font-clash uppercase font-bold leading-[0.95] text-[clamp(2rem,6.5vw,7rem)]">
                    Ma non è facile spiegarlo
                </h2>
                <h2 ref="finalTitleEl" class="absolute bottom-0 left-0 max-w-6xl opacity-0 font-clash uppercase font-bold leading-[0.95] text-[clamp(2rem,6.5vw,7rem)] pointer-events-none">
                    Per questo è nato un nuovo linguaggio:
                </h2>
            </div>
            
        </div>
    </section>    
</template>