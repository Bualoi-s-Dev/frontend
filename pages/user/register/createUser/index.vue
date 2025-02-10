<script setup lang="ts">
definePageMeta({
  layout: "background",
});
import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "assets/logo.png";
import imageIcon from "assets/icons/image.svg";

const router = useRouter();
const imageUrl = ref("");
const firstName = ref("");
const lastName = ref("");
const gender = ref("");
const phoneNumber = ref("");
const location = ref("");
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
  if (!phoneNumber.value) {
    errors.value.phoneNumber = "Phone number is required.";
  } else if (!/^\d+$/.test(phoneNumber.value)) {
    errors.value.phoneNumber = "Phone number must be numeric.";
  }
  if (!location.value) errors.value.location = "Location is required.";

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (!validate()) return;

  console.log("Image URL:", imageUrl.value);
  console.log("First Name:", firstName.value);
  console.log("Last Name:", lastName.value);
  console.log("Gender:", gender.value);
  console.log("Phone Number:", phoneNumber.value);
  console.log("Location:", location.value);

  router.push("/user/register/selectRole");
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
      <h1 class="text-[18px] text-titleActive tracking-wide">Create User</h1>

      <div class="flex flex-col gap-4">
        <button
          @click="handleChooseImage"
          :style="{ backgroundImage: `url(${imageUrl})` }"
          class="flex border border-stroke rounded-xl flex-col text-label text-base items-center justify-center gap-4 w-full h-[142px] font-light bg-cover bg-center"
          :class="{ 'border-red-500': errors.imageUrl }"
        >
          <template v-if="!imageUrl">
            <img class="w-[41px]" :src="imageIcon" alt="image" />
            <h1 class="text-[10px] text-label">Package Thumbnail</h1>
          </template>
        </button>
        <p v-if="errors.imageUrl" class="text-red-500 text-xs">
          {{ errors.imageUrl }}
        </p>

        <!-- First Name -->
        <div class="flex flex-col gap-1">
          <label class="text-[16px]"
            >First Name<span class="text-primary">*</span></label
          >
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

        <!-- Last Name -->
        <div class="flex flex-col gap-1">
          <label class="text-[16px]"
            >Last Name<span class="text-primary">*</span></label
          >
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

        <!-- Gender -->
        <div class="flex flex-col gap-1">
          <label class="text-[16px]"
            >Gender<span class="text-primary">*</span></label
          >
          <select
            class="border w-full rounded-md py-1.5 px-2 text-[14px] border-stroke"
            v-model="gender"
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

        <!-- Phone Number -->
        <div class="flex flex-col gap-1">
          <label class="text-[16px]"
            >Phone Number<span class="text-primary">*</span></label
          >
          <input
            v-model="phoneNumber"
            type="text"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.phoneNumber }"
          />
          <p v-if="errors.phoneNumber" class="text-red-500 text-xs">
            {{ errors.phoneNumber }}
          </p>
        </div>

        <!-- Location -->
        <div class="flex flex-col gap-1">
          <label class="text-[16px]"
            >Location<span class="text-primary">*</span></label
          >
          <input
            v-model="location"
            type="text"
            class="border w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.location }"
          />
          <p v-if="errors.location" class="text-red-500 text-xs">
            {{ errors.location }}
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

  <!-- Hidden File Input -->
  <input
    type="file"
    ref="fileInput"
    @change="onFileChange"
    accept="image/*"
    style="display: none"
  />
</template>
