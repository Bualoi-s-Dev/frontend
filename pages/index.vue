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
      !packages.value)
);

const filterUrl = ref<string>("");
const handleFilterApply = (data: any) => {
  filterUrl.value = data.url;
  console.log("Filter applied:", data.url);
};

watchEffect(async () => {
  if (!filterUrl.value) return;
  // Apply the filters
  packages.value = await api.fetchAllPackageWithFilter(filterUrl.value);
});

onMounted(async () => {
  profile.value = await api.fetchUserProfile();
  if (profile.value.role !== UserRole.Photographer)
    packages.value = await api.fetchAllPackage();
  else packages.value = profile.value.photographerPackages;
});


</script>

<template>
  <div class="w-full h-full px-3 pt-6 flex flex-col">
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
      <WorkList owner-view :data="packages!" navigate />
    </template>
    <template v-else>
      <div class="flex items-center justify-between gap-[10px] w-full">
        <input
          type="text"
          class="border border-stroke w-full rounded-md py-1 pl-2 text-lg"
        />
        <FilterButton @applyFilter="handleFilterApply" />
      </div>
      <WorkList :data="packages!" navigate />
    </template>
  </div>
</template>
