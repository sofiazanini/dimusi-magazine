<template>
    <div class="fixed inset-0 w-screen h-screen pointer-events-none z-35 overflow-hidden mix-blend-difference">
        <div class="absolute inset-0 w-full h-full">
        <div ref="cursorInner" class="grid w-full h-full" :style="{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))` }"></div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
    columns: {
        type: Number,
        default: 80
    },
    ttl: {
        type: Number,
        default: 0.18
    },
    color: {
        type: String,
        default: '#ffffff'
    }
})

const cursorInner = ref(null)
const columnsCount = ref(props.columns)

let cellSize = 0
let rows = 0
let cellsTotal = 0
let cells = []
let cachedCell = null
let mousePos = { x: 0, y: 0 }

const noiseSvg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg=="

const updateMousePos = (e) => {
    mousePos = { x: e.clientX, y: e.clientY }
    handlePointerMove()
}

const buildLayout = () => {
    if (!cursorInner.value) return
    
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight
    
    columnsCount.value = winWidth < 768 ? 24 : props.columns
    cellSize = winWidth / columnsCount.value
    rows = Math.ceil(winHeight / cellSize)
    cellsTotal = rows * columnsCount.value
    
    cursorInner.value.innerHTML = Array.from({ length: cellsTotal }, () => `
    <div class="aspect-square w-full rounded-none opacity-0 origin-center pointer-events-none"
      style="background-color: ${props.color}; background-image: url('${noiseSvg}'); background-repeat: repeat; background-blend-mode: multiply;">
    </div>
  `).join('')
    cells = cursorInner.value.children
}

const getCellAtCursor = () => {
    if (!cellSize) return null
    
    const column = Math.floor(mousePos.x / cellSize)
    const row = Math.floor(mousePos.y / cellSize)
    const cellIndex = row * columnsCount.value + column
    
    if (cellIndex >= cellsTotal || cellIndex < 0) return null
    return cells[cellIndex]
}

const handlePointerMove = () => {
    const cell = getCellAtCursor()
    if (!cell || cachedCell === cell) return
    
    cachedCell = cell
    
    gsap.killTweensOf(cell)
    gsap.set(cell, { opacity: 1 })
    
    gsap.to(cell, {
        opacity: 0,
        duration: 0.25,
        delay: props.ttl,
        ease: 'power1.out'
    })
}

const onResize = () => {
    buildLayout()
}

onMounted(() => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        buildLayout()
        window.addEventListener('mousemove', updateMousePos)
        window.addEventListener('resize', onResize)
    }
})

onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePos)
    window.removeEventListener('resize', onResize)
})
</script>