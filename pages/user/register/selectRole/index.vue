<script setup lang="ts">
definePageMeta({
  layout: "background",
});

import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import logo from "assets/logo.png";
import customer_logo from "assets/icons/customer.svg";
import photographer_logo from "assets/icons/photographer.svg";
import LoginRegisterCard from "~/components/LoginRegisterCard.vue";

const router = useRouter();
const route = useRoute();
const api = useApiStore();

const id = ref("");
// Retrieve user data from the previous page
const email = ref(route.query.email || "");
const name = ref(route.query.name || "");
const gender = ref(route.query.gender || "");
const profile = ref(route.query.profile || "");
const phone = ref(route.query.phone || "");
const location = ref(route.query.location || "");
const selectedRole = ref<string | null>(null);
const isSelected = (role: string) => selectedRole.value === role;

const handleCustomerSelect = async () => {
  try {
    console.log("Updating profile at:", api.updateUserProfile);
    const response = await api.fetchUserProfile();
    id.value = response.name;
    const payload = {
      id: id.value,
      email: email.value,
      name: name.value,
      gender: gender.value,
      profile: profile.value || null,
      phone: phone.value,
      location: location.value,
      isPhotographer: false,
      bankName: "",
      bankAccount: "",
      lineID: "",
      facebook: "",
      instagram: "",
      showcasePackages: null,
      packages: null,
    };
    const response2 = await api.updateUserProfile(payload);
    console.log("Profile updated successfully:", response2);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// Handle Photographer Role: Navigate to createPhotographer page
const handlePhotographerSelect = () => {
  router.push({
    path: "/user/register/createPhotographer",
    query: {
      email: email.value,
      name: name.value,
      gender: gender.value,
      profile: profile.value,
      phone: phone.value,
      location: location.value,
    },
  });
};
</script>

<template>
  <LoginRegisterCard>
    <template #backButton>
      <BackButton />
    </template>
    <div class="flex flex-row items-end gap-3 font-extrabold text-xl">
      <img :src="logo" alt="logo" class="w-9" />
      Photomatch
    </div>
    <div class="flex flex-col gap-[30px]">
      <div class="flex flex-col gap-[10px]">
        <h1 class="text-[18px] text-titleActive tracking-wide">Select Role</h1>
        <h2 class="text-[14px] text-body">
          Welcome to PhotoMatch. Choose your role to begin!
        </h2>
      </div>
      <div class="flex flex-col px-[34px] gap-[50px]">
        <!-- Customer Card -->
        <div
          class="flex flex-col items-center justify-center gap-[12px] px-[30px] pt-[10px] pb-[20px] shadow-lg bg-innerBackground cursor-pointer border rounded-lg"
          @click="selectedRole = 'customer'"
          :class="{
            'border-transparent': !isSelected('customer'),
            'border-black': isSelected('photographer'),
          }"
        >
          <img :src="customer_logo" alt="customer_logo" class="w-[96px]" />
          <h1 class="text-[20px] text-titleActive tracking-wide">Customer</h1>
          <div class="py-[12px] w-full">
            <Button
              class="w-full flex items-center justify-center py-[12px] border border-stroke"
              :class="{
                'bg-black text-white': isSelected('customer'),
                'bg-transparent text-placeHolder': !isSelected('customer'),
              }"
              @click="handleCustomerSelect"
              >Select</Button
            >
          </div>
        </div>

        <!-- Photographer Card -->
        <div
          class="flex flex-col items-center justify-center gap-[12px] px-[30px] pt-[10px] pb-[20px] shadow-lg bg-innerBackground cursor-pointer border rounded-lg"
          @click="selectedRole = 'photographer'"
          :class="{
            'border-transparent': !isSelected('photographer'),
            'border-black': isSelected('photographer'),
          }"
        >
          <img
            :src="photographer_logo"
            alt="photographer_logo"
            class="w-[96px]"
          />
          <h1 class="text-[20px] text-titleActive tracking-wide">
            Photographer
          </h1>
          <div class="py-[12px] w-full">
            <Button
              class="w-full flex items-center justify-center py-[12px] border border-stroke"
              :class="{
                'bg-black text-white': isSelected('photographer'),
                'bg-transparent text-placeHolder': !isSelected('photographer'),
              }"
              @click="handlePhotographerSelect"
              >Select</Button
            >
          </div>
        </div>
      </div>
    </div>
  </LoginRegisterCard>
</template>
