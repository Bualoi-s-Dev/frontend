<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const menuOpen = ref(false);
const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};
</script>

<template>
    <nav class="mx-20">
        <div class="container m-auto px-15 flex justify-between items-center">
            <button class="md:hidden" @click="toggleMenu">
                <Icon icon="line-md:align-right" style="width: 30; height: inherit;" />
            </button>
        </div>

        <div :class="[
            menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
            'md:hidden mt-4 bg-gray-100 p-4 rounded-lg absolute transition-all duration-300 ease-in-out'
        ]"
        >
            <ul class="space-y-4">
                <li>
                    <NuxtLink to="/" class="block" @click="toggleMenu">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/user/login" class="block text-red-500" @click="toggleMenu">Logout</NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
</template>