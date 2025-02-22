<script setup lang="ts">
definePageMeta({
  layout: "background",
});

import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "assets/logo.png";
import customer_logo from "assets/icons/customer.svg";
import photographer_logo from "assets/icons/photographer.svg";
import LoginRegisterCard from "~/components/LoginRegisterCard.vue";
import { UserRole } from "@/types/api";
const router = useRouter();
const api = useApiStore();

const selectedRole = ref<string | null>(null);
const isSelected = (role: string) => selectedRole.value === role;

const handleCustomerSelect = async () => {
  try {
    const payload = {
      role: UserRole.Customer,
    };
    const response = await api.updateUserInformation(payload);
    router.push({
      path: "/",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

const handlePhotographerSelect = async () => {
  try {
    const payload = {
      role: UserRole.Photographer,
    };
    const response = await api.updateUserInformation(payload);
    router.push({
      path: "/user/register/createPhotographer",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
  }
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
