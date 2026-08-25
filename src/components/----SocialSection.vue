<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionEl = ref(null)
const containerEl = ref(null)

// Riferimenti per la Schermata 1
const questionEl = ref(null)
const dotsEl = ref(null)

// Riferimenti per la Schermata 2 (Testi e Form)
const archiveTitleEl = ref(null)
const archiveParagraphEl = ref(null)
const cardEl = ref(null)
const cardTitleEl = ref(null)
const formElementsEl = ref(null)

let splitQuestion, splitDots, splitArchiveTitle, splitArchiveParagraph, splitCardTitle
let tl

onMounted(async () => {
    if (document.fonts?.ready) {
        await document.fonts.ready
    }

    // Split dei testi
    splitQuestion = SplitText.create(questionEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitDots = SplitText.create(dotsEl.value, { type: 'chars' })
    splitArchiveTitle = SplitText.create(archiveTitleEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitArchiveParagraph = SplitText.create(archiveParagraphEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })
    splitCardTitle = SplitText.create(cardTitleEl.value, { type: 'lines, words, chars', mask: 'lines', linesClass: 'line', wordsClass: 'word', charsClass: 'char' })

    // Colore iniziale grigio per tutti i testi
    gsap.set([
        ...splitQuestion.chars, 
        ...splitDots.chars, 
        ...splitArchiveTitle.chars, 
        ...splitArchiveParagraph.chars, 
        ...splitCardTitle.chars
    ], { color: '#d9d9d9' })

    // Stati iniziali degli elementi del form
    gsap.set(cardEl.value, { opacity: 0, y: 40, scale: 0.96 })
    gsap.set(formElementsEl.value, { opacity: 0, y: 15 })

    tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionEl.value,
            start: 'top top',
            end: () => `+=${containerEl.value.scrollWidth - window.innerWidth + window.innerHeight * 1.2}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    })

    // --- FASE 1: Entrata prima parte ("E poi????????????") ---
    tl.from(splitQuestion.lines, { yPercent: 120, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.03 }, 0)
      .to(splitQuestion.chars, { color: '#F2C14E', ease: 'none', stagger: 0.01, duration: 0.3 }, 0.3)
    
      .from(splitDots.chars, { yPercent: 120, opacity: 0, duration: 0.3, ease: 'power3.out', stagger: 0.02 }, 0.4)
      .to(splitDots.chars, { color: '#F2C14E', ease: 'none', stagger: 0.01, duration: 0.3 }, 0.8)

    // --- FASE 2: Scorrimento orizzontale e reveal dell'archivio + form ---
    tl.addLabel('enterArchive', 2.5)
      .to(containerEl.value, {
          x: () => -(containerEl.value.scrollWidth - window.innerWidth),
          ease: 'power2.inOut',
          duration: 5
      }, 'enterArchive')

      .from(splitArchiveTitle.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.05 }, 'enterArchive+=1.5')
      .to(splitArchiveTitle.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1.5 }, '<')

      .from(splitArchiveParagraph.lines, { yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.03 }, '-=0.4')
      .to(splitArchiveParagraph.chars, { color: '#F2C14E', ease: 'none', stagger: 0.015, duration: 1.5 }, '<')

      // Reveal del box del form
      .to(cardEl.value, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, 'enterArchive+=4')
      .from(splitCardTitle.lines, { yPercent: 120, opacity: 0, duration: 0.8, ease: 'power4.out', stagger: 0.05 }, '<+=0.1')
      .to(splitCardTitle.chars, { color: '#F2C14E', ease: 'none', stagger: 0.02, duration: 1 }, '<')
      .to(formElementsEl.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
})

onBeforeUnmount(() => {
    splitQuestion?.revert()
    splitDots?.revert()
    splitArchiveTitle?.revert()
    splitArchiveParagraph?.revert()
    splitCardTitle?.revert()
    tl?.kill()
    ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<template>
    <section ref="sectionEl" class="relative w-auto h-screen bg-black text-white overflow-hidden uppercase">
        <div ref="containerEl" class="flex h-screen items-center">

            <!-- SCREEN 1: "E poi" + punti interrogativi animati -->
            <div class="w-screen h-screen flex flex-col justify-center px-16 md:px-24 gap-6 shrink-0">
                <div class="flex items-baseline gap-4">
                    <h2 ref="questionEl" class="font-clash leading-[0.92] text-[clamp(2rem,6.5vw,7rem)]">
                        E poi 
                    </h2>
                    <span ref="dotsEl" class="font-clash leading-[0.92] text-[clamp(2rem,6.5vw,7rem)] tracking-widest">
                        ????????????
                    </span>
                </div>
            </div>

            <!-- SCREEN 2: L'archivio + Form di Login/Registrazione -->
            <div class="w-screen h-screen shrink-0 flex flex-row px-16 md:px-24">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-7xl mx-auto w-full">

                    <!-- Colonna Sinistra: Racconto dell'archivio -->
                    <div class="flex flex-col gap-6">
                        <h2 ref="archiveTitleEl" class="font-clash uppercase font-bold leading-[0.95] text-[clamp(2rem,5vw,5.5rem)]">
                            E poi arriva l'archivio
                        </h2>
                        <p ref="archiveParagraphEl" class="font-space text-lg md:text-2xl leading-relaxed opacity-90 max-w-xl normal-case">
                            Dimusi diventa un archivio personale: uno spazio dove iniziare a rendersi conto di quanto la musica stia già costruendo il tuo futuro.
                        </p>
                    </div>

                    <!-- Colonna Destra: Form di accesso fedele allo sketch -->
                    <div class="flex justify-center md:justify-end">
                        <div ref="cardEl" class="w-full max-w-sm bg-[#111111] border border-[#F2C14E]/30 rounded-2xl px-8 py-10 flex flex-col items-center gap-6 text-center shadow-2xl">

                            <h3 ref="cardTitleEl" class="font-clash uppercase font-bold leading-none text-[clamp(1.4rem,2.4vw,2rem)]">
                                Inizia il tuo Dimusi
                            </h3>

                            <!-- Form effettivo -->
                            <form ref="formElementsEl" @submit.prevent class="w-full flex flex-col gap-4 mt-2">
                                <input 
                                    type="text" 
                                    placeholder="NOME UTENTE O EMAIL" 
                                    class="w-full bg-black/50 border border-[#d9d9d9]/20 focus:border-[#F2C14E] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#d9d9d9]/40 outline-none transition-colors font-space uppercase"
                                />
                                <input 
                                    type="password" 
                                    placeholder="PASSWORD" 
                                    class="w-full bg-black/50 border border-[#d9d9d9]/20 focus:border-[#F2C14E] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#d9d9d9]/40 outline-none transition-colors font-space uppercase"
                                />
                                <button 
                                    type="submit" 
                                    class="w-full mt-2 bg-[#F2C14E] text-black font-space font-bold uppercase tracking-wide text-sm rounded-xl py-3.5 hover:bg-[#dfb045] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>Accedi / Registrati</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>