<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = withDefaults(defineProps<{
    leftIcon?: string | Record<string, any>,  
    rightIcon?: string | Record<string, any>,
    middleIcon?: string | Record<string, any>,
    bgColor?: string,
    width?: string,
    height?: string,
    textOptions?: string,
    buttonOptions?: string,
    iconSize?: string,  
    iconClass?: string  
}>(), {
    bgColor: 'bg-black',
    width: 'w-auto',
    height: 'h-8',
    textOptions: 'text-sm text-center text-white',
    buttonOptions: 'rounded px-3 py-0.5',
    iconSize: 'w-5 h-5',
    iconClass: ''
});

const buttonClasses = computed(() =>
    `inline-flex items-center justify-center transition duration-200 
    hover:brightness-90 
    ${props.bgColor} ${props.width} ${props.height} ${props.textOptions} ${props.buttonOptions}`
);

// Detect if the icon is an Iconify name (e.g., "mdi:home")
const isIconifyName = (icon: any) => typeof icon === 'string' && icon.includes(':');

</script>

<template>
    <button :class="buttonClasses" type="button">
        <!-- Left Icon -->
        <slot name="leftIcon">
            <Icon v-if="isIconifyName(props.leftIcon)" 
                  :icon="props.leftIcon" 
                  :class="`${props.iconSize} mr-2 ${props.iconClass}`" />
        </slot>

        <!-- Middle Icon -->
        <slot name="middleIcon">
            <Icon v-if="isIconifyName(props.middleIcon)" 
                  :icon="props.middleIcon" 
                  :class="`${props.iconSize} mx-2 ${props.iconClass}`" />
        </slot>

        <!-- Button Text -->
        <slot />

        <!-- Right Icon -->
        <slot name="rightIcon">
            <Icon v-if="isIconifyName(props.rightIcon)" 
                :icon="props.rightIcon" 
                :class="`${props.iconSize} ml-2 ${props.iconClass}`" />
        </slot>



    </button>
</template>
