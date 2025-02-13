<script setup lang="ts">
definePageMeta({
  layout: "background",
});

import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import logo from "assets/logo.png";
import { Icon } from '@iconify/vue';

import LoginRegisterCard from "~/components/LoginRegisterCard.vue";

const router = useRouter();
const route = useRoute();
const email = ref("");
const status = ref(0);
const errorMessage = ref("");
const pages = [1, 2];
const currentPage = Number(route.params.id);

const auth = useAuthStore();

const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode"); // Should be "resetPassword"
const actionCode = urlParams.get("oobCode"); // The verification code

if (mode === "resetPassword" && actionCode) {
  console.log("Password reset successful!");
  // Redirect to login or dashboard
  window.location.href = "/user/login";
}

// Email validation (simple regex)
const isEmailValid = computed(() =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)
);

const updateStatus = (cur: number) => {
    // status.value = (status.value + 1) % 3;
    status.value = cur;
}

const handleForgotPassword = async() => {
    if (currentPage == 1 && !isEmailValid.value) {
        errorMessage.value = "Please correct the errors before submitting.";
        return;
    }

    updateStatus(1);

    try {
        await auth.handleForgotPassword(email.value);
        if (currentPage == 1) router.push(`/user/login/reset/2`);
    } catch (error: any) {
        errorMessage.value = error.message;
    }
}

// Handle form submission
const handleSubmit = () => {
    router.push(`/user/login/reset/success`);
}
</script>

<template>
    <div class="ml-5">
        <BackButton />
    </div>
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
                        <p v-else-if="status == 1" class="text-green-500 text-xs">
                            An email has been sent
                        </p>
                    </div>
                </div>
                <div class="flex flex-col gap-[16px]">
                    <Button
                    class="flex items-center justify-center py-[12px] hover:bg-red-600 transition"
                    textOptions="text-white text-[14px] font-poppins"
                    @click="handleForgotPassword"
                    >Send
                    </Button>
                </div>
            </div>
        </template>
        <template v-else-if="currentPage == 2">
            <div class="flex flex-col gap-[20px]">
                <div class="flex flex-col gap-[16px]">
                    <div>
                        <div class="mb-3">
                            <p class="text-lg">Password reset email sent.</p>
                        </div>
                        <p class="text-sm/6">The email has been sent. Please check your email to reset password.</p>
                    </div>
                </div>
                <div class="flex flex-col gap-[16px]">
                    <Button
                    class="flex items-center justify-center py-[12px] hover:bg-red-600 transition"
                    textOptions="text-white text-[14px] font-poppins"
                    @click="handleForgotPassword"
                    >Resend
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
            v-if="step >= currentPage">
                {{ step }}
            </div>
            <div
                class="w-10 h-10 flex items-center justify-center rounded-full border-2"
                :class="step === currentPage ? 'bg-black text-white border-black' : 'bg-white text-black border-black'"
            v-else>
                <Icon icon="tabler:check" style="color: black;" />
            </div>
            <div v-if="step !== pages.length" class="w-5 h-1 bg-black"></div>
            </div>
        </div>
    </LoginRegisterCard>
</template>


