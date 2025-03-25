<script setup lang="ts">

const route = useRoute();
const api = useApiStore();
const oid = route.params.oid as string;

onMounted(async () => {
    
})

</script>

<template>
    <TransactionForm />
</template>