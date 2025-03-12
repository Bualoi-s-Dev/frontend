<script setup lang="ts">
definePageMeta({
  layout: "background",
});

import { ref } from "vue";
import logo from "assets/logo.png";
import { BankName } from "@/types/api";

const lineID = ref("");
const facebook = ref("");
const instagram = ref("");
const bankName = ref("");
const bankAccount = ref("");

const router = useRouter();

const errors = ref<Record<string, string>>({});
const api = useApiStore();

const formatBankName = (bank: string) => {
  return bank
    .replace(/_/g, " ")
    .replace("BANK", "Bank")
    .replace("THAILAND", "(Thailand)");
};

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

const updating = ref(false);

const updateUserProfile = async () => {
  if (!validate()) return;

  updating.value = true;
  try {
    const payload = {
      bankName: bankName.value as BankName,
      bankAccount: bankAccount.value,
      lineID: lineID.value,
      facebook: facebook.value,
      instagram: instagram.value,
    };
    const response = await api.updateUserInformation(payload);
    router.push("/");
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
      <BackButton @click="() => router.push('/user/login')" />
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
            :disabled="updating"
            v-model="lineID"
            type="text"
            class="border disabled:opacity-50 w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.lineID }"
          />
          <p v-if="errors.lineID" class="text-red-500 text-xs">
            {{ errors.lineID }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Facebook<span class="text-primary">*</span></label>
          <input
            :disabled="updating"
            v-model="facebook"
            type="text"
            class="border disabled:opacity-50 w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.facebook }"
          />
          <p v-if="errors.facebook" class="text-red-500 text-xs">
            {{ errors.facebook }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Instagram<span class="text-primary">*</span></label>
          <input
            :disabled="updating"
            v-model="instagram"
            type="text"
            class="border disabled:opacity-50 w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.instagram }"
          />
          <p v-if="errors.instagram" class="text-red-500 text-xs">
            {{ errors.instagram }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Bank Name<span class="text-primary">*</span></label>
          <select
            :disabled="updating"
            v-model="bankName"
            class="border disabled:opacity-50 w-full rounded-md py-1.5 px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.bankName }"
          >
            <option disabled value="">Select Bank</option>
            <option v-for="(label, key) in BankName" :key="key" :value="label">
              {{ formatBankName(label) }}
            </option>
          </select>
          <p v-if="errors.bankName" class="text-red-500 text-xs">
            {{ errors.bankName }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label>Bank Account<span class="text-primary">*</span></label>
          <input
            :disabled="updating"
            v-model="bankAccount"
            type="text"
            class="border disabled:opacity-50 w-full rounded-md py-[6px] px-2 text-[14px] border-stroke"
            :class="{ 'border-red-500': errors.bankAccount }"
          />
          <p v-if="errors.bankAccount" class="text-red-500 text-xs">
            {{ errors.bankAccount }}
          </p>
        </div>

        <!-- Submit Button -->
        <Button
          :disabled="updating"
          class="flex disabled:opacity-50 items-center justify-center py-[12px]"
          textOptions="text-white text-[14px] font-poppins tracking-wider"
          @click="updateUserProfile"
        >
          Submit
        </Button>
      </div>
    </div>
  </LoginRegisterCard>
</template>
