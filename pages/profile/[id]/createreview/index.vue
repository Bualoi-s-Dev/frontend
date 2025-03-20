<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";

const route = useRoute();
const router = useRouter();

const selectedRating = ref(0);

const errorMessage = ref("");

const id = route.params.id as string;

const setRating = (rating: number) => {
  selectedRating.value = rating;
  errorMessage.value = "";
};

const onSubmit = () => {
  if (selectedRating.value === 0) {
    errorMessage.value = "Please select a rating";
    return;
  }

  router.back();
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Share Your Review
  </div>
  <div class="w-full h-full p-6 flex flex-col">
    <div class="flex justify-between cursor-pointer">
      <Icon
        v-for="index in 5"
        :key="index"
        :icon="
          selectedRating >= index ? 'ic:round-star' : 'ic:round-star-border'
        "
        class="w-[30px] h-[30px] cursor-pointer"
        :class="{
          'text-star': selectedRating >= index,
          'text-empty-star': selectedRating < index,
          'text-red-500': errorMessage,
        }"
        @click="setRating(index)"
      />
    </div>

    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>

    <div class="flex flex-col gap-[5px] mt-6">
      <p class="text-lg text-titleActive">Your Review</p>
      <textarea
        rows="6"
        class="border border-stroke w-full rounded-md py-1 pl-2 text-lg mt-1.5 resize-none"
      ></textarea>
    </div>

    <button
      class="mt-6 ml-auto text-lg px-6 py-2 rounded-lg bg-black text-white"
      @click="onSubmit"
    >
      Submit
    </button>
  </div>
</template>
