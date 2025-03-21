<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import type { RatingResponse } from "~/types/api";
const api = useApiStore();
const route = useRoute();
const router = useRouter();

const id = route.params.id as string;
const ratingid = route.params.ratingid as string;
const oldData = ref<RatingResponse | undefined>();

onMounted(async () => {
  try {
    const response = await api.fetchRatingById(id, ratingid);
    if (!response) {
      console.warn("No data returned for rating:", ratingid);
      return;
    }

    oldData.value = response;
  } catch (error) {
    console.error("Failed to fetch subpackage data:", error);
  }
});

const submit = async (rating: number, review: string) => {
  const payload = {
    rating,
    review,
  };

  try {
    await api.updateRating(id, ratingid, payload);
    await router.back();
    useToastify("Update rating completed", { type: "success" });
  } catch (error: any) {
    console.error("Error updating rating:", error);
    useToastify(error.message, { type: "error" });
  }
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Edit Your Review
  </div>
  <!-- Correct the prop binding here -->
  <RatingForm :data="oldData" :onSubmit="submit" />
</template>
