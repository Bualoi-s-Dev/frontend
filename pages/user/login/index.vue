<script setup lang="ts">
definePageMeta({
  layout: "background",
});

import logo from "assets/logo.png";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const auth = useAuthStore();
const user = useUserStore();

// Email validation (simple regex)
const isEmailValid = computed(() =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)
);

// Password validation (min 6 chars)
const isPasswordValid = computed(() => password.value.length >= 6);

// Form validation
const isFormValid = computed(
  () =>
    isEmailValid.value && isPasswordValid.value
);

const processing = ref(false);

const onLoginSuccess = async () => {
  processing.value = true;
  try {
    await user.updateProfile();
  } catch (error: any) {
    console.log(error.message)
  }
  await router.push("/");
}

const handleGoogleLogin = async () => {
  processing.value = true;
  try {
    await auth.handleGoogleLogin();
    onLoginSuccess();
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    processing.value = false;
  }
}

const handleFacebookLogin = async () => {
  processing.value = true;
  try {
    await auth.handleFacebookLogin();
    onLoginSuccess();
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    processing.value = false;
  }
}

// Handle form submission
const handleSubmit = async () => {
  processing.value = true;
  try {
    await auth.handleLogin(email.value, password.value);
    onLoginSuccess();
  } catch (error: any) {
    console.log("error", error.message)
    errorMessage.value = error.message;
  } finally {
    processing.value = false;
  }
}
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
          <input :disabled="processing" v-model="email" type="email"
            class="border w-full disabled:opacity-50 rounded-md py-[6px] px-2 text-[14px] border-stroke" />
          <p v-if="email && !isEmailValid" class="text-red-500 text-xs">
            Invalid email format
          </p>
        </div>

        <div>
          <label>Password</label>
          <input :disabled="processing" v-model="password" type="password"
            class="border w-full disabled:opacity-50 rounded-md py-[6px] px-2 text-[14px] border-stroke" />
          <p v-if="password && !isPasswordValid" class="text-red-500 text-xs">
            Password must be at least 6 characters
          </p>
        </div>
        <div class="">
          <label class="text-label text-[14px]">
            <button :disabled="processing" class="cursor-pointer  disabled:opacity-50 underline"
              @click="router.push('/user/login/reset/1')">Forgot your
              password?</button>
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-[16px]">
        <span class="text-xs text-red-500">{{ errorMessage }}</span>
        <Button :disabled="!isFormValid || processing" class="flex items-center justify-center py-[12px]"
          textOptions="text-white text-[14px] font-poppins" @click="handleSubmit">Login
        </Button>
        <Button :disabled="processing" bgColor="bg-gray-200" class="flex items-center justify-center py-[18px]"
          textOptions="text-black text-[14px] font-poppins" leftIcon="flat-color-icons:google"
          @click="handleGoogleLogin">
          Login with Google
        </Button>
        <Button :disabled="processing" class="flex items-center justify-center py-[12px] bg-facebook"
          textOptions="text-white text-[14px] font-poppins" leftIcon="logos:facebook" @click="handleFacebookLogin">
          Login With Facebook
        </Button>
      </div>
      <div class="pl-[8px] pt-[20px]">
        <label class="text-label text-[14px]">
          new to Photomatch?
          <button :disabled="processing" class="ml-[6px] disabled:opacity-50 cursor-pointer underline"
            @click="router.push('/user/register')">Get Started</button>
        </label>
      </div>
    </div>
  </LoginRegisterCard>
</template>
