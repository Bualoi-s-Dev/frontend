<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps<{
  name: string;
  image: string;
  rating_score: number;
  review?: string;
  date: string;
  owner: boolean;
}>();

const starIcons = computed(() => {
  const fullStars = props.rating_score;
  const emptyStars = 5 - fullStars;
  return { full: fullStars, empty: emptyStars };
});

const borderClass = computed(() =>
  props.owner
    ? "border-primary border-2 py-[15px] px-[20px] rounded-[16px]"
    : "px-[20px]"
);
</script>

<template>
  <div :class="['flex gap-[20px]', borderClass]">
    <img
      class="h-[35px] w-[35px] object-cover rounded-full"
      :src="image"
      alt="Reviewer image"
    />
    <div class="flex flex-col gap-[5px] w-full">
      <p class="text-[16px] text-titleActive">{{ name }}</p>

      <!-- Rating stars -->
      <div class="flex">
        <Icon
          v-for="n in starIcons.full"
          :key="'full-' + n"
          icon="ic:round-star"
          class="text-yellow-500 w-[24px] h-[24px]"
        />
        <Icon
          v-for="n in starIcons.empty"
          :key="'empty-' + n"
          icon="ic:round-star"
          class="text-empty-star w-[24px] h-[24px]"
        />
      </div>

      <p class="text-[16px] text-body">
        {{ review }}
      </p>
      <p class="text-[12px] text-body">{{ date }}</p>
    </div>
  </div>
</template>
