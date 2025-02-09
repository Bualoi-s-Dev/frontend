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
const route = useRoute();
const email = ref("");
const errorMessage = ref("");
const pages = [1, 2, 3, 4];
const currentPage = Number(route.params.id);

// Email validation (simple regex)
const isEmailValid = computed(() =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)
);

// Form validation
const isFormValid = computed(
  () =>
    isEmailValid.value
);

// Handle form submission
const handleSubmit = () => {
  if (!isFormValid.value) {
    errorMessage.value = "Please correct the errors before submitting.";
    return;
  }

  console.log("Email:", email.value);
  errorMessage.value = ""; // Clear errors if successful

  router.push(`/user/login/reset/${currentPage % 4 + 1}`);
};
</script>

<template>
    <LoginRegisterCard>
        <div class="flex flex-row items-end gap-3 font-extrabold text-xl">
            <img :src="logo" alt="logo" class="w-9" />
            Photomatch
        </div>
        <template v-if="currentPage == 1">
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
        </template>
        <template v-else-if="currentPage == 2">
            <div class="flex flex-col gap-[20px]">
                <div class="flex flex-col gap-[16px]">
                    <div>
                        <div class="mb-3">
                            <p class="text-lg">Check your email</p>
                        </div>
                        <p class="text-sm/6">We sent a reset link to 653xxxxx21@student.chula.ac.th enter 5 digit code that mentioned in the email</p>
                        <div class="flex space-x-2 p-4">
                            <div class="w-12 h-12 flex items-center justify-center border border-black rounded-lg text-lg font-semibold">
                                8
                            </div>
                            <div class="w-12 h-12 flex items-center justify-center border border-black rounded-lg text-lg font-semibold">
                                5
                            </div>
                            <div class="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg text-lg text-gray-400">
                                &nbsp;
                            </div>
                            <div class="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg text-lg text-gray-400">
                                &nbsp;
                            </div>
                            <div class="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg text-lg text-gray-400">
                                &nbsp;
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-[16px]">
                    <Button
                    class="flex items-center justify-center py-[12px]"
                    textOptions="text-white text-[14px] font-poppins"
                    @click="handleSubmit"
                    >Verify Code
                    </Button>
                </div>
            </div>
        </template>
        <div class="flex items-center justify-center">
            <div
            v-for="step in pages"
            :key="step"
            class="flex items-center"
            >
            <div
                class="w-10 h-10 flex items-center justify-center rounded-full border-2"
                :class="step === currentPage ? 'bg-black text-white border-black' : 'bg-white text-black border-black'"
            >
                {{ step }}
            </div>
            <div v-if="step !== pages.length" class="w-5 h-1 bg-black"></div>
            </div>
        </div>
    </LoginRegisterCard>
</template>


