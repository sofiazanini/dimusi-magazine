<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ConceptSection from '../components/ConceptSection.vue'
import landingVideo from '../assets/landing-video-effects.mp4'
import PreGlossarioSection from '../components/PreGlossarioSection.vue'
import GlossarioSection from '../components/GlossarioSection.vue'
import PiuGrandeSection from '../components/PiuGrandeSection.vue'
import PrimoVolumeSection from '../components/PrimoVolumeSection.vue'

gsap.registerPlugin(ScrollTrigger)
</script>

<template>
  <!-- HERO SECTION -->
  <section class="w-screen h-screen max-h-screen flex flex-col justify-between items-center p-4 md:p-6 overflow-hidden bg-white">
    <div class="w-full flex justify-center">
      <img
        src="/logo-dimusi.svg"
        alt="Dimusi Magazine"
        class="w-full object-contain object-top"
      />
    </div>

    <div class="w-full flex-1 min-h-0 flex justify-center items-center my-2">
      <video
        :src="landingVideo"
        autoplay
        muted
        loop
        playsinline
        class="w-full h-full object-cover rounded-xl"
      ></video>
    </div>
  </section>

  <!-- SEZIONE 2 -->
  <ConceptSection />

  <!-- SEZIONE 3 -->
  <PreGlossarioSection />

  <!-- SEZIONE 4 -->
  <GlossarioSection />

  <!-- SEZIONE 5 -->
  <PiuGrandeSection />

  <!-- SEZIONE 6 -->
  <PrimoVolumeSection />

</template>