<template>
  <!-- 1. BARRA MOBILE -->
  <header 
    class="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 pointer-events-none border-b"
    :class="[
      isOpen 
        ? 'translate-y-0 opacity-100 bg-transparent border-transparent' 
        : (isScrollingUp 
            ? 'translate-y-0 opacity-100 bg-white/90 backdrop-blur-md border-black' 
            : '-translate-y-full opacity-0 bg-transparent border-transparent')
    ]"
  >
    <!-- Logo piccolo: scompare a menu aperto -->
    <router-link 
      to="/" 
      class="flex items-center transition-opacity duration-200"
      :class="(isScrollingUp && !isOpen) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    >
      <img src="/logo-dimusi.svg" alt="Dimusi Magazine" class="h-6 w-auto object-contain brightness-0" />
    </router-link>

    <!-- Bottone mobile -->
    <button 
      @click="toggleMenu" 
      class="group flex flex-col justify-center items-end gap-1.5 w-7 h-7 cursor-pointer focus:outline-none"
      :class="(isScrollingUp || isOpen) ? 'pointer-events-auto' : 'pointer-events-none'"
      aria-label="Toggle Menu"
    >
      <span 
        class="w-6 h-0.5 transition-all duration-200 origin-center"
        :class="isOpen ? (isFirstItemHovered ? 'bg-white rotate-45 translate-y-2' : 'bg-black rotate-45 translate-y-2') : 'bg-black'"
      ></span>
      <span 
        class="w-4 h-0.5 transition-all duration-200"
        :class="isOpen ? 'opacity-0 bg-black' : 'bg-black opacity-100'"
      ></span>
      <span 
        class="w-6 h-0.5 transition-all duration-200 origin-center"
        :class="isOpen ? (isFirstItemHovered ? 'bg-white -rotate-45 -translate-y-2' : 'bg-black -rotate-45 -translate-y-2') : 'bg-black'"
      ></span>
    </button>
  </header>

  <!-- 2. NAVBAR DESKTOP -->
  <header 
    id="desktop-navbar"
    @mouseenter="handleHeaderEnter"
    @mouseleave="handleHeaderLeave"
    class="hidden md:flex fixed top-0 left-0 w-full z-50 items-center justify-between px-10 py-4 transition-all duration-300 pointer-events-none border-b"
    :class="[
      isOpen 
        ? 'translate-y-0 opacity-100 bg-transparent border-transparent' 
        : (isScrollingUp 
            ? 'translate-y-0 opacity-100 bg-white/90 backdrop-blur-md border-black' 
            : '-translate-y-full opacity-0 bg-transparent border-transparent')
    ]"
  >
    <!-- Logo desktop: scompare a menu aperto -->
    <router-link 
      to="/" 
      class="flex items-center transition-all duration-200"
      :class="(isScrollingUp && !isOpen) ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'"
    >
      <img src="/logo-dimusi.svg" alt="Dimusi Magazine" class="h-7 w-auto object-contain brightness-0" />
    </router-link>

    <!-- Bottone Desktop -->
    <button 
      @click="toggleMenu" 
      class="group flex flex-col justify-center items-end gap-1.5 w-8 h-8 cursor-pointer focus:outline-none"
      :class="(isScrollingUp || isOpen) ? 'pointer-events-auto' : 'pointer-events-none'"
      aria-label="Toggle Menu"
    >
      <span 
        class="w-7 h-0.5 transition-all duration-200 origin-center"
        :class="isOpen ? (isFirstItemHovered ? 'bg-white rotate-45 translate-y-2' : 'bg-black rotate-45 translate-y-2') : 'bg-black'"
      ></span>
      <span 
        class="w-5 h-0.5 transition-all duration-200 group-hover:w-7"
        :class="isOpen ? 'opacity-0 bg-black' : 'bg-black opacity-100'"
      ></span>
      <span 
        class="w-7 h-0.5 transition-all duration-200 origin-center"
        :class="isOpen ? (isFirstItemHovered ? 'bg-white -rotate-45 -translate-y-2' : 'bg-black -rotate-45 -translate-y-2') : 'bg-black'"
      ></span>
    </button>
  </header>

  <!-- 3. MENU OVERLAY FULLSCREEN -->
  <Teleport to="body">
    <aside 
      ref="navOverlay" 
      class="fixed inset-0 w-screen h-screen bg-green-mag z-40 flex flex-col justify-between p-0 invisible select-none overflow-hidden"
      style="clip-path: inset(0 0 100% 0);"
    >
      <nav class="flex-1 flex flex-col justify-stretch w-full h-full">
        <div 
          v-for="(item, index) in menuItems" 
          :key="item.path"
          @mouseenter="index === 0 ? (isFirstItemHovered = true) : null"
          @mouseleave="index === 0 ? (isFirstItemHovered = false) : null"
          class="menu-row relative flex-1 flex border-b border-black/10 last:border-b-0 group overflow-hidden"
        >
          <div class="absolute inset-0 bg-black scale-y-0 md:group-hover:scale-y-100 group-active:scale-y-100 transition-transform duration-200 md:duration-300 ease-out origin-center pointer-events-none"></div>

          <router-link 
            :to="item.path" 
            @click="toggleMenu" 
            class="relative z-10 w-full h-full flex items-center justify-center md:gap-14 no-underline px-4 md:px-12"
          >
            <span class="hidden md:inline-block font-pixel text-4xl lg:text-6xl text-neutral-400 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out shrink-0 select-none">
              0{{ index + 1 }}
            </span>

            <div class="h-14 md:h-16 lg:h-24 overflow-hidden flex flex-col text-5xl md:text-6xl lg:text-8xl leading-none">
              <div class="flex flex-col transition-transform duration-200 md:duration-300 ease-out md:group-hover:-translate-y-1/2 group-active:-translate-y-1/2">
                <span class="font-pixel text-black h-14 md:h-16 lg:h-24 flex items-center justify-center tracking-wide text-center">
                  {{ item.label }}
                </span>
                <span class="font-pixel text-white h-14 md:h-16 lg:h-24 flex items-center justify-center tracking-wide text-center">
                  {{ item.label }}
                </span>
              </div>
            </div>

            <span class="hidden md:inline-block font-pixel text-4xl lg:text-6xl text-neutral-400 opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out shrink-0 select-none">
              0{{ index + 1 }}
            </span>
          </router-link>
        </div>
      </nav>
    </aside>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const isOpen = ref(false)
const isScrollingUp = ref(false)
const isFirstItemHovered = ref(false)
const isHeaderHovered = ref(false)
const navOverlay = ref(null)

const menuItems = [
  { label: 'HOME', path: '/' },
  { label: 'GLOSSARIO', path: '/glossario' },
  { label: 'MAGAZINE', path: '/magazine' },
  { label: 'SOCIAL', path: '/social' }
]

let tl = null
let lastScrollY = 0
let scrollTimeout = null

const startHideTimer = () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    if (!isHeaderHovered.value) {
      isScrollingUp.value = false
    }
  }, 1800)
}

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > 80 && currentScrollY < lastScrollY) {
    isScrollingUp.value = true
    startHideTimer()
  } else if (currentScrollY > lastScrollY && !isHeaderHovered.value) {
    isScrollingUp.value = false
    clearTimeout(scrollTimeout)
  }

  lastScrollY = currentScrollY
}

const handleHeaderEnter = () => {
  isHeaderHovered.value = true
  clearTimeout(scrollTimeout)
}

const handleHeaderLeave = () => {
  isHeaderHovered.value = false
  startHideTimer()
}

onMounted(() => {
  gsap.set(navOverlay.value, { autoAlpha: 1 })
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (tl) tl.kill()
  clearTimeout(scrollTimeout)
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  isFirstItemHovered.value = false

  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
    if (tl) tl.kill()

    const rows = navOverlay.value.querySelectorAll('.menu-row')
    tl = gsap.timeline()
    tl.fromTo(
      navOverlay.value, 
      { clipPath: 'inset(0 0 100% 0)' }, 
      { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.inOut' }
    )
    .fromTo(
      rows,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out' },
      '-=0.3'
    )
  } else {
    document.body.style.overflow = ''
    if (tl) tl.kill()

    tl = gsap.timeline()
    tl.to(navOverlay.value, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.45,
      ease: 'power3.inOut'
    })
  }
}
</script>