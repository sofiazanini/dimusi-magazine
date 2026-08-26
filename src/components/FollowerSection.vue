<template>
  <section class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="u in listaUtenti" 
        :key="u.nome" 
        @click="$emit('ispezionaUtente', u)" 
        class="group bg-zinc-50 hover:bg-zinc-100 border border-black/10 hover:border-black/20 rounded-3xl p-6 space-y-4 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xs"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3.5">
            <img :src="u.avatar" :alt="u.nome" class="w-14 h-14 rounded-2xl object-cover border border-black/10 group-hover:scale-105 transition-transform" />
            <div>
              <h3 class="font-pixel text-base text-zinc-950 uppercase group-hover:text-red-mag transition-colors">{{ u.nome }}</h3>
              <p class="font-clash text-xs text-zinc-400">{{ u.canzoni.length }} Zidrise</p>
            </div>
          </div>
          <span class="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center font-pixel text-xs group-hover:bg-zinc-950 group-hover:text-white transition-colors">↗</span>
        </div>

        <p class="font-clash text-xs text-zinc-600 line-clamp-2 leading-relaxed">{{ u.bio }}</p>

        <div class="pt-2 border-t border-black/5 flex items-center justify-between font-pixel text-[10px] text-zinc-400">
          <span class="bg-red-mag/10 text-red-mag px-2.5 py-1 rounded-full uppercase">★ {{ u.canzoniComuni }} IN COMUNE</span>
          <span class="uppercase">VAI AL PROFILO →</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  listaUtenti: { type: Array, required: true }
})

defineEmits(['ispezionaUtente'])
</script>