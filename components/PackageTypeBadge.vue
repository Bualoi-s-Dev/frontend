<!-- components/PackageTypeBadge.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { defineProps } from "vue";

const props = defineProps<{
  type: string;
}>();

const formattedType = computed(() => {
  return props.type
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
});
</script>

<template>
  <div
    class="text-[14px] text-white rounded-[10px] px-[12px] py-[10px] w-fit bg-primary"
  >
    {{ formattedType }}
  </div>
</template>
