<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    leftIcon?: string | Record<string, any>,
    rightIcon?: string | Record<string, any>,
    bgColor?: string,       
    width?: string,         
    height?: string,        
    textOptions?: string    // Handles text size, alignment, weight, color, etc.
}>(), {
    bgColor: 'bg-black',
    width: 'w-auto',   
    height: 'h-8',
    textOptions: 'text-sm text-center font-semibold text-white'  // Default text styles (includes color)
});

const buttonClasses = computed(() => 
    `inline-flex items-center justify-center rounded px-3 py-0.5 transition duration-200 
    hover:brightness-90 
    ${props.bgColor} ${props.width} ${props.height} ${props.textOptions}`
);
</script>

<template>
    <button :class="buttonClasses" type="button">
        <slot name="leftIcon">
            <img v-if="typeof props.leftIcon === 'string'" :src="props.leftIcon" class="w-5 h-5 mr-2" />
            <component v-else-if="props.leftIcon" :is="props.leftIcon" class="w-5 h-5 mr-2" />
        </slot>

        <slot />

        <slot name="rightIcon">
            <img v-if="typeof props.rightIcon === 'string'" :src="props.rightIcon" class="w-5 h-5 ml-2" />
            <component v-else-if="props.rightIcon" :is="props.rightIcon" class="w-5 h-5 ml-2" />
        </slot>
    </button>
</template>
