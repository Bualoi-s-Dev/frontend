<script setup lang="ts">
import Header from '~/components/Header.vue';

</script>

<template>
    <div class="w-screen h-screen flex flex-col font-poppins pt-12">
        <Header />
        <slot />
    </div>
</template>
