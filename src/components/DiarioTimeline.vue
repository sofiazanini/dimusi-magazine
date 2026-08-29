<template>
  <section class="w-full">
    <div v-if="canzoni.length === 0" class="p-12 sm:p-16 text-center rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 space-y-2">
      <p class="font-pixel text-xs text-zinc-400 uppercase tracking-widest">[ NESSUNA ZIDRISA TROVATA ]</p>
      <p class="font-clash text-xs text-zinc-500">
        {{ isReadOnly ? 'Nessun ingresso per i filtri selezionati.' : 'Premi "+ NUOVA ZIDRISA" per salvare un rito.' }}
      </p>
    </div>

    <div v-else class="space-y-4 sm:space-y-6">
      <DiarioCard
        v-for="c in canzoni"
        :key="c.id"
        :canzone="c"
        :is-compact="isCompact"
        @seleziona="$emit('seleziona', c)"
        @seleziona-tag="$emit('selezionaTag', $event)"/>
    </div>
  </section>
</template>

<script setup>
import DiarioCard from './DiarioCard.vue'

defineProps({
  canzoni: { type: Array, required: true },
  isReadOnly: { type: Boolean, default: false },
  isCompact: { type: Boolean, default: false } // AGGIUNGI QUESTA RIGA
})

defineEmits(['seleziona', 'selezionaTag'])
</script>