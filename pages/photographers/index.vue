<script setup lang="ts">
import { type UserResponse } from '~/types/api';
import { type SearchPhotographerParams } from '~/types/api_manual';


const router = useRouter();
const route = useRoute();
const api = useApiStore();

const photographers = ref<UserResponse[] | null>(null);

const searchQuery = ref("");
const updateSearchQuery = (q: string) => {
    searchQuery.value = q.length === 0 ? "" : q.split("search=")[1];
    loadPhotographers();
}

const filterQuery = ref<SearchPhotographerParams>({});
const updateFilters = (q: string) => {
    if (q.length === 0) {
        filterQuery.value = {};
        loadPhotographers();
        return;
    }
    const parts = q.split("&");
    const res: any = {};
    for (let part of parts) {
        const [key, value] = part.split("=");
        res[key] = value;
    }
    filterQuery.value = res;
    loadPhotographers();
}

const timeout = ref<ReturnType<typeof setTimeout> | null>(null);
const loadPhotographers = async () => {
    if (timeout.value !== null) {
        clearTimeout(timeout.value);
    }

    setTimeout(async () => {
        photographers.value = null;

        const payload = { ...filterQuery.value };
        if (searchQuery.value.length > 0) payload.name = searchQuery.value;
        photographers.value = await api.searchPhotographer(payload);
    }, 500)
}

onMounted(async () => {
    loadPhotographers();
})
</script>

<template>
    <div class="mt-6 flex flex-col">
        <div class="flex flex-row justify-between mx-5.5">
            <div class="flex flex-row items-center gap-3">
                <BackButton />
                <h1 class="text-md">Photographers</h1>
            </div>
        </div>

        <SearchBar @update:search="updateSearchQuery" @update:filter="updateFilters"
            :filter-options="{ isCategorizing: true, isSelectingLocation: true, isSelectingPriceRange: true }" />

        <div v-if="photographers === null" class="w-full p-4">
            <div v-for="i in 5" :key="i" class="w-full h-32 rounded-xl mt-4 bg-gray-300 animate-pulse"></div>
        </div>

        <div v-for="photographer, index in photographers" :key="photographer.id" class="flex items-center">
            <PhotographerCard :data="photographer" />
        </div>
    </div>
</template>