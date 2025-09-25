<template>
    <div class="stat">
        <div :class="['stat-figure', s.textColor]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-8 w-8 stroke-current"
            >
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="s.d" />
            </svg>
        </div>
        <div class="stat-title">{{ s.topText }}</div>
        <div :class="['stat-value', s.textColor]">{{ s.value }}</div>
        <div class="stat-desc">{{ s.lowerText }}</div> 
    </div>
</template>

<script setup lang="ts">
    import type { Stat } from '~/types/github'

    defineProps<{
        s: Stat
    }>()

</script>