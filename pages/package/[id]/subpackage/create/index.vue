<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const api = useApiStore();
const router = useRouter();
const route = useRoute();

// Extract packageId from the route
const id = route.params.id as string;

const loading = ref(false);

const submit = async (
  title: string,
  description: string,
  price: number,
  duration: number,
  isInf: boolean,
  repeatedDay: string[],
  availableStartTime: string,
  availableEndTime: string,
  availableStartDay: string,
  availableEndDay: string
) => {
  loading.value = true;

  try {
    const payload = {
      title,
      description,
      price,
      duration,
      isInf,
      repeatedDay,
      availableStartTime,
      availableEndTime,
      availableStartDay,
      availableEndDay,
    };

    // Ensure packageId is available before making API request
    if (!id) {
      throw new Error("Invalid package ID. Cannot create subpackage.");
    }

    await api.createSubpackage(id, payload);
    await router.push({ path: `/package/${id}` });
    useToastify("Successfully created subpackage", { type: "success" });
  } catch (error: any) {
    console.error("Error creating subpackage:", error);
    useToastify(error.message, { type: "error" });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Create Subpackage
  </div>
  <SubpackageForm :disabled="loading" :onSubmit="submit" />
</template>
