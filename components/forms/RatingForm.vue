<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { type RatingResponse } from "~/types/api";
import { Icon } from "@iconify/vue/dist/iconify.js";
const props = defineProps<{
  onSubmit: (rating: number, review: string) => void;
  disabled?: boolean;
  data?: RatingResponse;
}>();

const rating = ref<string | number>(""); // Allow both string and number

const review = ref("");

const selectedRating = ref(0);
const reviewText = ref("");
const errorMessage = ref("");

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      selectedRating.value = newData.rating || 0;
      reviewText.value = newData.review || "";
    }
  },
  { immediate: true }
);

const setRating = (rating: number) => {
  selectedRating.value = rating;
  errorMessage.value = "";
};

const handleSubmit = () => {
  if (selectedRating.value === 0) {
    errorMessage.value = "Please select a rating";
    return;
  }
  // Call the onSubmit function passed as a prop
  props.onSubmit(Number(selectedRating.value), reviewText.value); // Pass reviewText to the onSubmit
};
</script>

<template>
  <div class="w-full h-full p-6 flex flex-col">
    <div class="flex justify-between cursor-pointer">
      <button v-for="index in 5" :key="index" :class="{
        'text-star': selectedRating >= index,
        'text-empty-star': selectedRating < index,
        'text-red-500': errorMessage
      }" class="disabled:opacity-50" :disabled="disabled" @click="setRating(index)">
        <Icon :icon="selectedRating >= index ? 'ic:round-star' : 'ic:round-star-border'
          " class="w-[30px] h-[30px]" />
      </button>
    </div>

    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>

    <div class="flex flex-col gap-[5px] mt-6">
      <p class="text-lg text-titleActive">Your Review</p>
      <textarea :disabled="disabled" v-model="reviewText" rows="6"
        class="border disabled:opacity-50 border-stroke w-full rounded-md py-1 pl-2 text-lg mt-1.5 resize-none"
        placeholder="Write your review here..."></textarea>
    </div>

    <button :disabled="disabled" class="mt-6 disabled:opacity-50 ml-auto text-lg px-6 py-2 rounded-lg bg-black text-white" @click="handleSubmit">
      Submit
    </button>
  </div>
</template>
