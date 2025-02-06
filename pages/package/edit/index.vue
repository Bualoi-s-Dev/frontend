<script setup lang="ts">

</script>

<template>
    <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
        <BackButton />
        Edit Package
    </div>

    <PackageForm @submit="console.log" />
</template>