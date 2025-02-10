<script setup lang="ts">
definePageMeta({
  layout: "background",
});
import { ref } from "vue";
import logo from "assets/logo.png";

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

const handleSubmit = () => {
  if (!validate()) return;
  console.log("Line ID:", lineID.value);
  console.log("Facebook:", facebook.value);
  console.log("Instagram:", instagram.value);
  console.log("Bank Name:", bankName.value);
  console.log("Bank Account:", bankAccount.value);
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
            <option>Krungthai</option>
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
