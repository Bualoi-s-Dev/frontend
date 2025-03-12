<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const api = useApiStore();
const router = useRouter();
const route = useRoute();

// Extract packageId from the route
const id = route.params.id as string;

const submit = async (
  title: string,
  description: string,
  price: number,
  duration: number,
  isInf: boolean,
  repeatedDay: string[],
  avaliableStartTime: string,
  avaliableEndTime: string,
  avaliableStartDay: string,
  avaliableEndDay: string
) => {
  try {
    const payload = {
      title,
      description,
      price,
      duration,
      isInf,
      repeatedDay,
      avaliableStartTime,
      avaliableEndTime,
      avaliableStartDay,
      avaliableEndDay,
    };

    // Ensure packageId is available before making API request
    if (!id) {
      throw new Error("Invalid package ID. Cannot create subpackage.");
    }

    await api.createSubpackage(id, payload);
    await router.push({ path: `/package/${id}` });
  } catch (error: any) {
    console.error("Error creating subpackage:", error);
    useToastify(error.message, { type: "error" });
  }
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Create Subpackage
  </div>
  <SubpackageForm :onSubmit="submit" />
</template>
