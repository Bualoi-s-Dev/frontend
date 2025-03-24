<script setup lang="ts">
import { ref } from "vue";

const router = useRouter();

const searchQuery = ref("");
const filterParams = ref("");
const filters = ref(["Category A", "Category B", "Category C"]);

// TODO: manage prop and ref

const prop = withDefaults(
  defineProps<{
    role?: string;
    filterOptions?: {
      isCategorizing?: boolean;
      isSorting?: boolean;
      isSelectingDateRange?: boolean;
      isSelectingLocation?: boolean;
      isSelectingActiveDays?: boolean;
    };
    activeDays?: string[];
  }>(),
  {
    role: "guest",
  }
);

const emit = defineEmits<{
  (event: 'update:search', searchQuery: string): void;
  (event: 'update:filter', filterParams: string): void;
}>();

const onCreate = async () => {
  router.push("/appointment/confirm"); // TODO: move to subpackage page
};

watch(searchQuery, (newQuery) => {
  const params = new URLSearchParams();
  params.append("search", newQuery);

  emit("update:search", params.toString());
});

const handleFilterApply = (data: any) => {
  filterParams.value = data.url;
  emit("update:filter", data.url);
  console.log("Filter applied:", data.url);
};
</script>

<template>
  <div class="w-full mx-3 my-3 p-2 flex flex-row gap-2 items-center">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search..."
      class="px-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none"
    />
    <FilterButton @apply-filter="handleFilterApply" :filter-options="filterOptions"/>
    <!-- <Button height="h-9" icon-color="gray" bg-color="bg-white" middle-icon="basil:filter-outline" button-options="border border-stroke rounded-md"></Button> -->
    <Button
      v-if="role == 'Customer'"
      @click="onCreate"
      height="h-9"
      left-icon="ic:sharp-plus"
      button-options="border border-stroke rounded-md px-4"
      >New</Button
    >
  </div>
</template>
