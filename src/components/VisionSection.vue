<template>
    <div class="relative w-full">
        <section ref="sectionEl" class="relative w-full h-screen bg-white text-zinc-950 overflow-hidden p-6 md:p-12 lg:p-16 flex flex-col justify-between">
            <div class="flex items-center justify-between font-clash text-xs uppercase tracking-widest text-zinc-500 border-b border-black/10 pb-4 z-10">
                <p><span ref="statusLabelRef">// LA RICERCA DEL SACRO</span></p>
            </div>
            
            <div ref="containerEl" class="relative z-10 flex h-full items-center will-change-transform my-auto">
                <!-- domanda iniziale -->
                <div class="w-auto flex flex-col justify-center px-0 sm:px-12 md:px-20 shrink-0 mr-12 md:mr-20">
                    <div class="max-w-screen md:max-w-4xl space-y-6">
                        <div class="overflow-hidden">
                            <p class="font-pixel text-xs sm:text-sm text-zinc-800 tracking-widest uppercase block">[ ok ma... ]</p>
                        </div>
                        <div class="overflow-hidden">
                            <h2 ref="qTextEl" class="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-zinc-300">
                                Come si rimette la musica al centro?
                            </h2>
                        </div>
                        <div class="overflow-hidden pt-2">
                            <p ref="leadTextEl" class="font-clash text-2xl sm:text-3xl text-zinc-900 tracking-tight">
                                Serve qualcosa di grande.
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- più grande -->
                <div class="w-auto flex flex-col justify-center px-0 sm:px-24 md:px-32 shrink-0">
                    <div class="flex flex-col leading-[0.80] select-none font-pixel text-[clamp(6rem,35vw,24rem)] tracking-tighter text-zinc-300">
                        <span ref="bigWord1El" class="will-change-transform">Più</span>
                        <span ref="bigWord2El" class="pl-10 sm:pl-20 md:pl-50 will-change-transform">grande</span>
                    </div>
                </div>
                
                <!-- due blocchi -->
                <div class="w-auto flex flex-col justify-center px-4 sm:px-12 md:px-20 shrink-0 ml-20 md:ml-36 lg:ml-48">
                    <div class="max-w-screen md:max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-50 items-start">
                        
                        <div ref="sacredBlockEl" class="space-y-4 border-l-2 border-red-mag pl-6 md:pl-8 will-change-transform">
                            <span class="font-pixel text-xs text-red-mag tracking-widest uppercase block">[ IL DIVINO ]</span>
                            <p class="font-clash text-2xl sm:text-3xl md:text-5xl text-zinc-900 leading-snug">Le divinità superano i limiti umani: 
                                <span class="marker-highlight marker-red inline">non hanno confini.</span>
                            </p>
                        </div>
                        
                        <div ref="soundBlockEl" class="space-y-4 border-l-2 border-green-mag pl-6 md:pl-8 will-change-transform">
                            <span class="font-pixel text-xs text-green-mag tracking-widest uppercase block">[ IL SUONO ]</span>
                            <p class="font-clash text-2xl sm:text-3xl md:text-5xl text-zinc-900 leading-snug">Anche la musica è immensa: 
                                <span class="marker-highlight inline">può essere divina.</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- spongebob -->
                <div class="w-screen flex items-center justify-center shrink-0 px-8 md:px-0">
                    <div class="max-w-5xl flex flex-col space-y-8 md:space-y-12">
                        <div class="overflow-hidden pt-4 pb-2 flex flex-col sm:flex-row sm:items-end justify-between max-w-4xl">
                            <h3 ref="genesisTitleEl" class="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-950 tracking-tight leading-none will-change-transform">
                                È così che nasce <span class="text-red-mag">Dimusi</span>.
                            </h3>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                            <div ref="spongebobWrapperEl" class="md:col-span-7 flex flex-col items-start space-y-2 will-change-transform">
                                <div class="group relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-2xl bg-zinc-950 border border-black/10 transition-transform duration-500 ease-out hover:scale-105 hover:-rotate-2">
                                    <img :src="spongebobImg" alt="Spongebob in levitazione" class="w-full h-full object-cover scale-105 transition-transform duration-500 ease-out group-hover:scale-110" />
                                </div>
                            </div>
                            
                            <div ref="genesisTextEl" class="md:col-span-5 flex flex-col justify-center space-y-4 border-l-2 border-black/10 pl-6 md:pl-8 will-change-transform">
                                <p class="font-clash text-lg sm:text-xl md:text-2xl text-zinc-800 leading-normal">
                                    Nasce per <span class="border-b border-red-mag text-red-mag">dare un nome</span> a quello che succede quando una canzone smette di essere un solo suono ma, <span class="marker-highlight inline">ti solleva completamente da terra.</span>
                                </p>
                                <p class="font-pixel text-xs text-zinc-400 tracking-widest uppercase block">
                                <span class="inline md:hidden">↑ </span><span class="hidden md:inline">← </span>Di base, questa sensazione</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <!-- angoli sotto -->
            <div class="relative z-30 flex justify-between items-end font-clash text-xs text-zinc-400 pt-4 border-t border-black/5">
                <p ref="footerLabelRef">###</p>
                <p>( SCROLL )</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import spongebobImg from '../assets/spongebob.webp'

gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionEl = ref(null), containerEl = ref(null), statusLabelRef = ref(null), footerLabelRef = ref(null)
const qTextEl = ref(null), leadTextEl = ref(null), bigWord1El = ref(null), bigWord2El = ref(null)
const sacredBlockEl = ref(null), soundBlockEl = ref(null)
const genesisTitleEl = ref(null), spongebobWrapperEl = ref(null), genesisTextEl = ref(null)

let splitQ, splitWord1, splitWord2, tlMain

onMounted(async () => {
    if (document.fonts?.ready) await document.fonts.ready
    
    // split dei testi
    splitQ = SplitText.create(qTextEl.value, { type: 'lines, words, chars', mask: 'lines' })
    splitWord1 = SplitText.create(bigWord1El.value, { type: 'chars' })
    splitWord2 = SplitText.create(bigWord2El.value, { type: 'chars' })
    
    // stati iniziali
    gsap.set([...splitQ.chars, ...splitWord1.chars, ...splitWord2.chars], { color: '#d4d4d8' })
    gsap.set(leadTextEl.value, { yPercent: 100, opacity: 0 })
    gsap.set([sacredBlockEl.value, soundBlockEl.value], { opacity: 0, y: 35 })
    gsap.set(genesisTitleEl.value, { yPercent: 120, opacity: 0 })
    gsap.set(spongebobWrapperEl.value, { opacity: 0, scale: 0.9, y: 30 })
    gsap.set(genesisTextEl.value, { opacity: 0, x: 30 })
    
    // timeline orizzontale per lo scroll
    tlMain = gsap.timeline({
        scrollTrigger: {
            trigger: sectionEl.value,
            start: 'top top',
            end: () => `+=${containerEl.value.scrollWidth + 1400}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    })
    
    // domanda iniziale
    tlMain
    .from(splitQ.lines, { yPercent: 120, opacity: 0, duration: 0.6, ease: 'power3.out' }, 0)
    .to(splitQ.chars, { color: '#BD252C', stagger: 0.015, duration: 0.4 }, 0.2)
    .to(leadTextEl.value, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.5)
    
    // scorrimento orizzontale continuo
    tlMain.to(containerEl.value, {
        x: () => -(containerEl.value.scrollWidth - window.innerWidth),
        ease: 'none',
        duration: 12
    }, 1.2)
    
    // più grande
    const allBigChars = [...splitWord1.chars, ...splitWord2.chars]
    allBigChars.forEach((char, index) => {
        const startTime = 2.8 + (index * 0.08)
        tlMain.fromTo(char,
        { yPercent: gsap.utils.random(-180, 180), rotation: gsap.utils.random(-25, 25), opacity: 0, scale: 0.6 },
        { yPercent: 0, rotation: 0, opacity: 1, scale: 1, color: '#BD252C', ease: 'back.out(1.6)', duration: 1.2 },
        startTime
        )
    })
    
    // due blocchi
    tlMain
    .to(sacredBlockEl.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 6.2)
    .to(soundBlockEl.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 6.7)
    .to([sacredBlockEl.value.querySelector('.marker-highlight'), soundBlockEl.value.querySelector('.marker-highlight')], {
        backgroundPosition: '0% 0%',
        color: '#ffffff',
        stagger: 0.9,
        duration: 0.7,
        ease: 'power2.out'
    }, 7.2)
    
    // cambio didascalia
    tlMain.add(() => {
        const isForward = tlMain.scrollTrigger ? tlMain.scrollTrigger.direction === 1 : true
        if (statusLabelRef.value) {
            statusLabelRef.value.innerText = isForward ? '// LA SOLUZIONE' : '// LA RICERCA DEL SACRO'
        }
    }, 9.8)
    
    // spongebob
    tlMain
    .to(genesisTitleEl.value, { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 12.0)
    .to(spongebobWrapperEl.value, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 13.4)
    .to(genesisTextEl.value, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 14.8)
    .to(genesisTextEl.value.querySelector('.marker-highlight'), {
        backgroundPosition: '0% 0%',
        color: '#ffffff',
        duration: 0.7,
        stagger: 1,
        ease: 'power2.out'
    }, 18)
    
    // pausa finale di lettura
    tlMain.to({}, { duration: 1.8 })
})

onBeforeUnmount(() => {
    splitQ?.revert()
    splitWord1?.revert()
    splitWord2?.revert()
    tlMain?.kill()
    ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>