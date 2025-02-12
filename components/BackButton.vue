<script setup lang="ts">
const router = useRouter();

const props = defineProps<{
  onClick?: () => void;
}>();
const clickHandler = computed(() => props.onClick ?? (() => router.back()));
</script>

<template>
  <button
    class="w-8 h-8 flex items-center justify-center rounded-lg border border-stroke bg-white"
    @click="clickHandler"
  >
    <svg
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.96753 12.5604L0.874754 6.46765L6.96753 0.374877"
        stroke="#14142B"
      />
    </svg>
  </button>
</template>
