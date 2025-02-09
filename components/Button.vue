<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    leftIcon?: string | Record<string, any>,
    rightIcon?: string | Record<string, any>,
    middleIcon?: string | Record<string, any>,  // Middle Icon
    bgColor?: string,       
    width?: string,         
    height?: string,        
    textOptions?: string,    // Handles text size, alignment, weight, color, etc.
    buttonOptions?: string,  // Custom button styling
    iconSize?: string        // Icon size customization (e.g., 'w-6 h-6', 'w-8 h-8')
}>(), {
    bgColor: 'bg-black',
    width: 'w-auto',   
    height: 'h-8',
    textOptions: 'text-sm text-center font-semibold text-white',  
    buttonOptions: 'rounded px-3 py-0.5',
    iconSize: 'w-5 h-5'  
});

const buttonClasses = computed(() => 
    `inline-flex items-center justify-center transition duration-200 
    hover:brightness-90 
    ${props.bgColor} ${props.width} ${props.height} ${props.textOptions} ${props.buttonOptions}`
);
</script>

<template>
    <button :class="buttonClasses" type="button">
        <slot name="leftIcon">
            <img v-if="typeof props.leftIcon === 'string'" :src="props.leftIcon" :class="props.iconSize + ' mr-2'" />
            <component v-else-if="props.leftIcon" :is="props.leftIcon" :class="props.iconSize + ' mr-2'" />
        </slot>

        <!-- Middle Icon -->
        <slot name="middleIcon">
            <img v-if="typeof props.middleIcon === 'string'" :src="props.middleIcon" :class="props.iconSize + ' mx-2'" />
            <component v-else-if="props.middleIcon" :is="props.middleIcon" :class="props.iconSize + ' mx-2'" />
        </slot>

        <slot />

        <slot name="rightIcon">
            <img v-if="typeof props.rightIcon === 'string'" :src="props.rightIcon" :class="props.iconSize + ' ml-2'" />
            <component v-else-if="props.rightIcon" :is="props.rightIcon" :class="props.iconSize + ' ml-2'" />
        </slot>
    </button>
</template>
