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


const priceRange = computed(() => {
    const subpackages = props.data.photographerPackages.flatMap(p => p.subPackages);
    if (subpackages.length === 0) return "No Subpackage";

    const prices = subpackages.map(x => x.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max) return `฿${min}`;
    else return `฿${min}-${max}`
})

const rating = computed(() => props.data.photographerRatings.reduce((a, b) => a + b.rating, 0) / props.data.photographerRatings.length);
</script>

<template>
    <button @click="router.push(`/profile/${data.id}`)"
        class="bg-white shadow-lg rounded-xl w-full mx-5 my-3 p-3 items-center flex flex-row">
        <div :style="`background-image: url('${config.public.s3URL}${data.profile}');`"
            class="w-20 h-20 rounded-full bg-cover bg-center"></div>
        <div class="flex flex-col items-start justify-center gap-1 ml-4">
            <h2 class="text-xl text-start text-gray-900">{{ data.name }}</h2>
            <star-rating :increment="0.35" :star-size="20" :rating="rating" :show-rating="false"></star-rating>
            
            <span class="text-gray-400 text-sm">{{ data.location }}</span>
            <span class="text-sm text-primary">{{ priceRange }}</span>
        </div>
    </button>
</template>