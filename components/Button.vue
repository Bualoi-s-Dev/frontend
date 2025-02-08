<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    leftIcon?: string | Record<string, any>,
    rightIcon?: string | Record<string, any>,
    bgColor?: string,       // Background color
    textColor?: string,     // Text color
    fontSize?: string,      // Font size
    fontFamily?: string     // Font family
}>()

// Dynamic class computation
const buttonClasses = computed(() => {
    const bg = props.bgColor || 'bg-black';
    const text = props.textColor || 'text-white';
    const size = props.fontSize || 'text-sm';
    const font = props.fontFamily || 'font-sans';

    return `inline-flex items-center rounded min-h-[32px] px-3 py-0.5 font-semibold 
        hover:brightness-90 transition duration-200 ${bg} ${text} ${size} ${font}`;
});
</script>

<template>
    <button :class="buttonClasses">
        <!-- Left Icon -->
        <img v-if="typeof props.leftIcon === 'string'" :src="props.leftIcon" class="w-5 h-5 mr-2" />
        <component v-else-if="props.leftIcon" :is="props.leftIcon" class="w-5 h-5 mr-2" />

        <slot />

        <!-- Right Icon -->
        <img v-if="typeof props.rightIcon === 'string'" :src="props.rightIcon" class="w-5 h-5 ml-2" />
        <component v-else-if="props.rightIcon" :is="props.rightIcon" class="w-5 h-5 ml-2" />
    </button>
</template>
