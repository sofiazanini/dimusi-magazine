<template>
    <div id="glossario" class="relative w-full">
        <!-- Sezione bloccata a pieno schermo con GSAP ScrollTrigger -->
        <section ref="sectionRef" class="relative w-full h-screen bg-black overflow-hidden select-none">
            
            <!-- CONTENITORE SCHEDE -->
            <div class="relative w-full h-full">
                <article 
                    v-for="(term, index) in terms" 
                    :key="term.word" 
                    :ref="el => slidesRef[index] = el"
                    class="glossary-slide absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-16 lg:p-24"
                    :class="{ 'opacity-0 pointer-events-none': index !== 0 }"
                >
                    <!-- Sfondo responsive: ruotato a 90° su Mobile, orizzontale su Desktop -->
                    <div class="absolute inset-0 -z-10 overflow-hidden flex items-center justify-center pointer-events-none">
                        <img 
                            :src="term.bgImage" 
                            :alt="'Background ' + term.word" 
                            class="rotate-90 w-dvh h-dvw min-w-dvh min-h-dvw object-cover select-none md:rotate-0 md:w-full md:h-full md:min-w-0 md:min-h-0" 
                            loading="lazy"
                        />
                        <div class="absolute inset-0 bg-white/10 pointer-events-none"></div>
                    </div>
                    
                    <!-- Blocco Tipografico -->
                    <div class="w-full max-w-4xl space-y-8 md:space-y-10 relative z-10">
                        
                        <!-- 1. Parola e Fonetica -->
                        <div class="slide-content-item space-y-2">
                            <h2 class="font-pixel text-7xl md:text-9xl text-zinc-950 leading-none tracking-tight">
                                {{ term.word }}
                            </h2>
                            <p class="font-space text-2xl md:text-3xl text-zinc-800 tracking-wider pt-1 md:font-light">
                                {{ term.phonetic }}
                            </p>
                        </div>
                        
                        <!-- 2. Categoria Grammaticale -->
                        <div class="slide-content-item border-y border-black/20 py-3 max-w-xl">
                            <p class="font-clash text-xl md:text-2xl text-zinc-800">
                                {{ term.type }}
                            </p>
                        </div>
                        
                        <!-- 3. Definizione con Evidenziazioni Fedeli al PDF -->
                        <div 
                            class="slide-content-item font-clash text-xl md:text-2xl text-zinc-950 leading-relaxed max-w-3xl" 
                            v-html="term.definitionHtml"
                        ></div>
                        
                        <!-- 4. Citazione Contestuale -->
                        <div v-if="term.quote" class="slide-content-item font-space border-l-2 border-zinc-950 pl-4 md:pl-6 text-base md:text-lg italic text-zinc-800 max-w-2xl">
                            «{{ term.quote }}»
                        </div>
                    </div>
                </article>
            </div>
            
            <!-- TRANSIZIONE SLICE REVEALER (#36BDEE) -->
            <div class="slice-revealer absolute inset-0 z-30 pointer-events-none flex w-full h-full">
                <div 
                    v-for="slice in 8" 
                    :key="'slice-' + slice" 
                    class="slice-item flex-1 h-full bg-[#36BDEE] scale-y-0 origin-bottom"
                ></div>
            </div>
            
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import corretto delle immagini
import bgKesond from '../assets/word-kesond.webp'
import bgZidrisa from '../assets/word-zidrisa.webp'
import bgArkelo from '../assets/word-arkelo.webp'
import bgXaliderno from '../assets/word-xaliderno.webp'
import bgDimusi from '../assets/word-dimusi.webp'
import bgSchelo from '../assets/word-schelo.webp'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const slidesRef = ref([])

// Dati dei lemmi con layout e testo definitivi
const terms = [
    {
        id: '01',
        word: 'kesond',
        phonetic: '/ke-sond/',
        type: 'Sostantivo maschile singolare.',
        definitionHtml: 'Rappresenta il <span class="marker-highlight marker-blue">mix di emozioni</span> provate da una persona durante l’ascolto di una melodia <span class="marker-highlight marker-orange">zidrisa</span>, <em class="italic">come se la persona si stesse elevando e avvicinando al proprio io.</em>',
        quote: 'Il crescendo finale di questa zidrisa riesce sempre a stupirmi con un fortissimo kesond.',
        bgImage: bgKesond
    },
    {
        id: '02',
        word: 'zidrisa',
        phonetic: '/zi-drì-sa/',
        type: 'Sostantivo femminile singolare.',
        definitionHtml: 'É una <span class="marker-highlight marker-blue">melodia breve</span>, un ritornello ossessivo che rimane intrappolato nel subconscio, facendo riemergere momenti o ricordi di forte impatto sulla persona.<br><span class="marker-highlight marker-orange">La colonna sonora del sé.</span>',
        quote: 'Quel breve ritornello pop è diventato per me una vera e propria zidrisa, facendomi riaffiorare costantemente l\'arkelo di quell\'estate ormai lontana.',
        bgImage: bgZidrisa
    },
    {
        id: '03',
        word: 'arkelo',
        phonetic: '/ar-kè-lo/',
        type: 'Sostantivo maschile singolare.',
        definitionHtml: 'É un ricordo che emerge grazie alla <span class="marker-highlight marker-blue">zidrisa</span>, è un insieme di <span class="marker-highlight marker-orange">frammenti del passato</span> che riaffiorano quando una melodia riattiva le <em class="italic">associazioni emotive personali.</em>',
        quote: 'Mentre ascoltavo questa canzone ho avuto un arkèlo sulle serate passate con mia nonna a giocare a carte.',
        bgImage: bgArkelo
    },
    {
        id: '04',
        word: 'xaliderno',
        phonetic: '/xa-li-dèr-no/',
        type: 'Sostantivo maschile singolare.',
        definitionHtml: 'Il <span class="marker-highlight marker-blue">ritorno alla realtà</span> dopo l’ascolto di una <span class="marker-highlight marker-orange">zidrisa</span>, la ripresa del contatto con il mondo e la realizzazione del potere che può avere una melodia.',
        quote: 'Nel momento in cui ho tolto le cuffie ho vissuto uno xalidèrno, quasi come se fossi stata in un\'altra dimensione.',
        bgImage: bgXaliderno
    },
    {
        id: '05',
        word: 'dimusi',
        phonetic: '/dì-mu-si/',
        type: 'Sostantivo maschile singolare.',
        definitionHtml: 'L\'azione di <span class="marker-highlight marker-blue">ricercare ossessivamente</span> la <span class="marker-highlight marker-orange">zidrisa</span> perfetta o quella in grado di generare un nuovo e più potente <span class="marker-highlight marker-orange">kesond</span>.',
        quote: 'É da due anni che non trovo una zìdrisa che mi faccia sentire lo stesso kesond della mia canzone preferita, sono bloccata in uno stato di dimusi.',
        bgImage: bgDimusi
    },
    {
        id: '06',
        word: 'skelo',
        phonetic: '/skè-lo/',
        type: 'Sostantivo maschile singolare.',
        definitionHtml: 'É una <span class="marker-highlight marker-blue">figura soggettiva</span>: lo skelio può cambiare, rappresenta colui o colei che ha prodotto la tua <span class="marker-highlight marker-orange">zidrisa</span> principale.',
        quote: 'Per me i Radiohead rappresentano uno skelo inarrivabile: Creep sarà sempre la mia zidrisa principale.',
        bgImage: bgSchelo
    }
]

let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        const slides = slidesRef.value
        const total = slides.length
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.value,
                start: 'top top',
                end: `+=${total * 1800}`,
                pin: true,
                scrub: 0.8,
                anticipatePin: 1
            }
        })
        
        // Funzione: Ingresso dei testi dal basso + Scrittura evidenziatori
        const animateSlideEntry = (slideElement) => {
            const textItems = slideElement.querySelectorAll('.slide-content-item')
            const allHighlights = slideElement.querySelectorAll('.marker-highlight')
            
            // 1. I testi salgono dal basso in modo sfalsato
            if (textItems.length) {
                tl.fromTo(textItems,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: 'power2.out'
                    }
                )
            }
            
            // 2. L'evidenziatore scorre subito dopo l'arrivo del testo
            if (allHighlights.length) {
                tl.fromTo(allHighlights, 
                    { backgroundPosition: '100% 0%', color: '#09090b' },
                    {
                        backgroundPosition: '0% 0%',
                        color: '#ffffff',
                        duration: 0.7,
                        stagger: 0.12,
                        ease: 'power1.inOut'
                    }, 
                    '-=0.2'
                )
            }
        }
        
        // 1. Ingresso animato della prima scheda (Kesond)
        animateSlideEntry(slides[0])
        
        // 2. Transizione per le schede successive
        for (let i = 0; i < total - 1; i++) {
            const currentSlide = slides[i]
            const nextSlide = slides[i + 1]
            
            // Pausa di lettura sulla scheda attiva
            tl.to({}, { duration: 1.0 })
            
            // Chiusura del sipario a fette azzurre
            tl.set('.slice-item', { transformOrigin: 'bottom center' })
            .to('.slice-item', {
                scaleY: 1,
                duration: 0.9,
                stagger: 0.06,
                ease: 'power3.inOut'
            })
            
            // Scambio schede dietro al sipario
            .set(currentSlide, { opacity: 0, pointerEvents: 'none' })
            .set(nextSlide, { opacity: 1, pointerEvents: 'auto' })
            
            // Apertura del sipario verso l'alto
            .set('.slice-item', { transformOrigin: 'top center' })
            .to('.slice-item', {
                scaleY: 0,
                duration: 0.9,
                stagger: 0.06,
                ease: 'power3.inOut'
            })
            
            // Ingresso dei testi e degli evidenziatori sulla nuova slide
            animateSlideEntry(nextSlide)
        }
        
        // Pausa finale
        tl.to({}, { duration: 1.2 })
        
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>