<script setup lang="ts">
definePageMeta({
  layout: "background",
});
import { ref } from "vue";
import logo from "assets/logo.png";
import imageIcon from "assets/icons/image.svg";

const imageUrl = ref("");
const firstName = ref("");
const lastName = ref("");
const gender = ref("");
const lineID = ref("");
const facebook = ref("");
const instagram = ref("");
const bankAccount = ref("");
const accountNumber = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const errors = ref<Record<string, string>>({});

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target?.files?.[0];
  if (file && file.type.startsWith("image/")) {
    imageUrl.value = URL.createObjectURL(file);
    errors.value.imageUrl = "";
  }
};

const validate = () => {
  errors.value = {};

  if (!imageUrl.value) errors.value.imageUrl = "Profile picture is required.";
  if (!firstName.value) errors.value.firstName = "First name is required.";
  if (!lastName.value) errors.value.lastName = "Last name is required.";
  if (!gender.value) errors.value.gender = "Please select a gender.";
  if (!lineID.value) errors.value.lineID = "Line ID is required.";
  if (!facebook.value) errors.value.facebook = "Facebook is required.";
  if (!instagram.value) errors.value.instagram = "Instagram is required.";
  if (!bankAccount.value)
    errors.value.bankAccount = "Please select a bank account.";
  if (!accountNumber.value) {
    errors.value.accountNumber = "Account number is required.";
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (!validate()) return;

  console.log("Image URL:", imageUrl.value);
  console.log("First Name:", firstName.value);
  console.log("Last Name:", lastName.value);
  console.log("Gender:", gender.value);
  console.log("Line ID:", lineID.value);
  console.log("Facebook:", facebook.value);
  console.log("Instagram:", instagram.value);
  console.log("Bank Account:", bankAccount.value);
  console.log("Account Number:", accountNumber.value);
};

const handleChooseImage = () => fileInput.value?.click();
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
    <div class="flex flex-col gap-3">
      <h1 class="text-[18px] text-titleActive tracking-wide">Create Account</h1>
      <h2 class="text-[16px] text-body">As Customer</h2>

      <div class="flex flex-col gap-4">
        <button
          @click="handleChooseImage"
          :style="{ backgroundImage: `url(${imageUrl})` }"
          class="flex border border-stroke rounded-xl flex-col text-label text-base items-center justify-center gap-4 w-full h-[142px] font-light bg-cover bg-center"
          :class="{ 'border-red-500': errors.imageUrl }"
        >
          <template v-if="!imageUrl">
            <img class="w-[41px]" :src="imageIcon" alt="image" />
            <h1 class="text-[10px] text-label">Upload Profile Picture</h1>
          </template>
        </button>
        <p v-if="errors.imageUrl" class="text-red-500 text-xs">
          {{ errors.imageUrl }}
        </p>

        <div class="flex flex-col gap-1">
          <label>First Name<span class="text-primary">*</span></label>
          <input
            v-model="firstName"
            type="text"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.firstName }"
          />
          <p v-if="errors.firstName" class="text-red-500 text-xs">
            {{ errors.firstName }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Last Name<span class="text-primary">*</span></label>
          <input
            v-model="lastName"
            type="text"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.lastName }"
          />
          <p v-if="errors.lastName" class="text-red-500 text-xs">
            {{ errors.lastName }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Gender<span class="text-primary">*</span></label>
          <select
            v-model="gender"
            class="border w-full rounded-md py-1.5 px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.gender }"
          >
            <option disabled value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <p v-if="errors.gender" class="text-red-500 text-xs">
            {{ errors.gender }}
          </p>
        </div>

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
          <label>Bank Account<span class="text-primary">*</span></label>
          <select
            v-model="bankAccount"
            class="border w-full rounded-md py-1.5 px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.bankAccount }"
          >
            <option disabled value="">Select Bank</option>
            <option>Kasikorn</option>
            <option>Krungthai</option>
          </select>
          <p v-if="errors.bankAccount" class="text-red-500 text-xs">
            {{ errors.bankAccount }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Account Number<span class="text-primary">*</span></label>
          <input
            v-model="accountNumber"
            type="text"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.accountNumber }"
          />
          <p v-if="errors.accountNumber" class="text-red-500 text-xs">
            {{ errors.accountNumber }}
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
  <input
    type="file"
    ref="fileInput"
    @change="onFileChange"
    accept="image/*"
    hidden
  />
</template>
