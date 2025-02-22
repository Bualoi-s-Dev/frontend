<script setup lang="ts">
definePageMeta({
  layout: "background",
});

import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "assets/logo.png";

const router = useRouter();

const imageUrl = ref("");
const name = ref("");
const gender = ref("");
const phoneNumber = ref("");
const location = ref("");
const errors = ref<Record<string, string>>({});

const api = useApiStore();

const validate = () => {
  errors.value = {};
  if (!imageUrl.value) errors.value.imageUrl = "Profile picture is required.";
  if (!name.value) errors.value.name = "Name is required.";
  if (!gender.value) errors.value.gender = "Please select a gender.";
  if (!phoneNumber.value)
    errors.value.phoneNumber = "Phone number is required.";
  if (!location.value) errors.value.location = "Location is required.";
  return Object.keys(errors.value).length === 0;
};

const updating = ref(false);

const handleSubmit = async () => {
  if (!validate()) return;
  updating.value = true;
  try {
    const payload = {
      name: name.value,
      gender: gender.value,
      profile: imageUrl.value,
      phone: phoneNumber.value,
      location: location.value,
    };
    const response = await api.updateUserInformation(payload);
    await router.push({ path: "/user/register/selectRole" });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    useToastify(error.message, { type: "error" });
  } finally {
    updating.value = false;
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
    <div class="flex flex-col gap-3">
      <h1 class="text-[18px] text-titleActive tracking-wide">Create User</h1>

      <div class="flex flex-col gap-4">
        <FileChooser v-model="imageUrl" :disabled="updating"/>
        <p v-if="errors.imageUrl" class="text-red-500 text-xs">
          {{ errors.imageUrl }}
        </p>

        <!-- First Name -->
        <div class="flex flex-col gap-1">
          <label class="text-[16px]"
            >Name<span class="text-primary">*</span></label
          >
          <input
            :disabled="updating"
            v-model="name"
            type="text"
            class="border disabled:opacity-50 w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-500 text-xs">
            {{ errors.name }}
          </p>
        </div>

        <!-- Gender -->
        <div class="flex flex-col gap-1">
          <label class="text-[16px]"
            >Gender<span class="text-primary">*</span></label
          >
          <select
            :disabled="updating"
            class="border w-full disabled:opacity-50 rounded-md py-1.5 px-2 text-[14px] border-stroke"
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
            :disabled="updating"
            v-model="phoneNumber"
            type="text"
            class="border w-full rounded-md py-[6px] disabled:opacity-50 px-2 text-[14px] border-stroke"
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
            :disabled="updating"
            v-model="location"
            type="text"
            class="border disabled:opacity-50 w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.location }"
          />
          <p v-if="errors.location" class="text-red-500 text-xs">
            {{ errors.location }}
          </p>
        </div>

        <!-- Submit Button -->
        <Button
          :disabled="updating"
          class="flex disabled:opacity-50 items-center justify-center py-[12px]"
          textOptions="text-white text-[14px] font-poppins tracking-wider"
          @click="handleSubmit"
        >
          Submit
        </Button>
      </div>
    </div>
  </LoginRegisterCard>
</template>
