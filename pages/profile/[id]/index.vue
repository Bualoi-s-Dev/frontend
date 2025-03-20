<script setup lang="ts">
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue/dist/iconify.js";
import type { PackageResponse } from "~/types/api";
// TODO: can refactor from fetching user profile from backend to using user store instead.
// but we will have to call updateProfile everywhere that modify the profile first.

const route = useRoute();
const router = useRouter();
const api = useApiStore();
const config = useRuntimeConfig();

const profileInformation = ref({
  id: "",
  name: "",
  description: "",
  profile: "",
  location: "",
  phone: "",
  lineID: "",
  instagram: "",
  facebook: "",
});

const isContactInfoVisible = ref(false);

const userId = ref("");
const packages = ref<PackageResponse[] | null>(null);
const errorMessage = ref("");
const activeTab = ref<"WORK" | "REVIEW">("WORK"); // Default active tab

const id = route.params.id as string;

const fetchUserProfile = async () => {
  try {
    const response = await api.fetchUserProfile();
    userId.value = response.id;
    packages.value = response.photographerPackages;
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};

const fetchUserProfileById = async () => {
  try {
    const id = route.params.id as string;
    const response = await api.fetchUserProfileById(id);

    profileInformation.value.name = response.name;
    profileInformation.value.profile = config.public.s3URL + response.profile;
    profileInformation.value.location = response.location;
    profileInformation.value.phone = response.phone;
    profileInformation.value.lineID = response.lineID;
    profileInformation.value.instagram = response.instagram;
    profileInformation.value.facebook = response.facebook;
    profileInformation.value.id = response.id;

    packages.value = response.photographerPackages;
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};

onMounted(async () => {
  await fetchUserProfile();
  await fetchUserProfileById();
});

// Review data
const reviews = ref([
  {
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating_score: 5,
    review: "Absolutely loved the photography session! Highly recommended.",
    date: "2025-03-18",
    owner: false,
  },
  {
    name: "Mark Smith",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating_score: 4,
    review:
      "Great experience, but could improve in editing speed. Great experience, but could improve in editing speed.Great experience, but could improve in editing speed.Great experience, but could improve in editing speed.",
    date: "2025-03-15",
    owner: false,
  },
  {
    name: "Sophia Lee",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating_score: 5,
    review: "Fantastic work! Will book again for future events.",
    date: "2025-03-10",
    owner: true,
  },
  {
    name: "James Brown",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating_score: 3,
    review: "Good work, but I expected better lighting.",
    date: "2025-03-05",
    owner: false,
  },
]);

const goToAllReviews = () => {
  router.push({ path: `/profile/${id}/allreview` });
};

const goToCreateReview = () => {
  router.push({ path: `/profile/${id}/createreview` });
};

const hasReviewed = computed(() => {
  return reviews.value.some((review) => review.owner);
});

const rating = computed<number>(() => {
  if (reviews.value.length === 0) return 0;
  const totalScore = reviews.value.reduce(
    (sum, review) => sum + review.rating_score,
    0
  );
  return parseFloat((totalScore / reviews.value.length).toFixed(1));
});
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Photographer Profile
  </div>
  <div class="mt-[16px]">
    <div class="flex flex-col gap-[25px]">
      <div class="flex flex-col gap-[10px]">
        <div class="flex justify-end">
          <p
            v-if="userId === profileInformation.id"
            class="text-[16px] text-body cursor-pointer underline w-fit"
            @click="router.push('/profile/edit')"
          >
            Edit profile
          </p>
        </div>
        <div class="flex flex-col gap-[12px] items-center">
          <ProfileImage :src="profileInformation.profile" />
          <div class="flex flex-col gap-[5px] items-center">
            <h2 class="text-[20px]">
              {{ profileInformation.name }}
            </h2>
            <RatingStars :rating="rating" />
            <p class="text-[14px] text-body">{{ rating }} stars</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-[25px]">
        <div class="flex justify-evenly cursor-pointer">
          <div
            class="flex flex-col gap-[5px] items-center"
            @click="activeTab = 'WORK'"
          >
            <p class="text-[18px] px-[5px] text-body">WORK</p>
            <hr
              v-if="activeTab === 'WORK'"
              class="text-primary w-full border-b-2 border-primary"
            />
          </div>
          <div
            class="flex flex-col gap-[5px] items-center"
            @click="activeTab = 'REVIEW'"
          >
            <p class="text-[18px] px-[5px] text-body">REVIEW</p>
            <hr
              v-if="activeTab === 'REVIEW'"
              class="text-primary w-full border-b-2 border-primary"
            />
          </div>
        </div>
        <!-- Display Content Based on Active Tab -->
        <div v-if="activeTab === 'WORK'" class="flex flex-col gap-[20px]">
          <WorkList v-if="packages" :data="packages" />
          <p class="text-[16px] text-center text-body cursor-pointer underline">
            See all packages
          </p>
        </div>
        <div
          v-if="activeTab === 'REVIEW'"
          class="flex flex-col gap-[20px] items-center"
        >
          <div class="flex flex-col gap-[25px]">
            <div class="flex items-center justify-center gap-[25px]">
              <p class="text-[48px] text-titleActive">{{ rating }}</p>
              <div class="flex flex-col gap-[5px]">
                <RatingStars :rating="rating" />
                <p class="text-[14px] px-[5px] text-body">
                  from {{ reviews.length }} reviews
                </p>
              </div>
            </div>
            <div v-if="!hasReviewed" class="flex flex-col gap-[5px] px-[15px]">
              <p class="text-[18px] text-body font-medium">
                Review this photographer
              </p>
              <div
                class="flex justify-between cursor-pointer"
                @click="goToCreateReview"
              >
                <Icon
                  v-for="index in 5"
                  :key="index"
                  icon="ic:round-star-border"
                  class="text-empty-star w-[30px] h-[30px]"
                />
              </div>
            </div>
            <ReviewList :reviews="reviews" :showAll="false" />
          </div>
          <p
            v-if="reviews.length > 3"
            class="text-[16px] text-center text-body cursor-pointer underline w-fit"
            @click="goToAllReviews"
          >
            See all reviews
          </p>
        </div>
      </div>
      <div class="mx-5">
        <div
          class="flex justify-between items-center cursor-pointer"
          @click="isContactInfoVisible = !isContactInfoVisible"
        >
          <div class="flex">
            <Button
              middle-icon="material-symbols:mail-outline-sharp"
              icon-color="black"
              height="h-10"
              bg-color="bg-button-profile"
            ></Button>
            <div class="flex-col ml-4">
              <p>Contact Information</p>
              <p class="text-[14px] text-label">Find their contact details!</p>
            </div>
          </div>
          <Icon
            :icon="
              isContactInfoVisible ? 'weui:arrow-down' : 'weui:arrow-outlined'
            "
            class="w-[30px] h-[30px]"
          />
        </div>

        <div
          v-if="isContactInfoVisible"
          class="flex flex-col ml-[5px] mt-[5px]"
        >
          <div class="flex gap-[30px] items-center p-[10px]">
            <Icon icon="tdesign:location-filled" class="w-[30px] h-[30px]" />
            <p class="text-[18px]">{{ profileInformation.location }}</p>
          </div>
          <div class="flex gap-[30px] items-center p-[10px]">
            <Icon icon="solar:phone-bold" class="w-[30px] h-[30px]" />
            <p class="text-[18px]">{{ profileInformation.phone }}</p>
          </div>
          <div class="flex gap-[30px] items-center p-[10px]">
            <Icon icon="simple-icons:line" class="w-[30px] h-[30px]" />
            <p class="text-[18px]">{{ profileInformation.lineID }}</p>
          </div>
          <div class="flex gap-[30px] items-center p-[10px]">
            <Icon icon="ri:instagram-fill" class="w-[30px] h-[30px]" />
            <p class="text-[18px]">{{ profileInformation.instagram }}</p>
          </div>
          <div class="flex gap-[30px] items-center p-[10px]">
            <Icon icon="akar-icons:facebook-fill" class="w-[30px] h-[30px]" />
            <p class="text-[18px]">{{ profileInformation.facebook }}</p>
          </div>
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
</template>
