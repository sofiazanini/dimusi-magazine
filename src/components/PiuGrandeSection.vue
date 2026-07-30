<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionEl = ref(null)
const containerEl = ref(null)

const okEl = ref(null)
const dotsEl = ref(null)
const text1El = ref(null)
const text2El = ref(null)
const marqueeTrackEl = ref(null)
const text3El = ref(null)
const text4El = ref(null)

let splitOk, splitDots, splitText1, splitText2, splitText3, splitText4, splitMarquee
let tlMain

onMounted(async () => {
    if (document.fonts?.ready) {
        await document.fonts.ready
    }
    
    // Split dei testi
    splitOk = SplitText.create(okEl.value, { type: 'lines, words, chars', mask: 'lines' })
    splitDots = SplitText.create(dotsEl.value, { type: 'chars' })
    splitText1 = SplitText.create(text1El.value, { type: 'lines, words, chars', mask: 'lines' })
    splitText2 = SplitText.create(text2El.value, { type: 'lines, words, chars', mask: 'lines' })
    splitMarquee = SplitText.create(marqueeTrackEl.value, { type: 'chars, words' })
    splitText3 = SplitText.create(text3El.value, { type: 'lines, words, chars', mask: 'lines' })
    splitText4 = SplitText.create(text4El.value, { type: 'lines, words, chars', mask: 'lines' })
    
    // Colore iniziale trasparente o grigio per le lettere del marquee
    gsap.set(splitMarquee.chars, { opacity: 0, color: '#d9d9d9' })
    
    const allOtherChars = [
    ...splitOk.chars, ...splitDots.chars, ...splitText1.chars, 
    ...splitText2.chars, ...splitText3.chars, ...splitText4.chars
    ]
    gsap.set(allOtherChars, { color: '#d9d9d9' })
    
    // Timeline principale basata sullo scroll verticale con pin
tlMain = gsap.timeline({
    scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top top',
        end: () => `+=${containerEl.value.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
    }
})
    
    // --- FASE 1: Entrata prima parte ---
    tlMain.from(splitOk.lines, { yPercent: 120, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.03 }, 0)
    .to(splitOk.chars, { color: '#F2C14E', ease: 'none', stagger: 0.01, duration: 0.3 }, 0.3)
    
    .from(splitDots.chars, { yPercent: 120, opacity: 0, duration: 0.3, ease: 'power3.out', stagger: 0.02 }, 0.4)
    .to(splitDots.chars, { color: '#F2C14E', ease: 'none', stagger: 0.01, duration: 0.3 }, 0.6)
    
    .from(splitText1.lines, { yPercent: 120, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.03 }, 0.7)
    .to(splitText1.chars, { color: '#F2C14E', ease: 'none', stagger: 0.01, duration: 0.3 }, 1.0)
    
    .from(splitText2.lines, { yPercent: 120, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.03 }, 1.4)
    .to(splitText2.chars, { color: '#F2C14E', ease: 'none', stagger: 0.01, duration: 0.3 }, 1.7)
    
    // --- FASE 2: Scorrimento orizzontale del contenitore ---
tlMain.addLabel('enterBig', 2.5)
      .to(containerEl.value, {
          x: () => -(containerEl.value.scrollWidth - window.innerWidth),
          ease: 'power2.inOut',
          duration: 5
      }, 'enterBig')
    
    // --- FASE 3: Effetto caotico sulle lettere di "PIÙ GRANDE" sincronizzato con lo scroll ---
    splitMarquee.chars.forEach((char, index) => {
        // Facciamo partire ogni lettera con un leggero ritardo (stagger) durante la fase centrale dello scroll
        let startTime = 4.0 + (index * 0.1);
        
        tlMain.fromTo(char, 
        { 
            yPercent: gsap.utils.random(-200, 200), 
            rotation: gsap.utils.random(-30, 30),
            opacity: 0,
            scale: 0.3
        },
        { 
            yPercent: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            color: '#F2C14E',
            ease: 'back.out(1.7)',
            duration: 1.5
        },
        startTime
        );
    });
    
    // --- FASE 4: Entrata testi finali ---
    tlMain.from(splitText3.lines, { yPercent: 120, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.03 }, 7.5)
    .to(splitText3.chars, { color: '#F2C14E', ease: 'none', stagger: 0.01, duration: 0.3 }, 7.8)
    
    .from(splitText4.lines, { yPercent: 120, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.03 }, 8.2)
    .to(splitText4.chars, { color: '#F2C14E', ease: 'none', stagger: 0.01, duration: 0.3 }, 8.5)
})

onBeforeUnmount(() => {
    splitOk?.revert()
    splitDots?.revert()
    splitText1?.revert()
    splitText2?.revert()
    splitText3?.revert()
    splitText4?.revert()
    splitMarquee?.revert()
    tlMain?.kill()
    ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<template>
    <section ref="sectionEl" class="relative w-auto h-screen bg-black text-white overflow-hidden">
        
        <div ref="containerEl" class="flex h-screen items-center">
            
            <!-- SCHERMATA 1 & 2 -->
            <div class="w-screen h-screen flex flex-col justify-center px-16 md:px-24 gap-6 shrink-0">
                <div class="flex items-baseline gap-4">
                    <h2 ref="okEl" class="font-clash uppercase font-bold leading-[0.92] text-[clamp(2rem,6.5vw,7rem)]">
                        Ok ma
                    </h2>
                    <span ref="dotsEl" class="font-clash uppercase font-bold leading-[0.92] text-[clamp(2rem,6.5vw,7rem)] tracking-widest">
                        .............
                    </span>
                </div>
                <h2 ref="text1El" class="font-clash uppercase font-bold leading-[0.92] text-[clamp(2rem,6.5vw,7rem)]">
                    Come possiamo rimettere al centro la musica?
                </h2>
                <h2 ref="text2El" class="font-clash uppercase font-bold leading-[0.92] text-[clamp(2rem,6.5vw,7rem)] pt-6">
                    Serve qualcosa di grande
                </h2>
            </div>
            
            <!-- SCHERMATA 3 (Il testo gigante con animazione) -->
            <!-- Usiamo un div flex per centrare e diamo una classe per la grandezza del testo -->
            <div class="w-auto h-screen flex items-center justify-center shrink-0">
                <h3 ref="marqueeTrackEl" class="font-clash uppercase font-bold tracking-wide text-[clamp(7rem,25vw,28rem)] leading-[1.1]">
                    PIÙ GRANDE
                </h3>
            </div>
            
            <!-- SCHERMATA 4 -->
            <div class="w-screen h-screen flex flex-col justify-between py-24 px-16 md:px-24 shrink-0">
                <div class="flex flex-col justify-center">
                    <h2 ref="text3El" class="font-clash uppercase font-bold leading-[0.92] text-[clamp(2rem,6.5vw,7rem)]">
                        Come una divinità, loro sono immense
                    </h2>
                </div>
                
                <div class="flex flex-col justify-center">
                    <h2 ref="text4El" class="font-clash uppercase font-bold leading-[0.92] text-[clamp(2rem,6.5vw,7rem)]">
                        Anche la musica è immensa, anche la musica può essere divina
                    </h2>
                </div>
            </div>
            
        </div>
    </section>
</template>