<script setup lang="ts">
definePageMeta({
  layout: "background",
});

import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import logo from "assets/logo.png";
import facebook_icon from "assets/icons/facebook.svg";
import google_icon from "assets/icons/google.svg";
import { Icon } from '@iconify/vue';

import LoginRegisterCard from "~/components/LoginRegisterCard.vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const steps = [1, 2, 3, 4];
const currentStep = 1;

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
            <div class="mb-3">
                <p class="text-lg">Forgot your password?</p>
            </div>
            <p class="text-sm/6">Please enter your email to reset the password</p>
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
      </div>
      <div class="flex flex-col gap-[16px]">
        <Button
          class="flex items-center justify-center py-[12px]"
          textOptions="text-white text-[14px] font-poppins"
          @click="handleSubmit"
          >Reset Password
        </Button>
      </div>
    </div>
    <div class="flex items-center justify-center">
        <div
        v-for="step in steps"
        :key="step"
        class="flex items-center"
        >
        <!-- Circle -->
        <div
            class="w-10 h-10 flex items-center justify-center rounded-full border-2"
            :class="step === currentStep ? 'bg-black text-white border-black' : 'bg-white text-black border-black'"
        >
            {{ step }}
        </div>

        <!-- Line -->
        <div v-if="step !== steps.length" class="w-5 h-1 bg-black"></div>
        </div>
    </div>
  </LoginRegisterCard>
</template>


