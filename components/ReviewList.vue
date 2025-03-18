<script setup lang="ts">
import { computed } from "vue";
import ReviewCard from "@/components/ReviewCard.vue";

const props = defineProps<{
  reviews: {
    name: string;
    image: string;
    rating_score: number;
    review?: string;
    date: string;
    owner: boolean;
  }[];
  showAll: boolean;
}>();

// Sort reviews with owner=true first
const sortedReviews = computed(() => {
  return props.reviews.sort((a, b) => (b.owner ? 1 : 0) - (a.owner ? 1 : 0));
});

// Limit to 3 reviews if showAll is false
const visibleReviews = computed(() => {
  return props.showAll ? sortedReviews.value : sortedReviews.value.slice(0, 3);
});
</script>

<template>
  <div>
    <div
      v-if="sortedReviews.some((review) => review.owner)"
      class="text-[18px] text-primary font-medium pl-[15px]"
    >
      Your comment
    </div>
    <div class="flex flex-col gap-[20px]">
      <p v-if="props.reviews.length === 0" class="text-gray-500 text-center">
        No reviews yet
      </p>
      <ReviewCard
        v-for="(review, index) in visibleReviews"
        :key="index"
        :name="review.name"
        :image="review.image"
        :rating_score="review.rating_score"
        :review="review.review"
        :date="review.date"
        :owner="review.owner"
        :showReview="props.showAll"
      />
    </div>
  </div>
</template>
