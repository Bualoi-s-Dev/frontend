<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import { ref, computed } from "vue";

const props = defineProps<{
  name: string;
  image: string;
  rating_score: number;
  review?: string;
  date: string;
  owner: boolean;
  showReview: boolean;
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

// State to toggle the visibility of the full review
const isExpanded = ref(false);

// Truncate the review text if it's too long
const truncatedReview = computed(() => {
  if (props.review && props.review.length > 100 && !props.showReview) {
    return isExpanded.value ? props.review : props.review.slice(0, 100) + "...";
  }
  return props.review; // No truncation if showReview is true
});

// Toggle the review visibility between expanded and collapsed
const toggleReview = () => {
  isExpanded.value = !isExpanded.value;
};
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

      <!-- Review text -->
      <p class="text-[16px] text-body" @click="toggleReview">
        {{ truncatedReview }}
        <!-- "View more" text is visible only if the review is truncated and showReview is false -->
        <span
          v-if="
            props.review &&
            props.review.length > 100 &&
            !isExpanded &&
            !props.showReview
          "
          class="text-primary cursor-pointer underline ml-1"
        >
          View more
        </span>
        <!-- "View less" text is visible only if the review is expanded and showReview is false -->
        <span
          v-if="
            isExpanded &&
            props.review &&
            props.review.length > 100 &&
            !props.showReview
          "
          class="text-primary cursor-pointer underline ml-1"
        >
          View less
        </span>
      </p>
      <p class="text-[12px] text-body">{{ date }}</p>
    </div>
  </div>
</template>
