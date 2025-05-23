<script setup lang="ts">
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue/dist/iconify.js";
import type { Package } from "~/types/api";
// TODO: can refactor from fetching user profile from backend to using user store instead.
// but we will have to call updateProfile everywhere that modify the profile first.
const router = useRouter();
const user = ref({
  name: "",
  description: "",
  location: "",
  profile: "",
  id: "",
});
const data = ref<any>(null);
const packages = ref<Package[] | null>(null);
const errorMessage = ref("");

const api = useApiStore();

const fetchUserProfile = async () => {
  try {
    const response = await api.fetchUserProfile();

    user.value.name = response.name;
    user.value.profile = config.public.s3URL + response.profile;
    user.value.location = response.location;
    user.value.id = response.id;

    packages.value = response.photographerPackages;
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
const config = useRuntimeConfig();

onMounted(async () => {
  await fetchUserProfile();
});
</script>

<template>
  <div class="mt-10">
    <div class="flex flex-col">
      <div class="flex flex-col items-center">
        <ProfileImage :src="user.profile" />
        <h2 class="text-xl font-semibold mt-4">{{ user.name }}</h2>
        <p class="text-sm text-red-900">{{ user.description }}</p>
        <p class="text-sm text-red-900 mb-2">{{ user.location }}</p>
        <Button
          @click="router.push('/profile/edit')"
          width="w-80 h-10"
          text-options="text-white text-right text-sm"
          >Edit Profile</Button
        >
        <Button
          width="w-80 h-10"
          text-options="mt-2 text-white text-right text-sm"
          >View All Packages</Button
        >
      </div>

      <div class="mt-4">
        <div class="flex items-center ml-5 mb-3">
          <Button
            middle-icon="material-symbols:mail-outline-sharp"
            icon-color="black"
            height="h-10"
            bg-color="bg-button-profile"
          ></Button>
          <div class="flex-col ml-4">
            <p>Contact Information</p>
            <p class="text-sm text-primary">Find their contact details!</p>
          </div>
        </div>
        <div class="flex items-center ml-5">
          <Button
            middleIcon="icon-park-twotone:thumbs-up"
            icon-color="black"
            height="h-10"
            bg-color="bg-button-profile"
          ></Button>
          <div class="flex-col ml-4">
            <p>Review</p>
            <p class="text-sm text-primary">Check their reviews now</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col m-6 gap-5">
        <h1 class="font-semibold">Other accessories</h1>
        <div class="flex flex-row justify-between">
          <p>More Information</p>
          <Icon icon="mingcute:right-line" />
        </div>
        <div class="flex flex-row justify-between">
          <p>History</p>
          <Icon icon="mingcute:right-line" />
        </div>
        <div class="flex flex-row justify-between">
          <p>Support</p>
          <Icon icon="mingcute:right-line" />
        </div>
      </div>
    </div>
  </div>
</template>
