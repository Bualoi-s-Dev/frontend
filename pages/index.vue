<script lang="ts" setup>
import { UserRole, type PackageResponse, type UserResponse } from '~/types/api';

const profile = ref<UserResponse | null>(null);
const packages = ref<PackageResponse[] | null>(null);

const api = useApiStore();

const loading = computed(() => !profile.value ||
  (profile.value && profile.value.role !== UserRole.Photographer && !packages.value));

onMounted(async () => {
  profile.value = await api.fetchUserProfile();
  if (profile.value.role !== UserRole.Photographer)
    packages.value = await api.fetchAllPackage();
})
</script>

<template>
  <div class="w-full h-full px-3 flex flex-col">
    <template v-if="loading">
      <div class="w-full h-32 rounded-xl mt-12 bg-gray-300 animate-pulse"></div>
      <div class="w-full h-32 rounded-xl mt-4 bg-gray-300 animate-pulse"></div>
      <div class="w-full h-32 rounded-xl mt-4 bg-gray-300 animate-pulse"></div>
      <div class="w-full h-32 rounded-xl mt-4 bg-gray-300 animate-pulse"></div>
    </template>
    <h1 v-else-if="profile!.role === UserRole.Photographer"
      class="text-3xl font-bold underline w-full h-screen flex items-center justify-center">
      Hello Photographer!
    </h1>
    <template v-else>
      <WorkList :data="packages!" navigate />
    </template>
  </div>
</template>
