<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const api = useApiStore();
const route = useRoute();
const router = useRouter();

const id = route.params.id as string;

const submit = async (rating: number, review: string) => {
  const payload = {
    rating,
    review,
  };

  try {
    await api.createRating(id, payload);
    await router.back();
    useToastify("Successfully created rating", { type: "success" });
  } catch (error: any) {
    console.error("Error creating rating:", error);
    useToastify(error.message, { type: "error" });
  }
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Share Your Review
  </div>
  <!-- Correct the prop binding here -->
  <RatingForm :onSubmit="submit" />
</template>
