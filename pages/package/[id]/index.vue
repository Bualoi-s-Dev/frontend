<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Subpackage } from "~/types/api";
import { useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const api = useApiStore();

const config = useRuntimeConfig();

const imageUrl = ref("");
const title = ref("");
const type = ref("");
const ownerId = ref("");

const profileUrl = ref("");
const name = ref("");

const id = route.params.id as string;

const isOwner = ref(false);
const subPackages = ref<Subpackage[]>([]);

const fetchUserProfileById = async (id: string) => {
  try {
    const response = await api.fetchUserProfileById(id);

    name.value = response.name;
    profileUrl.value = config.public.s3URL + response.profile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }
};

onMounted(async () => {
  const [response, profile] = await Promise.all([
    api.fetchPackage(id),
    api.fetchUserProfile(),
  ]);

  isOwner.value = response.ownerId === profile.id;

  if (response.photoUrls && response.photoUrls.length > 0) {
    const imgUrl = config.public.s3URL + response.photoUrls[0];
    response.photoUrls[0] = imgUrl;

    imageUrl.value = response.photoUrls[0];
  }
  title.value = response.title;
  ownerId.value = response.ownerId;
  type.value = formatPackageType(response.type);
  // Store subPackages data
  subPackages.value = response.subPackages;

  await fetchUserProfileById(response.ownerId);
});

const deleteSubpackage = async (subpackageId: string) => {
  try {
    await api.deleteSubpackage(subpackageId);
    // Remove from local state
    subPackages.value = subPackages.value.filter(
      (sp) => sp.id !== subpackageId
    );
  } catch (error) {
    console.error("Failed to delete subpackage:", error);
  }
};

const formatPackageType = (type: string): string => {
  return type
    .toLowerCase()
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const goToCreateSubpackage = () => {
  router.push(`/package/${id}/subpackage/create`);
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    {{ title }}
  </div>
  <div class="w-full h-full p-6 flex flex-col">
    <div class="flex items-center justify-between gap-[10px] w-full">
      <input
        type="text"
        class="border border-stroke w-full rounded-md py-1 pl-2 text-lg"
      />
      <FilterButton />
      <button
        v-if="isOwner"
        class="flex justify-center items-center gap-[8px] text-[14px] p-[9px] pr-[13px] rounded-[6px] bg-black text-white"
        @click="goToCreateSubpackage"
      >
        <Icon icon="ic:baseline-plus" class="w-[16px] h-[16px]" />
        New
      </button>
    </div>
    <div class="flex gap-[16px] mt-6 items-center">
      <img
        class="h-[50px] w-[50px] object-cover rounded-full cursor-pointer"
        :src="profileUrl"
        alt="Profile Image"
        @click="router.push(`/profile/${ownerId}`)"
      />
      <p class="text-xl">{{ name }}</p>
    </div>
    <img
      v-if="imageUrl"
      class="h-[253px] w-full object-cover rounded-[20px] mt-6"
      :src="imageUrl"
      alt="Package Image"
    />

    <div
      class="text-[12px] text-white rounded-[10px] px-[10px] py-[8px] w-fit mt-6 bg-gradient-to-r from-primary to-secondary opacity-85"
    >
      {{ type }}
    </div>
    <div class="flex flex-col gap-[16px] mt-6 pb-12">
      <SubpackageCard
        v-for="subpackage in subPackages"
        :key="subpackage.id"
        :packageId="id"
        :subpackageId="subpackage.id"
        :title="subpackage.title"
        :description="subpackage.description"
        :price="subpackage.price"
        :duration="subpackage.duration"
        :timeStart="subpackage.avaliableStartTime"
        :timeEnd="subpackage.avaliableEndTime"
        :dateStart="subpackage.avaliableStartDay"
        :dateEnd="subpackage.avaliableEndDay"
        :activeDays="subpackage.repeatedDay"
        :isInf="subpackage.isInf"
        :isOwner="isOwner"
        @delete="deleteSubpackage"
      />
    </div>
  </div>
</template>
