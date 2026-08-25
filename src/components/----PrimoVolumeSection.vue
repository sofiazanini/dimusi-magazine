<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import spongebobImg from '../assets/spongebob.webp'
import coverVolume1Img from '../assets/cover-volume-1.webp'

gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionEl = ref(null)
const containerEl = ref(null)

// Screen 1 — nascita di Dimusi
const introTextEl = ref(null)
const logoEl = ref(null)
const paragraphEl = ref(null)
const captionEl = ref(null)
const arrowEl = ref(null)
const spongebobWrapEl = ref(null)

// Screen 2 — cosa troverai nel volume
const volumeTitleEl = ref(null)
const listEl = ref(null)

// Screen 3 — reveal copertina
const coverEl = ref(null)

let splitIntro, splitParagraph, splitVolumeTitle, splitList
let tl

onMounted(async () => {
    if (document.fonts?.ready) {
        await document.fonts.ready
    }
    
    // Split dei testi
    splitIntro = SplitText.create(introTextEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitParagraph = SplitText.create(paragraphEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitVolumeTitle = SplitText.create(volumeTitleEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitList = SplitText.create(listEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    
    // Colore iniziale grigio per tutti i testi
    gsap.set([...splitIntro.chars, ...splitParagraph.chars, ...splitVolumeTitle.chars, ...splitList.chars], { color: '#d9d9d9' })
    
    // Stati iniziali degli elementi non testuali
    gsap.set(logoEl.value, { opacity: 0, scale: 0.85, y: 20 })
    gsap.set(captionEl.value, { opacity: 0, y: 10 })
    gsap.set(arrowEl.value, { opacity: 0, x: -8 })
    gsap.set(spongebobWrapEl.value, { opacity: 0, scale: 0.9, rotate: -3 })
    gsap.set(coverEl.value, { opacity: 0, scale: 0.9, y: 30 })
    
    tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionEl.value,
            start: 'top top',
            end: () => `+=${containerEl.value.scrollWidth - window.innerWidth + window.innerHeight * 2}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    })
    
    // 1. FASE VERTICALE: nasce Dimusi
    tl.from(splitIntro.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.05 })
    .to(splitIntro.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1.5 }, '<')
    
    .to(logoEl.value, { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
    
    .from(splitParagraph.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.03 }, '-=0.3')
    .to(splitParagraph.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1.5 }, '<')
    
    // caption + freccia disegnata
    .to(captionEl.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '+=0.4')
    .to(arrowEl.value, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, '<')
    
    // entrata ironica di Spongebob
    .to(spongebobWrapEl.value, { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.6)' }, '+=0.2')
    
    // piccola pausa prima di scorrere in orizzontale
    .to({}, { duration: 0.6 })
    
    // 2. FASE ORIZZONTALE: scorrimento verso il Volume 1
    tl.addLabel('enterVolume')
    .to(containerEl.value, {
        x: () => -(containerEl.value.scrollWidth - window.innerWidth),
        ease: 'power2.inOut',
        duration: 6
    }, 'enterVolume')
    
    .from(splitVolumeTitle.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.05 }, 'enterVolume+=2.2')
    .to(splitVolumeTitle.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1.5 }, '<')
    
    .from(splitList.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.04 }, '-=0.4')
    .to(splitList.chars, { color: '#F2C14E', ease: 'none', stagger: 0.015, duration: 1.5 }, '<')
    
    // reveal finale della copertina
    .to(coverEl.value, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 'enterVolume+=5.2')
})

onBeforeUnmount(() => {
    splitIntro?.revert()
    splitParagraph?.revert()
    splitVolumeTitle?.revert()
    splitList?.revert()
    tl?.kill()
    ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<template>
    <section ref="sectionEl" class="relative w-auto h-screen bg-white text-black">
        <div ref="containerEl" class="flex h-screen items-center">
            
            <!-- SCREEN 1: nascita di Dimusi + Spongebob -->
            <div class="relative w-screen h-screen shrink-0 flex flex-row justify-center items-center gap-8 px-6 md:px-16">
                <div class="flex flex-col gap-4 max-w-4xl">
                    <h2 ref="introTextEl" class="font-clash uppercase font-clash leading-[0.95] text-[clamp(2rem,6.5vw,7rem)]">
                        È così che nasce
                    </h2>
                    
                    <img ref="logoEl" src="/logo-dimusi.svg" alt="Dimusi" class="w-1 md:w-1/2" />
                    
                    <p ref="paragraphEl" class="font-clash text-lg md:text-2xl leading-relaxed opacity-80 max-w-xl mt-4">
                        Per trovare questo senso di immensità nella musica contemporanea.
                    </p>
                </div>
                
                <div ref="spongebobWrapEl" class="align-middle w-full">
                    <p ref="captionEl" class="mb-8 font-space text-sm md:text-base uppercase opacity-60">
                        Questa sensazione, per intenderci:
                    </p>
                    <img :src="spongebobImg" alt="La sensazione, per intenderci" class="w-full object-cover rounded-lg" />
                </div>
            </div>
            

            <!-- SCREEN 2: cosa troverai nel Volume 1 + Copertina -->
            <div class="w-screen h-screen shrink-0 flex flex-row justify-between justify-centerpx-6 md:px-16 ">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-7xl mx-auto w-full">
                    
                    <!-- Colonna Sinistra: Testi (Volume Title + Lista) -->
                    <div class="flex flex-col gap-6">
                        <h2 ref="volumeTitleEl" class="font-clash uppercase leading-[0.95] text-[clamp(2rem,4.5vw,5rem)]">
                            Nel primo volume ci soffermiamo su apollineo e dionisiaco
                        </h2>
                        
                        <div class="flex flex-col gap-3">
                            <p class="font-clash text-sm md:text-base uppercase opacity-60">
                                All'interno troverai:
                            </p>
                            <ul ref="listEl" class="flex flex-col gap-2 font-space text-lg md:text-xl leading-snug">
                                <li>- Come i due concetti dialogano con la musica</li>
                                <li>- Chi sono Apollo e Dioniso</li>
                                <li>- Gli artisti contemporanei che rispecchiano il tema</li>
                                <li>- Approfondimenti, interviste, e tanto altro!</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Colonna Destra: Reveal Copertina Volume 1 -->
                    <div class="flex justify-center items-center">
                        <img ref="coverEl" :src="coverVolume1Img" alt="Copertina Volume 1 - Dove il velo si lacera" class="h-[70vh] w-auto object-fit shadow-2xl rounded-2xl" />
                    </div>

                </div>
            </div>
            
        </div>
    </section>
</template>