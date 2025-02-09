<script setup lang="ts">
definePageMeta({
  layout: "background",
});

import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import logo from "assets/logo.png";
import facebook_icon from "assets/icons/facebook.svg";
import google_icon from "assets/icons/google.svg";

import LoginRegisterCard from "~/components/LoginRegisterCard.vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

// Email validation (simple regex)
const isEmailValid = computed(() =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)
);

// Password validation (min 6 chars)
const isPasswordValid = computed(() => password.value.length >= 6);

// Confirm password validation
const isConfirmPasswordValid = computed(
  () => password.value === confirmPassword.value
);

// Form validation
const isFormValid = computed(
  () =>
    isEmailValid.value && isPasswordValid.value && isConfirmPasswordValid.value
);

// Handle form submission
const handleSubmit = () => {
  if (!isFormValid.value) {
    errorMessage.value = "Please correct the errors before submitting.";
    return;
  }

  console.log("Email:", email.value);
  console.log("Password:", password.value);
  console.log("Confirm Password:", confirmPassword.value);
  errorMessage.value = ""; // Clear errors if successful

  router.push("/user/register/selectRole");
};
</script>

<template>
  <LoginRegisterCard>
    <div class="flex flex-row items-end gap-3 font-extrabold text-xl">
      <img :src="logo" alt="logo" class="w-9" />
      Photomatch
    </div>
    <div class="flex flex-col gap-[20px]">
      <div class="flex flex-col gap-[16px]">
        <div>
          <label>Email<span class="text-red-500">*</span></label>
          <input
            v-model="email"
            type="email"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
          />
          <p v-if="email && !isEmailValid" class="text-red-500 text-xs">
            Invalid email format
          </p>
        </div>

        <div>
          <label>Password<span class="text-red-500">*</span></label>
          <input
            v-model="password"
            type="password"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
          />
          <p v-if="password && !isPasswordValid" class="text-red-500 text-xs">
            Password must be at least 6 characters
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-[16px]">
        <Button
          class="flex items-center justify-center py-[12px]"
          textOptions="text-white text-[14px] font-poppins"
          @click="handleSubmit"
          >Register
        </Button>
        <Button
          class="flex items-center justify-center py-[12px] bg-google"
          textOptions="text-titleActive text-[14px] font-poppins"
          :leftIcon="google_icon"
          >Register With Google
        </Button>
        <Button
          class="flex items-center justify-center py-[12px] bg-facebook"
          textOptions="text-white text-[14px] font-poppins"
          :leftIcon="facebook_icon"
        >
          Register With Facebook
        </Button>
      </div>
      <div class="pl-[8px] pt-[20px]">
        <label class="text-label text-[14px]">
          Back to
          <span
            class="ml-[6px] cursor-pointer underline"
            @click="router.push('/user/login')"
            >Sign in</span
          >
        </label>
      </div>
    </div>
  </LoginRegisterCard>
</template>
