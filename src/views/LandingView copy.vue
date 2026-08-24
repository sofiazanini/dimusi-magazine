<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


import ConceptSection from '../components/ConceptSection.vue'
import landingVideo from '../assets/landing-video-effects.mp4'
import PreGlossarioSection from '../components/PreGlossarioSection.vue'
import GlossarioSection from '../components/GlossarioSection.vue'
import PiuGrandeSection from '../components/PiuGrandeSection.vue'
import PrimoVolumeSection from '../components/PrimoVolumeSection.vue'
import SocialSection from '../components/SocialSection.vue'

gsap.registerPlugin(ScrollTrigger)

const heroSection = ref(null)
const heroVideoContainer = ref(null)
const logoHeader = ref(null)
const scrollIndicator = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection.value,
      start: 'top top',
      end: '+=3500', 
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  })
  
  // Misura l'altezza REALE del logo a larghezza piena (cambia da schermo a schermo)
  const getRemainingHeight = () => {
    const logoH = logoHeader.value.offsetHeight
    const topGap = 16
    const bottomGap = window.innerHeight * 0.03
    const innerGap = 16
    return window.innerHeight - logoH - topGap - bottomGap - innerGap
  }
  
  tl.fromTo(
  heroVideoContainer.value,
  { width: '50vw', height: '40vh', borderRadius: '2rem', bottom: '30vh' },
  { width: '98vw', height: '98vh', borderRadius: '2rem', bottom: '3vh', ease: 'none', duration: 1 }
  )
  .to(scrollIndicator.value, { opacity: 0, duration: 0.1 }, 0)
  
  .to(
  heroVideoContainer.value,
  {
    width: '98vw',
    height: () => `${getRemainingHeight()}px`,
    borderRadius: '2rem',
    ease: 'power1.inOut',
    duration: 1
  }
  )
  
  .to(logoHeader.value, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
})
</script>

<template>
  <!-- HERO SECTION -->
  <section ref="heroSection" id="hero-section" class="relative w-screen h-screen overflow-hidden bg-white">
    
    <!-- logo -->
    <div ref="logoHeader" class="absolute top-4 left-0 w-full z-30 opacity-0 transform -translate-y-4 flex justify-center items-center px-4 pointer-events-none">
      <img src="/logo-dimusi.svg" alt="Dimusi Magazine" class="w-full object-contain object-top"/>
    </div>
    
    <!-- video -->
    <div ref="heroVideoContainer" class="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden z-10 w-full h-auto rounded-xl">
      <video :src="landingVideo" autoplay muted loop playsinline class="w-full h-full object-cover"></video>
    </div>
    
    <!-- scroll scritta -->
    <div ref="scrollIndicator" class="absolute bottom-6 w-full flex justify-center z-20 text-zinc-600 font-mono text-xs tracking-widest uppercase">
      [ scorri per lacerare il velo ]
    </div>
  </section>
  
  <!-- SEZIONI SUCCESSIVE (Scorrono sotto la cornice video) -->
  <div class="relative z-20 bg-white">
    <ConceptSection />
    <PreGlossarioSection />
    <GlossarioSection />
    <PiuGrandeSection />
    <PrimoVolumeSection />
    <SocialSection />
  </div>
</template>