<template>
  <div class="relative w-full h-screen bg-white text-zinc-950 flex flex-col justify-between p-6 md:p-10 overflow-hidden select-none">
    <Navbar />
    <header class="w-full pt-4 md:pt-6 pb-4 flex flex-col items-start text-left gap-2 shrink-0">
      <h1 class="w-full font-pixel text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-zinc-950 leading-none tracking-tighter uppercase whitespace-nowrap will-change-transform">
        MAGAZINE
      </h1>
      <p class="font-pixel text-xs text-zinc-400 tracking-widest pl-1 md:pl-2">
        [ ARCHIVIO VOLUMI CARTACEI ]
      </p>
    </header>
    
    <!-- griglia -->
    <main class="w-full flex-1 flex items-center justify-center my-auto py-2">
      <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-start">
        
        <!-- vol 01 -->
        <router-link to="/magazine/vol-01" class="group flex flex-col space-y-3 no-underline text-zinc-950 cursor-pointer w-full">
          <div class="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-xl bg-zinc-900 border border-black/10 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-1">
            <img :src="coverVol1" alt="Dimusi Vol. 01 - Dove il velo si lacera" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"/>
            <div class="absolute bottom-3 right-3 bg-red-mag text-white font-pixel text-xs tracking-widest px-3 py-1 rounded-full uppercase shadow-md">
              DISPONIBILE
            </div>
          </div>
          
          <div class="space-y-1 text-left w-full">
            <p class="font-pixel text-xs text-red-mag uppercase tracking-widest block">[ VOLUME 01 ]</p>
            <h2 class="font-pixel text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-950 leading-tight tracking-tight uppercase group-hover:text-red-mag transition-colors">
              Dove il velo si lacera
            </h2>
          </div>
        </router-link>
        
        <!-- vol 02 -->
        <div class="flex flex-col space-y-3 opacity-65 select-none w-full">
          <div class="relative w-full aspect-3/4 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-4 sm:p-6 shadow-sm overflow-hidden">
            <span class="absolute top-4 left-4 font-pixel text-4xl sm:text-5xl md:text-6xl text-zinc-300 leading-none">
              02
            </span>
            <div class="absolute bottom-3 right-3">
              <span class="bg-zinc-200 text-zinc-700 font-pixel text-xs tracking-widest px-3 py-1 rounded-full uppercase">
                10/02/26
              </span>
            </div>
          </div>
          
          <div class="space-y-1 text-left w-full">
            <span class="font-pixel text-xs text-zinc-400 uppercase tracking-widest block">[ VOLUME 02 ]</span>
            <h2 class="font-pixel text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 leading-tight tracking-tight uppercase">
              DISPONIBILE A BREVE
            </h2>
          </div>
        </div>
        
        <!-- vol 03 -->
        <div class="flex flex-col space-y-3 opacity-65 select-none w-full">
          <div class="relative w-full aspect-3/4 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-4 sm:p-6 shadow-sm overflow-hidden">
            <span class="absolute top-4 left-4 font-pixel text-4xl sm:text-5xl md:text-6xl text-zinc-300 leading-none">
              03
            </span>
            <div class="absolute bottom-3 right-3">
              <span class="bg-zinc-200 text-zinc-700 font-pixel text-xs tracking-widest px-3 py-1 rounded-full uppercase">
                10/06/27
              </span>
            </div>
          </div>
          
          <div class="space-y-1 text-left w-full">
            <span class="font-pixel text-xs text-zinc-400 uppercase tracking-widest block">[ VOLUME 03 ]</span>
            <h2 class="font-pixel text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 leading-tight tracking-tight uppercase">
              DA DEFINIRE
            </h2>
          </div>
        </div>
        
        <!-- vol 04 -->
        <div class="flex flex-col space-y-3 opacity-65 select-none w-full">
          <div class="relative w-full aspect-3/4 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-4 sm:p-6 shadow-sm overflow-hidden">
            <span class="absolute top-4 left-4 font-pixel text-4xl sm:text-5xl md:text-6xl text-zinc-300 leading-none">
              04
            </span>
            <div class="absolute bottom-3 right-3">
              <span class="bg-zinc-200 text-zinc-700 font-pixel text-xs tracking-widest px-3 py-1 rounded-full uppercase">
                10/10/27
              </span>
            </div>
          </div>
          
          <div class="space-y-1 text-left w-full">
            <span class="font-pixel text-xs text-zinc-400 uppercase tracking-widest block">[ VOLUME 03 ]</span>
            <h2 class="font-pixel text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 leading-tight tracking-tight uppercase">
              DA DEFINIRE
            </h2>
          </div>
        </div>
        
      </div>
    </main>
    
    <!-- spaziatore inferiore invisibile -->
    <footer class="w-full h-2 shrink-0"></footer>
    
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import coverVol1 from '../assets/cover-volume-1.webp'
</script>