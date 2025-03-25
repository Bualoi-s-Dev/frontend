<script setup lang="ts">
import { type UserResponse } from '~/types/api';


const router = useRouter();
const route = useRoute();
const api = useApiStore();

const photographers = ref<UserResponse[]>([]);


onMounted(async () => {
    photographers.value = await api.searchPhotographer({});
    console.log(photographers.value);
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

        <SearchBar role="guest" />

        <div v-if="photographers.length === 0" class="w-full p-4">
            <div v-for="i in 5" :key="i" class="w-full h-32 rounded-xl mt-4 bg-gray-300 animate-pulse"></div>
        </div>

        <div v-for="photographer, index in photographers" :key="photographer.id" class="flex items-center">
            <PhotographerCard :data="photographer" />
        </div>
    </div>
</template>