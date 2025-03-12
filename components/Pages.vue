<script setup lang="ts">

import { Icon } from '@iconify/vue';

const prop = withDefaults(
  defineProps<{
    pages?: number;
    currentPage?: number;
  }>(),
  {
    pages: 1,
    currentPage: 1
  }
);

</script>

<template>
    <div class="flex items-center justify-center">
        <div
        v-for="step in pages"
        :key="step"
        class="flex items-center"
        >
        <div
            class="w-10 h-10 flex items-center justify-center rounded-full border-2"
            :class="step === prop.currentPage ? 'bg-black text-white border-black' : 'bg-white text-black border-black'"
        v-if="step >= currentPage">
            {{ step }}
        </div>
        <div
            class="w-10 h-10 flex items-center justify-center rounded-full border-2"
            :class="step === prop.currentPage ? 'bg-black text-white border-black' : 'bg-white text-black border-black'"
        v-else>
            <Icon icon="tabler:check" style="color: black;" />
        </div>
        <div v-if="step !== prop.pages" class="w-5 h-1 bg-black"></div>
        </div>
    </div>
</template>