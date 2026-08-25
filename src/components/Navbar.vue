<template>
  <!-- 1. CONTENITORE NAVBAR: In basso al centro su Mobile, in alto a destra su Desktop -->
  <header 
    class="fixed z-50 transition-all duration-300 ease-out bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:top-6 md:left-auto md:translate-x-0 md:right-8"
    :class="[
      isHeaderVisible
        ? 'opacity-100 translate-y-0 pointer-events-auto' 
        : (isMobile ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-0 -translate-y-4 pointer-events-none')
    ]"
  >
    <div class="relative">
      
      <!-- 2. DROPOVER / DROPUP MENU (70vw su Mobile con apertura verso l'alto) -->
      <div 
        ref="dropdownRef"
        v-show="isOpen"
        class="absolute z-50 bg-[#E5EBE8] border border-black/15 shadow-2xl overflow-hidden select-none rounded-2xl w-[70vw] max-w-sm left-1/2 -translate-x-1/2 bottom-full mb-3 md:bottom-auto md:top-full md:mt-3 md:w-72 md:left-auto md:translate-x-0 md:right-0"
      >
        <!-- Texture Noise coordinata con la Landing Page -->
        <div 
          class="absolute inset-0 pointer-events-none z-10 opacity-40 mix-blend-multiply rounded-2xl" 
          style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg=='); background-repeat: repeat;"
        ></div>

        <!-- Elenco Voci di Navigazione -->
        <nav class="relative z-20 flex flex-col">
          <div 
            v-for="(item, index) in menuItems" 
            :key="item.label"
            class="menu-row relative border-b border-black/10 last:border-b-0 group overflow-hidden"
          >
            <!-- Sfondo colorato attivo su hover (desktop) e touch/click (mobile) -->
            <div 
              class="absolute inset-0 transition-transform duration-200 ease-out origin-left pointer-events-none"
              :class="[
                item.bgClass,
                touchedIndex === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100'
              ]"
            ></div>

            <!-- Link di navigazione con routing -->
            <router-link 
              :to="item.path" 
              @click="handleNavigation(item, index, $event)" 
              class="relative z-10 flex items-center justify-between px-6 py-4.5 md:py-4 no-underline cursor-pointer transition-transform duration-150 group-hover:translate-x-2 group-active:translate-x-2"
            >
              <!-- Testo della voce in font pixel -->
              <span 
                class="font-pixel text-3xl sm:text-4xl md:text-3xl leading-none tracking-tight transition-colors duration-150"
                :class="[
                  item.textClass,
                  touchedIndex === index ? '!text-white' : 'group-hover:!text-white group-active:!text-white'
                ]"
              >
                {{ item.label }}
              </span>

              <!-- Freccia bianca di selezione -->
              <span 
                class="font-pixel text-xl sm:text-2xl md:text-lg text-white transition-all duration-150"
                :class="[
                  touchedIndex === index 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-active:opacity-100 group-active:translate-x-0'
                ]"
              >
                →
              </span>
            </router-link>
          </div>
        </nav>
      </div>

      <!-- 3. PULSANTE TRIGGER (MENU / CLOSE) -->
      <button 
        type="button"
        @click="toggleMenu" 
        class="group pointer-events-auto flex items-center gap-2.5 px-4.5 py-2.5 bg-zinc-950 text-white hover:bg-zinc-800 transition-all duration-200 cursor-pointer focus:outline-hidden select-none border border-white/15 shadow-xl rounded-full"
        aria-label="Toggle Menu"
      >
        <span class="font-pixel text-xs md:text-[11px] tracking-widest text-zinc-300 group-hover:text-white transition-colors duration-150 uppercase">
          {{ isOpen ? 'CLOSE' : 'MENU' }}
        </span>

        <!-- Icona a lineette animate -->
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

  <!-- 4. OVERLAY PER CHIUSURA AL TOCCO ESTERNO -->
  <div 
    v-if="isOpen" 
    @click="closeMenu" 
    class="fixed inset-0 z-40 bg-black/25 md:bg-transparent cursor-default transition-opacity"
  ></div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import gsap from 'gsap'

const props = defineProps({
  isIntroDone: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()
const route = useRoute()

const isOpen = ref(false)
const isScrollingUp = ref(false)
const isAtTop = ref(true)
const isMobile = ref(false)
const dropdownRef = ref(null)
const touchedIndex = ref(null)

// 4 Voci collegate ai componenti dell'applicazione
const menuItems = [
  { 
    label: 'HOME', 
    path: '/', 
    bgClass: 'bg-green-mag', 
    textClass: 'text-green-mag' 
  },
  { 
    label: 'GLOSSARIO', 
    path: '/#glossario', // Scrolla alla sezione Glossario presente nella Landing
    isScrollSection: true,
    bgClass: 'bg-[#F59B45]', 
    textClass: 'text-[#F59B45]' 
  },
  { 
    label: 'MAGAZINE', 
    path: '/magazine', 
    isPending: true, // Segnaposto in attesa di creare la vista dedicata
    bgClass: 'bg-red-mag', 
    textClass: 'text-red-mag' 
  },
  { 
    label: 'SOCIAL', 
    path: '/social', // Collegato a ProfileView.vue nel router
    bgClass: 'bg-[#36BDEE]', 
    textClass: 'text-[#36BDEE]' 
  }
]

let lastScrollY = 0

// Calcolo reattivo della visibilità dell'header
const isHeaderVisible = computed(() => {
  if (isOpen.value) return true
  if (!props.isIntroDone) return false

  // Su mobile: nascosto nella Hero in cima, visibile in scroll-up
  if (isMobile.value) {
    return !isAtTop.value && isScrollingUp.value
  }

  // Su desktop: visibile in cima e in scroll-up
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

// Gestione del click, feedback touch e routing
const handleNavigation = (item, index, event) => {
  touchedIndex.value = index

  // Se è la sezione glossario nella stessa pagina, effettua lo scroll fluido
  if (item.isScrollSection && route.path === '/') {
    event.preventDefault()
    const glossarioElem = document.getElementById('glossario') || document.querySelector('.glossario-section')
    if (glossarioElem) {
      glossarioElem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Se la pagina magazine è ancora in lavorazione
  if (item.isPending) {
    // Lascia la navigazione o inserisci una gestione provvisoria
  }

  setTimeout(() => {
    closeMenu()
    touchedIndex.value = null
  }, 180)
}

// Apertura fluida con GSAP (dal basso su mobile, dall'alto su desktop)
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

// Chiusura fluida con GSAP
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