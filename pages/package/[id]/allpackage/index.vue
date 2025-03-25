<script setup lang="ts">
import Button from "@/components/Button.vue";
import { Icon } from "@iconify/vue";
import type { PackageResponse } from "~/types/api";

const route = useRoute();
const api = useApiStore();
const config = useRuntimeConfig();
const UserRole = ref("");
const ProfileRole = ref("");
const packages = ref<PackageResponse[] | null>(null);
const errorMessage = ref("");

const fetchUserProfile = async () => {
  try {
    const response = await api.fetchUserProfile();
    UserRole.value = response.role;
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};

const fetchUserProfileById = async () => {
  try {
    const id = route.params.id as string;
    const response = await api.fetchUserProfileById(id);
    ProfileRole.value = response.role;
    packages.value = response.photographerPackages;
    console.log(packages.value);
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};

onMounted(async () => {
  await fetchUserProfileById();
  await fetchUserProfile();
});
</script>

<template>
  <div class="mt-6">
    <div class="flex flex-col">
      <div class="flex flex-row justify-between mx-5.5">
        <div class="flex flex-row items-center gap-3">
          <BackButton />
          <h1 class="text-xl">All packages</h1>
        </div>
      </div>
      <div class="w-full h-full py-3 px-5 flex flex-row items-center">
        <input
          type="text"
          class="mr-2 border border-stroke w-full rounded-md text-lg"
        />
        <Button
          icon-color="gray"
          bg-color="bg-white"
          middle-icon="basil:filter-outline"
          button-options="border border-stroke rounded-md"
        ></Button>
      </div>

      <WorkList v-if="UserRole === ProfileRole" owner-view :data="packages" />
      <WorkList v-else :data="packages" />

      <!-- <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-opacity-50 flex items-center justify-center"
        @click.self="closeEditModal"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-80">
          <h3 class="text-lg font-semibold mb-4">
            Edit
            {{ currentField.charAt(0).toUpperCase() + currentField.slice(1) }}
          </h3>
          <input
            v-model="editedValue"
            type="text"
            class="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div class="flex justify-between">
            <Button @click="saveChanges">Save</Button>
            <Button @click="closeEditModal">Cancel</Button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
