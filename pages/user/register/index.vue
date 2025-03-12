<script setup lang="ts">
definePageMeta({
  layout: "background",
});
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import logo from "assets/logo.png";

import LoginRegisterCard from "~/components/LoginRegisterCard.vue";
import { useAuthStore } from "~/stores/auth";

const responseData = ref(null);
const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const auth = useAuthStore();
const user = useUserStore();

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

const registering = ref(false);

// Handle form submission
const handleSubmit = async () => {
  if (!isFormValid.value) {
    errorMessage.value = "Please correct the errors before submitting.";
    return;
  }

  try {
    registering.value = true;

    await auth.handleRegister(email.value, password.value);
    await user.updateProfile();
    // Clear errors if successful
    errorMessage.value = "";

    router.push({
      path: "/user/register/createUser"
    });
  } catch (error: any) {
    console.log("error", error.message);
    errorMessage.value = error.message;
  } finally {
    registering.value = false;
  }
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
          <label>Email</label>
          <input :disabled="registering" v-model="email" type="email"
            class="border disabled:opacity-50 w-full rounded-md py-[6px] px-2 text-[14px] border-stroke" />
          <p v-if="email && !isEmailValid" class="text-red-500 text-xs">
            Invalid email format
          </p>
        </div>

        <div>
          <label>Password</label>
          <input :disabled="registering" v-model="password" type="password"
            class="border disabled:opacity-50 w-full rounded-md py-[6px] px-2 text-[14px] border-stroke" />
          <p v-if="password && !isPasswordValid" class="text-red-500 text-xs">
            Password must be at least 6 characters
          </p>
        </div>

        <div>
          <label>Confirm Password</label>
          <input :disabled="registering" v-model="confirmPassword" type="password"
            class="border disabled:opacity-50 w-full rounded-md py-[6px] px-2 text-[14px] border-stroke" />
          <p v-if="confirmPassword && !isConfirmPasswordValid" class="text-red-500 text-xs">
            Passwords do not match
          </p>
        </div>
      </div>

      <span class="text-xs text-red-500">{{ errorMessage }}</span>
      <!-- Register Button -->
      <Button :disabled="!isFormValid || registering"
        class="flex disabled:opacity-50 items-center justify-center py-[18px]"
        textOptions="text-white text-[14px] font-poppins" @click="handleSubmit">
        Register
      </Button>
    </div>

    <!-- Display API Response -->
    <div v-if="responseData" class="mt-4 p-4 border border-gray-300 rounded">
      <h3 class="font-bold">User Profile Data:</h3>
      <pre>{{ responseData }}</pre>
    </div>

    <div class="pl-[8px] pt-[20px]">
      <label class="text-label text-[14px]">
        Back to
        <span class="ml-[6px] cursor-pointer underline" @click="router.push('/user/login')">
          Sign in
        </span>
      </label>
    </div>
  </LoginRegisterCard>
</template>
