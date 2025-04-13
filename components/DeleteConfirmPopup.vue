<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";


const props = defineProps<{
  show: boolean;
  itemText: string;
  disabled?: boolean;
}>();

const emit = defineEmits(["close", "confirm"]);
</script>

<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-[102]">
    <div class="flex gap-[20px] bg-white p-[25px] rounded-lg shadow-lg w-[346px]">
      <Icon icon="pajamas:remove-all" class="w-[50px] h-[50px] text-body cursor-pointer" />
      <div class="flex flex-col gap-[20px]">
        <p class="text-[16px] text-titleActive">
          Are you sure you want to delete this {{itemText}}?
        </p>
        <div class="flex justify-between">
          <button class="text-[14px] text-titleActive py-[8px] px-[30px] border border-titleActive rounded-[6px]"
            @click="$emit('close')">
            No
          </button>
          <button
            :disabled="disabled"
            class="text-[14px] disabled:opacity-50 text-white bg-titleActive py-[8px] px-[30px] border border-titleActive rounded-[6px]"
            @click="$emit('confirm')">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show" class="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-[101]"></div>
</template>
