<script setup lang="ts">
import StarRating from 'vue-star-rating'
import type { UserResponse } from '~/types/api';

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

const props = defineProps<{
    data: UserResponse
}>();

const rating = computed(() => props.data.photographerRatings.reduce((a, b) => a + b.rating, 0) / props.data.photographerRatings.length);
</script>

<template>
    <button @click="router.push(`/profile/${data.id}`)"
        class="bg-white shadow-lg rounded-xl w-full mx-5 my-3 p-3 flex flex-row">
        <div :style="`background-image: url('${config.public.s3URL}${data.profile}');`" class="w-20 h-20 rounded-full bg-cover bg-center"></div>
        <div class="flex flex-col h-20 items-start justify-center gap-1 ml-4">
            <h2 class="text-xl text-gray-900">{{ data.name }}</h2>

            <star-rating :star-size="20" :rating="rating" :show-rating="false"></star-rating>
        </div>
    </button>
</template>