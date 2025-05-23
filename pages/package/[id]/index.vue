<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Subpackage, SubpackageResponse } from "~/types/api";
import { useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const api = useApiStore();

const config = useRuntimeConfig();

const filterData = ref<{
  category?: string;
  startDate?: string;
  endDate?: string;
  sortBy: string;
  activeDays?: string[];
} | null>(null);

const imageUrl = ref("");
const title = ref("");
const type = ref("");
const ownerId = ref("");

const profileUrl = ref("");
const name = ref("");

const id = route.params.id as string;

const isOwner = ref(false);
const subPackages = ref<SubpackageResponse[]>([]);
const subPackageId = ref();

const fetchUserProfileById = async (id: string) => {
  try {
    const response = await api.fetchUserProfileById(id);

    name.value = response.name;
    profileUrl.value = config.public.s3URL + response.profile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }
};

// SearchBar
const filterUrl = ref("");
const searchQuery = ref("");

watch([searchQuery, filterUrl], async ([newSearch, newFilter]) => {
  const queryParams = [];

  if (newSearch) queryParams.push(newSearch);
  if (newFilter) queryParams.push(newFilter);
  const query = queryParams.length ? `${queryParams.join("&")}` : "";
  console.log("query", query);
  subPackages.value = await api.fetchSubpackageWithFilter(
    `?packageId=${subPackageId.value}` + "&" + query
  );
  // subPackages.value = baseList.subpackages;
  console.log(subPackages.value);
});

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
  type.value = response.type;
  // Store subPackages data
  subPackageId.value = response.id;
  subPackages.value = await api.fetchSubpackageWithFilter(
    `?packageId=${response.id}`
  );
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

const goToCreateSubpackage = () => {
  router.push(`/package/${id}/subpackage/create`);
};

const handleFilterApply = (data: any) => {
  filterData.value = data;
  console.log("Filter applied:", data);
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    {{ title }}
  </div>
  <div class="w-full h-full p-6 flex flex-col">
    <div class="flex gap-[16px] items-center">
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

    <div class="flex items-center justify-between gap-[10px] w-full">
      <SearchBar
        search-key="title"
        :include-search="false"
        searchLabelReplacement="Subpackages"
        @update:search="searchQuery = $event"
        @update:filter="filterUrl = $event"
        :filter-options="{
          isSelectingDateRange:
            subPackages[0] && subPackages[0].availableStartDay ? true : false,
          isSelectingActiveDays: true,
          isSelectingDuration: true,
        }"
      />
      <button
        v-if="isOwner"
        class="flex justify-center items-center gap-[8px] text-[14px] p-[9px] pr-[13px] rounded-[6px] bg-black text-white"
        @click="goToCreateSubpackage"
      >
        <Icon icon="ic:baseline-plus" class="w-[16px] h-[16px]" />
        New
      </button>
    </div>

    <PackageTypeBadge v-if="type" :type="type" />

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
        :timeStart="subpackage.availableStartTime"
        :timeEnd="subpackage.availableEndTime"
        :dateStart="subpackage.availableStartDay"
        :dateEnd="subpackage.availableEndDay"
        :activeDays="subpackage.repeatedDay"
        :isInf="subpackage.isInf"
        :isOwner="isOwner"
        @delete="deleteSubpackage"
      />
    </div>
  </div>
</template>
