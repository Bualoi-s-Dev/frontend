<script setup lang="ts">
import { type UserResponse } from "~/types/api";
import type { SearchPhotographerParams } from "~/types/api_manual";

const router = useRouter();
const route = useRoute();
const api = useApiStore();
// SearchBar
const filterUrl = ref("");
const searchQuery = ref("");

const photographers = ref<UserResponse[]>([]);

watch([searchQuery, filterUrl], async ([newSearch, newFilter]) => {
  const queryParams = [];

  if (newSearch) queryParams.push(newSearch);
  if (newFilter) queryParams.push(newFilter);
  const query = queryParams.length ? `?${queryParams.join("&")}` : "";

  photographers.value = await api.searchPhotographerWithFilter(query);
});

onMounted(async () => {
  photographers.value = await api.searchPhotographer({});
  console.log(photographers.value);
});
</script>

<template>
  <div class="mt-6 flex flex-col">
    <div class="flex flex-row justify-between mx-5.5">
      <div class="flex flex-row items-center gap-3">
        <BackButton />
        <h1 class="text-md">Photographers</h1>
      </div>
    </div>

    <SearchBar
      search-key="name"
      role="guest"
      @update:search="searchQuery = $event"
      @update:filter="filterUrl = $event"
    />
    {{ searchQuery }}
    <div v-if="photographers.length === 0" class="w-full p-4">
      <div
        v-for="i in 5"
        :key="i"
        class="w-full h-32 rounded-xl mt-4 bg-gray-300 animate-pulse"
      ></div>
    </div>
    <div
      v-for="(photographer, index) in photographers"
      :key="photographer.id"
      class="flex items-center"
    >
      <PhotographerCard :data="photographer" />
    </div>
  </div>
</template>
