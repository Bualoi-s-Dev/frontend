<script setup lang="ts">
definePageMeta({
  layout: "background",
});

import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

import LoginRegisterCard from "~/components/LoginRegisterCard.vue";

const router = useRouter();

// Handle form submission
const handleSubmit = () => {
  router.push("/user/login");
};

</script>

<template>
  <LoginRegisterCard>
    <div class="flex flex-col gap-[20px]">
        <div class="flex flex-col items-center justify-center">
            <Icon icon="line-md:circle-twotone-to-confirm-circle-transition" style="color: rgb(230, 130, 130); width: 120; height: inherit;" />
            <label class="text-red-400 text-xl">successful</label>
            <p class="text-sm/6 text-center pl-6 pr-6">Congratulations! Your password has been changed. Click continue to login</p>
        </div>
      <div class="flex flex-col gap-[16px]">
        <Button
          class="flex items-center justify-center py-[12px]"
          textOptions="text-white text-[14px] font-poppins"
          @click="handleSubmit"
          >Return to Login
        </Button>
      </div>
    </div>
  </LoginRegisterCard>
</template>
