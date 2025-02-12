<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { Icon } from '@iconify/vue';

const props = withDefaults(
  defineProps<{
    leftIcon?: string;
    rightIcon?: string;
    middleIcon?: string;
    bgColor?: string;
    width?: string;
    height?: string;
    textOptions?: string;
    buttonOptions?: string;
    iconSize?: string;
    iconClass?: string;
    iconColor?: string;  // New prop for icon color
  }>(),
  {
    bgColor: 'bg-black',
    width: 'w-auto',
    height: 'h-8',
    textOptions: 'text-sm text-center text-white',
    buttonOptions: 'rounded px-3 py-0.5',
    iconSize: 'w-5 h-5',
    iconClass: '',
    iconColor: 'currentColor',  // Default to inheriting text color
  }
);

const buttonClasses = computed(() =>
  `inline-flex items-center justify-center transition duration-200 
  hover:brightness-90 ${props.bgColor} ${props.width} ${props.height} 
  ${props.textOptions} ${props.buttonOptions}`
);

// Detect if the icon is an Iconify name (e.g., "mdi:home")
const isIconifyName = (icon: any) => typeof icon === 'string' && icon.includes(':');

// Use slots to check if a named slot is used
const slots = useSlots();
</script>

<template>
  <button :class="buttonClasses" type="button">
    <!-- Left Icon -->
    <slot name="leftIcon">
      <Icon v-if="!slots.leftIcon && isIconifyName(props.leftIcon)"
            :icon="props.leftIcon"
            :class="`${props.iconSize} mr-2 ${props.iconClass}`"
            :style="{ color: props.iconColor }" />
    </slot>

    <!-- Middle Icon -->
    <slot name="middleIcon">
      <Icon v-if="!slots.middleIcon && isIconifyName(props.middleIcon)"
            :icon="props.middleIcon"
            :class="`${props.iconSize} mx-2 ${props.iconClass}`"
            :style="{ color: props.iconColor }" />
    </slot>

    <!-- Button Text -->
    <slot />

    <!-- Right Icon -->
    <slot name="rightIcon">
      <Icon v-if="!slots.rightIcon && isIconifyName(props.rightIcon)"
            :icon="props.rightIcon"
            :class="`${props.iconSize} ml-2 ${props.iconClass}`"
            :style="{ color: props.iconColor }" />
    </slot>
  </button>
</template>
