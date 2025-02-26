<script setup lang="ts">
import { ref } from 'vue';

// TODO: manage prop and ref

const prop = withDefaults(
  defineProps<{
    pages?: number;
    currentPage?: number;
  }>(),
  {
    pages: 1,
    currentPage: 1
  }
);

const searchQuery = ref('');
const selectedFilter = ref('');
const filters = ref(['Category A', 'Category B', 'Category C']);
</script>

<template>
    <div class="mx-3 my-3 p-2 flex flex-row gap-2 items-center">
        <input v-model="searchQuery"  type="text" placeholder="Search..."
            class="px-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <Button height="h-9" icon-color="gray" bg-color="bg-white" middle-icon="basil:filter-outline" button-options="border border-stroke rounded-md"></Button>
        <Button height="h-9" left-icon="ic:sharp-plus" button-options="border border-stroke rounded-md px-4">New</Button>
    </div>
</template>