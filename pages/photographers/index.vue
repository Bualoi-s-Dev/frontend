<script setup lang="ts">
import { type UserResponse } from '~/types/api';


const router = useRouter();
const route = useRoute();
const api = useApiStore();
const config = useRuntimeConfig();

const photographers = ref<UserResponse[]>([{
    name: "Dev",
    profile: "https://media.discordapp.net/attachments/842737146321174558/1352316979901366303/sam-altman.png?ex=67dd92d4&is=67dc4154&hm=34363f8891c692404d048ae13774be411ecf5678ead02cd7573a37475acdaa65&=&format=webp&quality=lossless&width=1022&height=1020",
    rating: 5,
    id: "1"
}, {
    name: "Dev",
    profile: "https://media.discordapp.net/attachments/842737146321174558/1352316979901366303/sam-altman.png?ex=67dd92d4&is=67dc4154&hm=34363f8891c692404d048ae13774be411ecf5678ead02cd7573a37475acdaa65&=&format=webp&quality=lossless&width=1022&height=1020",
    rating: 5,
    id: "2"
}, {
    name: "Dev",
    profile: "https://media.discordapp.net/attachments/842737146321174558/1352316979901366303/sam-altman.png?ex=67dd92d4&is=67dc4154&hm=34363f8891c692404d048ae13774be411ecf5678ead02cd7573a37475acdaa65&=&format=webp&quality=lossless&width=1022&height=1020",
    rating: 5,
    id: "3"
}]);


onMounted(async () => {
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
        <div v-for="photographer, index in photographers" :key="photographer.id" class="flex items-center">
            <PhotographerCard :data="photographer" />
        </div>
    </div>
</template>