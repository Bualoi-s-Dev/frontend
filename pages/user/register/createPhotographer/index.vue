<script setup lang="ts">
definePageMeta({
  layout: "background",
});
import axios from "axios";

import { ref } from "vue";
import logo from "assets/logo.png";

const route = useRoute();

// Retrieve user data from the previous page
const email = ref(route.query.email || "");
const name = ref(route.query.name || "");
const gender = ref(route.query.gender || "");
const profile = ref(route.query.profile || "");
const phone = ref(route.query.phone || "");
const location = ref(route.query.location || "");

const lineID = ref("");
const facebook = ref("");
const instagram = ref("");
const bankName = ref("");
const bankAccount = ref("");

const errors = ref<Record<string, string>>({});

const validate = () => {
  errors.value = {};
  if (!lineID.value) errors.value.lineID = "Line ID is required.";
  if (!facebook.value) errors.value.facebook = "Facebook is required.";
  if (!instagram.value) errors.value.instagram = "Instagram is required.";
  if (!bankName.value) errors.value.bankName = "Please select a bank name.";
  if (!bankAccount.value) {
    errors.value.bankAccount = "Bank Account is required.";
  }

  return Object.keys(errors.value).length === 0;
};

const varToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMjUwZDIyYTkzODVmYzQ4NDJhYTU2YWJhZjUzZmU5NDcxNmVjNTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2UtMi03NmY2MiIsImF1ZCI6InNlLTItNzZmNjIiLCJhdXRoX3RpbWUiOjE3MzkzNTE2OTMsInVzZXJfaWQiOiJGeWQzMmhEU2dUUTNLNTE2aHRQSklIQ0RzeWcyIiwic3ViIjoiRnlkMzJoRFNnVFEzSzUxNmh0UEpJSENEc3lnMiIsImlhdCI6MTczOTM1MTY5MywiZXhwIjoxNzM5MzU1MjkzLCJlbWFpbCI6Indpcm9vbnB1cmkxMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIndpcm9vbnB1cmkxMjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cQY-9MRBUcwevFFFOEIWipZEuY9Kasa55fDiKar2v57-i_207qIy87h4LMNqlYNYMJBHGgBfNyMs11P2nB2XSmLSPi9k35eb_76Z2MJxW37rYu935hkyL8ZEt-NROLhgvn3qPVSW3Cx9GkuNhJIjlkXThitEnpcF-YBJCpKDywef2X-LmUT1vjRNVlPrI5z4OMJe6HCSEmXcx-U6aKvKTm4p2WOaRG2Mj22T9Mbu6YGaru7Az4Em55woIgfXvWdHF-Vgx-za6h2KilflLP4_vM8mHb0PMi8Xd_3HqQ60QwIz7GQJjwWKFABmypWV7Ak5FRhbtdwQPSnwYgYx2zQE1g";
const handleSubmit = async () => {
  if (!validate()) return;

  try {
    // Prepare the JSON payload
    const payload = {
      /* id: "67ac57c04850b3f0bcc2ef60", */
      email: email.value,
      name: name.value,
      gender: gender.value,
      profile: profile.value || null,
      phone: phone.value,
      location: location.value,
      isPhotographer: true,
      bankName: bankName.value,
      bankAccount: bankAccount.value,
      lineID: lineID.value,
      facebook: facebook.value,
      instagram: instagram.value,
      showcasePackages: null,
      packages: null,
    };
    console.log(payload);
    // Send PUT request to update user profile with JSON payload
    await axios.put(`http://localhost:8080/user/profile`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${varToken}`,
      },
    });
    console.log(payload);
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
    <div class="flex flex-col">
      <h1 class="text-[18px] text-titleActive tracking-wide">Create Account</h1>
      <h2 class="text-[16px] text-body">As Photographer</h2>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label>Line ID<span class="text-primary">*</span></label>
          <input
            v-model="lineID"
            type="text"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.lineID }"
          />
          <p v-if="errors.lineID" class="text-red-500 text-xs">
            {{ errors.lineID }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Facebook<span class="text-primary">*</span></label>
          <input
            v-model="facebook"
            type="text"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.facebook }"
          />
          <p v-if="errors.facebook" class="text-red-500 text-xs">
            {{ errors.facebook }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Instagram<span class="text-primary">*</span></label>
          <input
            v-model="instagram"
            type="text"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.instagram }"
          />
          <p v-if="errors.instagram" class="text-red-500 text-xs">
            {{ errors.instagram }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Bank Name<span class="text-primary">*</span></label>
          <select
            v-model="bankName"
            class="border w-full rounded-md py-1.5 px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.bankName }"
          >
            <option disabled value="">Select Bank</option>
            <option>Kasikorn</option>
            <option>Bangkok Bank</option>
            <option>SCB</option>
            <option>Krungthai</option>
            <option>TMBThanachart</option>
            <option>Krungsri</option>
            <option>Government Savings</option>
            <option>TMB</option>
            <option>UOB Thailand</option>
            <option>CIMB Thailand</option>
            <option>Standard Chartered</option>
            <option>ICBC Thailand</option>
          </select>
          <p v-if="errors.bankName" class="text-red-500 text-xs">
            {{ errors.bankName }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Bank Account<span class="text-primary">*</span></label>
          <input
            v-model="bankAccount"
            type="text"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.bankAccount }"
          />
          <p v-if="errors.bankAccount" class="text-red-500 text-xs">
            {{ errors.bankAccount }}
          </p>
        </div>

        <!-- Submit Button -->
        <Button
          class="flex items-center justify-center py-[12px]"
          textOptions="text-white text-[14px] font-poppins tracking-wider"
          @click="handleSubmit"
        >
          Submit
        </Button>
      </div>
    </div>
  </LoginRegisterCard>
</template>
