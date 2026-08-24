<template>
  <header id="header" class="w-full min-h-screen flex flex-col justify-between items-center box-border relative bg-white text-black px-6 pt-6 md:px-10 md:pt-10 overflow-x-hidden">
    
    <Navbar />
      
    <!-- Logo Grande Full Width su Mobile -->
    <div 
      id="title-mobile" 
      class="w-full flex flex-col items-start z-20 transition-all duration-1000 ease-in-out"
      :class="isIntroDone ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-25'"
    >
      <img src="/logo-dimusi.svg" alt="Dimusi Magazine" class="w-full sm:w-80 md:w-md object-contain object-left"/>
      <p class="text-sm md:text-lg text-zinc-900 mt-2 font-pixel">Il magazine di musica e cultura</p>
    </div>
    
    <div class="w-full"></div>
    
    <div 
      id="header-intro" 
      class="w-full p-4 md:p-5 box-border top-0 left-0 overflow-hidden transition-all duration-500"
      :class="isIntroDone ? 'absolute z-10 h-svh' : 'fixed z-10 h-dvh'"
    >
      <div 
        id="header-intro-photo-normal" 
        class="relative w-full h-full z-20 flex box-border will-change-auto transition-all duration-1000 ease-out"
        :style="{ clipPath: currentClipPath }"
      >
        <video 
          :src="landingVideo" 
          autoplay 
          muted 
          loop 
          playsinline 
          class="w-full h-full object-cover transition-opacity duration-500" 
          :style="{ transform: `scale(${imgScale})` }"
        ></video>
      </div>

      <div id="header-intro-colors" class="w-full h-full absolute top-0 left-0">
        <div class="header-intro-color w-full h-full absolute top-0 left-0 bg-white"></div>
        <div class="header-intro-color w-full h-full absolute top-0 left-0 bg-green-mag -translate-y-full" ref="color2"></div>
      </div>
    </div>
  </header>

  <section class="w-full h-100 bg-white text-black p-6 md:p-10">
    <h2 class="text-2xl font-bold mb-4 font-pixel">Benvenuti su Dimusi Magazine</h2>
    <p class="text-lg font-mono">Scopri l'ultima musica e la cultura italiana</p>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import landingVideo from '../assets/landing-video-effects.mp4'
import Navbar from '../components/Navbar.vue'

const clipProgress = ref(0)
const imgScale = ref(1)
const isIntroDone = ref(false)
const color2 = ref(null)

let isOutside = false
const mouse = { t: 0.45, c: 0.45 }

const handleMouseMove = (e) => {
  const l = e.clientY / window.innerHeight
  const minR = (window.innerHeight * 0.15 - 30) / window.innerHeight
  mouse.t = Math.max(minR, Math.min(0.45, l))
}

const updateClipPath = () => {
  mouse.c += (mouse.t - mouse.c) * 0.09
  clipProgress.value = mouse.c
  imgScale.value = 1 + (0.45 - mouse.c) / 0.45 * 0.2
  
  if (!isOutside) {
    requestAnimationFrame(updateClipPath)
  }
}

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      isIntroDone.value = true
      setTimeout(() => {
        window.addEventListener('mousemove', handleMouseMove)
        requestAnimationFrame(updateClipPath)
      }, 500)
    }
  })
  
  tl.to(color2.value, { duration: 1.5, y: '0%', ease: 'expo.inOut' })
    .to(color2.value, { duration: 0.5, y: '100%', ease: 'power2.inOut' }, '+=0.2')
    // Anima solo la navbar desktop
    .fromTo('#desktop-navbar', 
      { opacity: 0, y: -15 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 
      '-=0.8'
    )
})

onUnmounted(() => {
  isOutside = true
  window.removeEventListener('mousemove', handleMouseMove)
})

const currentClipPath = computed(() => {
  const progress = isIntroDone.value ? 45 : clipProgress.value * 100
  return `inset(${progress}% 0.1px 0.1px 0.1px round 20px)`
})
</script>