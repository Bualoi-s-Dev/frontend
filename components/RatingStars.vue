<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps<{
  rating: number;
}>();
const starIcons = computed(() => {
  const fullStars = Math.floor(props.rating);
  const halfStar = props.rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return {
    full: fullStars,
    half: halfStar,
    empty: emptyStars,
  };
});
</script>
<template>
  <div class="flex gap-[5px]">
    <Icon
      v-for="n in starIcons.full"
      :key="'full-' + n"
      icon="ic:round-star"
      class="text-star w-[24px] h-[24px]"
    />
    <Icon
      v-if="starIcons.half"
      icon="ic:round-star-half"
      class="text-star w-[24px] h-[24px]"
    />
    <Icon
      v-for="n in starIcons.empty"
      :key="'empty-' + n"
      icon="ic:round-star-border"
      class="text-star w-[24px] h-[24px]"
    />
  </div>
</template>
