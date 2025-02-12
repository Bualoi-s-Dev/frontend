<script setup lang="ts">
definePageMeta({
  layout: "background",
});
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import logo from "assets/logo.png";

import LoginRegisterCard from "~/components/LoginRegisterCard.vue";
import axios from "axios";

const responseData = ref(null);
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

  // Navigate to the next page with email as a query parameter
  router.push({
    path: "/user/register/createUser",
    query: { email: email.value },
  });
};

const varToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMjUwZDIyYTkzODVmYzQ4NDJhYTU2YWJhZjUzZmU5NDcxNmVjNTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2UtMi03NmY2MiIsImF1ZCI6InNlLTItNzZmNjIiLCJhdXRoX3RpbWUiOjE3MzkzNTE2OTMsInVzZXJfaWQiOiJGeWQzMmhEU2dUUTNLNTE2aHRQSklIQ0RzeWcyIiwic3ViIjoiRnlkMzJoRFNnVFEzSzUxNmh0UEpJSENEc3lnMiIsImlhdCI6MTczOTM1MTY5MywiZXhwIjoxNzM5MzU1MjkzLCJlbWFpbCI6Indpcm9vbnB1cmkxMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIndpcm9vbnB1cmkxMjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cQY-9MRBUcwevFFFOEIWipZEuY9Kasa55fDiKar2v57-i_207qIy87h4LMNqlYNYMJBHGgBfNyMs11P2nB2XSmLSPi9k35eb_76Z2MJxW37rYu935hkyL8ZEt-NROLhgvn3qPVSW3Cx9GkuNhJIjlkXThitEnpcF-YBJCpKDywef2X-LmUT1vjRNVlPrI5z4OMJe6HCSEmXcx-U6aKvKTm4p2WOaRG2Mj22T9Mbu6YGaru7Az4Em55woIgfXvWdHF-Vgx-za6h2KilflLP4_vM8mHb0PMi8Xd_3HqQ60QwIz7GQJjwWKFABmypWV7Ak5FRhbtdwQPSnwYgYx2zQE1g";

const fetchUserProfile = async () => {
  try {
    const response = await axios.get("http://localhost:8080/user/me", {
      headers: {
        Authorization: "Bearer " + varToken,
      },
    });
    console.log(response.data);
    responseData.value = response.data;
  } catch (error: any) {
    console.error("Error fetching profile:", error.message);
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
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
          />
          <p v-if="password && !isPasswordValid" class="text-red-500 text-xs">
            Password must be at least 6 characters
          </p>
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
          />
          <p
            v-if="confirmPassword && !isConfirmPasswordValid"
            class="text-red-500 text-xs"
          >
            Passwords do not match
          </p>
        </div>
      </div>

      <!-- Register Button -->
      <Button
        class="flex items-center justify-center py-[18px]"
        textOptions="text-white text-[14px] font-poppins"
        @click="handleSubmit"
      >
        Register
      </Button>

      <!-- Fetch User Profile Button -->
      <Button
        class="flex items-center justify-center py-[18px] bg-blue-500"
        textOptions="text-white text-[14px] font-poppins"
        @click="fetchUserProfile"
      >
        Fetch User Profile
      </Button>

      <Button
        class="flex items-center justify-center py-[18px] bg-google"
        textOptions="text-titleActive text-[14px] font-poppins"
        :leftIcon="'flat-color-icons:google'"
      >
        Register With Google
      </Button>

      <Button
        class="flex items-center justify-center py-[18px] bg-facebook"
        textOptions="text-white text-[14px] font-poppins"
        :leftIcon="'logos:facebook'"
      >
        Register With Facebook
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
        <span
          class="ml-[6px] cursor-pointer underline"
          @click="router.push('/user/login')"
        >
          Sign in
        </span>
      </label>
    </div>
  </LoginRegisterCard>
</template>
