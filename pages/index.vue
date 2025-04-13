<script lang="ts" setup>
import { UserRole, type PackageResponse, type UserResponse } from "~/types/api";

const profile = ref<UserResponse | null>(null);
const packages = ref<PackageResponse[] | null>(null);
const router = useRouter();

const api = useApiStore();

const loading = computed(
  () =>
    !profile.value ||
    (profile.value &&
      profile.value.role !== UserRole.Photographer &&
      packages.value === null)
);

const filterUrl = ref("");
const searchQuery = ref("");

const timeout = ref<ReturnType<typeof setTimeout>>();
watch([searchQuery, filterUrl], async ([newSearch, newFilter]) => {
  if (timeout.value) clearTimeout(timeout.value);

  timeout.value = setTimeout(async () => {
    const queryParams = [];

    if (newSearch) queryParams.push(newSearch);
    if (newFilter) queryParams.push(newFilter);
    const query = queryParams.length ? `?${queryParams.join("&")}` : "";

    packages.value = null;
    packages.value = await api.fetchAllPackageWithFilter(query);
  }, 500);
});

const deleteItem = async (id: string) => {
  try {
    const result = await api.deletePackage(id);
    packages.value = packages.value!.filter((p) => p.id !== id);
    useToastify('Sucessfully deleted package', { type: "success" });
  } catch (err: any) {
    useToastify("Unable to delete package: " + err.message, { type: "error" });
  }
}

onMounted(async () => {
  profile.value = await api.fetchUserProfile();
  if (profile.value.role !== UserRole.Photographer)
    packages.value = await api.fetchAllPackage();
  else
    packages.value = profile.value.photographerPackages;
});
</script>

<template>
  <div class="w-full h-full px-3 pt-6 flex flex-col">
    <!-- Separate from the v-else part below because when loading is triggered again, search bar won't be re-rendered so that user's input would not disappear -->
    <div v-if="profile?.role === UserRole.Customer" class="flex items-center justify-between gap-[10px] w-full">
      <SearchBar search-key="search" @update:search="searchQuery = $event" @update:filter="filterUrl = $event"
        :filter-options="{ isCategorizing: true, isSelectingPriceRange: true }" />
    </div>

    <template v-if="loading">
      <div class="w-full h-32 rounded-xl mt-12 bg-gray-300 animate-pulse"></div>
      <div class="w-full h-32 rounded-xl mt-4 bg-gray-300 animate-pulse"></div>
      <div class="w-full h-32 rounded-xl mt-4 bg-gray-300 animate-pulse"></div>
      <div class="w-full h-32 rounded-xl mt-4 bg-gray-300 animate-pulse"></div>
    </template>
    <template v-else-if="profile!.role === UserRole.Photographer">
      <div class="px-6 mt-6 flex flex-row w-full justify-between items-center">
        <h1 class="font-bold">Your Packages</h1>
        <Button @click="router.push('/package/create')">Add Package</Button>
      </div>
      <WorkList @delete="async (id) => deleteItem(id)" owner-view :data="packages!" navigate />
    </template>
    <template v-else>
      <WorkList :data="packages!" navigate />
    </template>
  </div>
</template>
