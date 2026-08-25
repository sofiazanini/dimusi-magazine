<template>
    <div class="relative w-full">
        <section ref="sectionRef" class="relative w-full min-h-screen bg-white flex flex-col justify-between p-6 md:p-12 lg:p-16 z-20 select-none overflow-hidden">
            <!-- Didascalia Superiore Fissa -->
            <div class="flex items-center justify-between font-clash text-xs uppercase tracking-widest text-zinc-500 border-b border-black/10 pb-4 z-10">
                <p class="flex items-center gap-3">
                    <span class="w-2 h-2 bg-red-600 inline-block animate-pulse"></span>
                    <span ref="statusLabelRef">// 01 MANIFESTO</span>
                </p>
                <p class="font-mono text-zinc-400 text-xs">// RESEARCH</p>
            </div>
            
            <!-- Stage Centrale -->
            <div class="relative w-full my-auto min-h-125 flex items-center justify-center perspective-[1000px]">
                
                <!-- 01. MANIFESTO -->
                <div ref="step1Ref" class="w-full max-w-6xl">
                    <p class="font-pixel text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
                        <span v-for="(word, index) in baseWords" :key="'base-' + index" class="story-word-base inline-block mr-[0.25em] text-black opacity-15 will-change-transform">{{ word }}</span>
                        <span ref="underlineSpanRef" class="inline bg-linear-to-r from-red-600 to-red-600 bg-no-repeat bg-bottom pb-1 bg-size-[0%_2px]">
                            <span v-for="(word, index) in highlightWords" :key="'high-' + index" class="story-word-highlight inline-block mr-[0.25em] text-black opacity-15 will-change-transform">{{ word }}</span>
                        </span>
                    </p>
                </div>
                
                <!-- 02. DOMANDA 01 -->
                <div ref="stepQ1Ref" class="w-full max-w-6xl absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none">
                    <span class="q1-bg-num absolute top-2 md:top-4 left-0 font-pixel text-9xl sm:text-8xl md:text-9xl lg:text-[180px] text-black/6 leading-none select-none pointer-events-none -z-10 translate-y-8">
                        01
                    </span>
                    
                    <div class="space-y-2 md:space-y-4 relative z-10">
                        <div class="overflow-hidden">
                            <p class="q1-tag font-mono text-xs sm:text-sm text-red-600 uppercase tracking-widest block translate-y-full">
                                [ Q.01 — IL RUOLO DELL'ANIMA ]
                            </p>
                        </div>
                        
                        <div class="overflow-hidden">
                            <p class="q1-row-1 font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-black leading-none tracking-tight translate-y-full will-change-transform">
                                «Può l'anima resistere
                            </p>
                        </div>
                        
                        <div class="overflow-hidden pl-8 sm:pl-16 md:pl-28">
                            <p class="q1-row-2 font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-red-600 leading-none tracking-tight translate-y-full will-change-transform">
                                senza musica?»
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- 02. DOMANDA 02 -->
                <div ref="stepQ2Ref" class="w-full max-w-6xl absolute inset-0 flex flex-col justify-center items-end text-right opacity-0 pointer-events-none">
                    <span class="q2-bg-num absolute top-2 md:top-4 right-0 font-pixel text-9xl sm:text-8xl md:text-9xl lg:text-[180px] text-black/6 leading-none select-none pointer-events-none -z-10 translate-y-8">
                        02
                    </span>
                    
                    <div class="space-y-2 md:space-y-4 max-w-4xl relative z-10">
                        <div class="overflow-hidden">
                            <p class="q2-tag font-mono text-xs sm:text-sm text-red-600 uppercase tracking-widest block translate-y-full">
                                [ Q.02 — IL RUOLO DELL'ANIMA ]
                            </p>
                        </div>
                        
                        <div class="overflow-hidden">
                            <p class="q2-row-1 font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-black leading-none tracking-tight translate-y-full will-change-transform">
                                «Cosa trasmette la musica
                            </p>
                        </div>
                        
                        <div class="overflow-hidden pr-4 sm:pr-12 pb-2">
                            <p class="q2-row-2 font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-black italic leading-none tracking-tight translate-y-full will-change-transform">
                                <span class="inline-block border-b-2 border-red-600 pb-1">all'anima?»</span>
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <!-- Footer -->
            <div class="flex justify-between items-end font-clash text-xs text-zinc-400 pt-4 border-t border-black/5 z-10">
                <p ref="footerLabelRef">01 / 03</p>
                <p>( SCROLL )</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null), statusLabelRef = ref(null), footerLabelRef = ref(null), underlineSpanRef = ref(null)
const step1Ref = ref(null), stepQ1Ref = ref(null), stepQ2Ref = ref(null)
const baseWords = 'Dimusi è uno spazio editoriale e digitale dedicato alla'.split(' ')
const highlightWords = 'ricerca del divino nella musica contemporanea.'.split(' ')

let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.value,
                start: 'top top',
                end: '+=3800',
                pin: true,
                scrub: 0.6,
                anticipatePin: 1
            }
        })
        
        // --- 1. MANIFESTO (01 / 03) ---
        tl.to('.story-word-base', { opacity: 1, stagger: 0.08, ease: 'power1.out' })
        .to('.story-word-highlight', { opacity: 1, color: '#dc2626', stagger: 0.09, ease: 'power2.out' }, '+=0.04')
        .to(underlineSpanRef.value, { backgroundSize: '100% 2px', duration: 0.5, ease: 'power2.out' }, '-=0.15')
        .to({}, { duration: 0.4 })
        
        // Transizione -> Domanda 01
        .to(step1Ref.value, { opacity: 0, y: -20, scale: 0.96, duration: 0.5, ease: 'power2.in' })
        .add(() => {
            const isForward = tl.scrollTrigger ? tl.scrollTrigger.direction === 1 : true
            if (isForward) {
                if (statusLabelRef.value) statusLabelRef.value.innerText = '// 02 INDAGINE'
                if (footerLabelRef.value) footerLabelRef.value.innerText = '02 / 03'
            } else {
                if (statusLabelRef.value) statusLabelRef.value.innerText = '// 01 MANIFESTO'
                if (footerLabelRef.value) footerLabelRef.value.innerText = '01 / 03'
            }
        })
        .set(stepQ1Ref.value, { opacity: 1 })
        
        // --- 2. DOMANDA 01 ---
        .to('.q1-bg-num', { y: 0, opacity: 1, duration: 1, ease: 'power2.out' })
        .to(['.q1-tag', '.q1-row-1', '.q1-row-2'], {
            y: '0%',
            rotateX: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out'
        }, '-=0.8')
        .to({}, { duration: 0.8 })
        
        // Uscita Domanda 01
        .to(['.q1-tag', '.q1-row-1', '.q1-row-2'], {
            y: '-110%',
            stagger: 0.06,
            duration: 0.6,
            ease: 'power3.in'
        })
        .to('.q1-bg-num', { opacity: 0, y: -30, duration: 0.4 }, '-=0.4')
        .set(stepQ1Ref.value, { opacity: 0 })
        .set(stepQ2Ref.value, { opacity: 1 })
        
        // --- 3. DOMANDA 02 ---
        .to('.q2-bg-num', { y: 0, opacity: 1, duration: 1, ease: 'power2.out' })
        .to(['.q2-tag', '.q2-row-1', '.q2-row-2'], {
            y: '0%',
            rotateX: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out'
        }, '-=0.8')
        .to({}, { duration: 0.8 })
        
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>