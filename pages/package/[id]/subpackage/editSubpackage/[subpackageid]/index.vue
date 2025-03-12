<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import type { Subpackage } from "~/types/api";
const api = useApiStore();
const router = useRouter();
const route = useRoute();

// Extract packageId from the route
const id = route.params.id as string;
const subpackageid = route.params.subpackageid as string;

const oldData = ref<Subpackage | undefined>();

onMounted(async () => {
  try {
    const response = await api.fetchSubpackage(subpackageid);

    if (!response) {
      console.warn("No data returned for subpackage:", subpackageid);
      return;
    }

    oldData.value = response;
  } catch (error) {
    console.error("Failed to fetch subpackage data:", error);
  }
});

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
      throw new Error("Invalid package ID. Cannot update subpackage.");
    }

    await api.updateSubpackage(subpackageid, payload);
    await router.push({ path: `/package/${id}` });
  } catch (error: any) {
    console.error("Error updating subpackage:", error);
    useToastify(error.message, { type: "error" });
  }
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Edit Subpackage
  </div>
  <SubpackageForm :data="oldData" :onSubmit="submit" />
</template>
