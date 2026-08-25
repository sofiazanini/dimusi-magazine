<template>
  <!-- navbar (mobile e desktop) -->
  <header class="fixed z-50 transition-all duration-300 ease-out bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:top-8 md:left-auto md:translate-x-0 md:right-15"
  :class="[isHeaderVisible
  ? 'opacity-100 translate-y-3 pointer-events-auto' 
  : (isMobile ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-0 -translate-y-4 pointer-events-none')]">
  
    <div class="relative">
      
      <!-- menu a comparsa -->
      <div ref="dropdownRef" v-show="isOpen" class="absolute z-50 bg-[#E5EBE8] border border-black/10 shadow-2xl overflow-hidden select-none rounded-2xl w-[70vw] max-w-sm left-1/2 -translate-x-1/2 bottom-full mb-3 md:bottom-auto md:top-full md:mt-3 md:w-72 md:left-auto md:translate-x-0 md:right-0">
        
        <!-- texture noise -->
        <div class="absolute inset-0 pointer-events-none z-10 opacity-40 mix-blend-multiply rounded-2xl" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg=='); background-repeat: repeat;"></div>
          
        <!-- voci navigazione -->
        <nav class="relative z-20 flex flex-col">
          <div v-for="(item, index) in menuItems" :key="item.label" class="menu-row relative border-b border-black/10 last:border-b-0 group overflow-hidden">

            <!-- colore sfondo attivo su hover e touch -->
            <div class="absolute inset-0 transition-transform duration-200 ease-out origin-left pointer-events-none"
            :class="[item.bgClass,touchedIndex === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100']"></div>
            
            <!-- link -->
            <router-link :to="item.path" @click="handleNavigation(index)" 
            class="relative z-10 flex items-center justify-between px-6 py-4.5 md:py-4 no-underline cursor-pointer transition-transform duration-150 group-hover:translate-x-2 group-active:translate-x-2">
            
              <span class="font-pixel text-3xl sm:text-4xl md:text-3xl leading-none tracking-tight transition-colors duration-150"
              :class="[item.textClass,touchedIndex === index ? 'text-white!' : 'group-hover:text-white! group-active:text-white!']">
              {{ item.label }}</span>
                
              <span class="font-pixel text-xl sm:text-2xl md:text-lg text-white transition-all duration-150" :class="[touchedIndex === index 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-active:opacity-100 group-active:translate-x-0']">
              → </span>
            </router-link>
          </div>
        </nav>
      </div>

      <!-- pulsante trigger -->
      <button type="button" @click="toggleMenu" 
      class="group pointer-events-auto flex items-center gap-2.5 px-4.5 py-2.5 bg-zinc-800 text-white hover:bg-zinc-950 transition-all duration-200 cursor-pointer focus:outline-hidden select-none border border-white/15 shadow-xl rounded-full"
      aria-label="Toggle Menu">
      <span class="font-pixel text-xs md:text-[11px] tracking-widest text-zinc-300 group-hover:text-white transition-colors duration-150 uppercase">
        {{ isOpen ? 'CLOSE' : 'MENU' }}
      </span>

      <div class="relative w-3.5 h-3.5 flex flex-col justify-center items-center pointer-events-none">
        <span 
        class="absolute h-[1.5px] w-3.5 bg-white transition-transform duration-200 ease-out origin-center"
        :class="isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1 group-hover:-translate-y-1.5'"
        ></span>
        <span 
        class="absolute h-[1.5px] w-3.5 bg-white transition-transform duration-200 ease-out origin-center"
        :class="isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1 group-hover:translate-y-1.5'"
        ></span>
      </div>
      </button>

    </div>
  </header>

  <!-- overlay chiusura esterno -->
  <div 
  v-if="isOpen" 
  @click="closeMenu" 
  class="fixed inset-0 z-40 bg-black/25 md:bg-transparent cursor-default transition-opacity"
  ></div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  isIntroDone: { type: Boolean, default: true }
})

const isOpen = ref(false)
const isScrollingUp = ref(false); const isAtTop = ref(true); const isMobile = ref(false)
const dropdownRef = ref(null); const touchedIndex = ref(null); const isDelayedReady = ref(false)

const menuItems = [
{ label: 'HOME', path: '/', bgClass: 'bg-green-mag', textClass: 'text-green-mag' },
{ label: 'GLOSSARIO', path: '/glossario', bgClass: 'bg-[#F59B45]', textClass: 'text-[#F59B45]' },
{ label: 'MAGAZINE', path: '/magazine', bgClass: 'bg-red-mag', textClass: 'text-red-mag' },
{ label: 'SOCIAL', path: '/social', bgClass: 'bg-[#36BDEE]', textClass: 'text-[#36BDEE]' }
]

let lastScrollY = 0

watch(() => props.isIntroDone, (done) => {
  if (done) {
    setTimeout(() => {
      isDelayedReady.value = true
    }, 2300)
  }
}, { immediate: true })

const isHeaderVisible = computed(() => {
  if (isOpen.value) return true
  if (!isDelayedReady.value) return false
  
  if (isMobile.value) {
    return !isAtTop.value && isScrollingUp.value
  }
  
  return isAtTop.value || isScrollingUp.value
})

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  isAtTop.value = currentScrollY <= 60
  
  if (currentScrollY < lastScrollY) {
    isScrollingUp.value = true
  } else if (currentScrollY > lastScrollY) {
    isScrollingUp.value = false
    if (isOpen.value) {
      closeMenu()
    }
  }
  
  lastScrollY = currentScrollY
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize, { passive: true })
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
  window.removeEventListener('scroll', handleScroll)
})

const handleNavigation = (index) => {
  touchedIndex.value = index
  
  setTimeout(() => {
    closeMenu()
    touchedIndex.value = null
  }, 180)
}

const toggleMenu = async () => {
  if (!isOpen.value) {
    isOpen.value = true
    await nextTick()
    if (dropdownRef.value) {
      const origin = isMobile.value ? 'bottom center' : 'top right'
      const startY = isMobile.value ? 10 : -10
      
      gsap.fromTo(
      dropdownRef.value,
      { scale: 0.9, opacity: 0, y: startY, transformOrigin: origin },
      { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: 'power3.out' }
      )
    }
  } else {
    closeMenu()
  }
}

const closeMenu = () => {
  if (!dropdownRef.value) {
    isOpen.value = false
    return
  }
  
  const endY = isMobile.value ? 8 : -8
  
  gsap.to(dropdownRef.value, {
    scale: 0.92,
    opacity: 0,
    y: endY,
    duration: 0.15,
    ease: 'power2.in',
    onComplete: () => {
      isOpen.value = false
    }
  })
}
</script>