<template>
  <div
    :class="[
      'flex flex-col gap-2 rounded-xl drop-shadow-xl p-3 text-white relative',
      interval.type === 'Appointment'
        ? 'bg-red-schedule'
        : 'bg-scarlet-schedule',
    ]"
  >
    <p v-if="interval.type === 'Appointment'">My appointment</p>
    <p v-else>
      {{ interval.name }}
      <!-- Delete Button -->
      <button
        class="absolute top-2 right-2 bg-white text-red-500 px-2 py-1 rounded-md text-sm"
        @click="confirmDelete"
      >
        ✖
      </button>
    </p>
    {{ interval.startTime }} - {{ interval.endTime }}
  </div>

  <!-- Confirmation Dialog -->
  <div
    v-if="showConfirmDialog"
    class="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-[101]"
  ></div>

  <div
    v-if="showConfirmDialog"
    class="fixed inset-0 flex items-center justify-center z-[102]"
  >
    <div
      class="flex gap-[20px] bg-white p-[25px] rounded-lg shadow-lg w-[346px]"
    >
      <Icon
        icon="pajamas:remove-all"
        class="w-[50px] h-[50px] text-body cursor-pointer"
      />
      <div class="flex flex-col gap-[20px]">
        <p class="text-[16px] text-titleActive">
          Are you sure you want to delete this busy time?
        </p>
        <div class="flex justify-between">
          <button
            class="text-[14px] text-titleActive py-[8px] px-[30px] border border-titleActive rounded-[6px]"
            @click="showConfirmDialog = false"
          >
            No
          </button>
          <button
            class="text-[14px] text-white bg-titleActive py-[8px] px-[30px] border border-titleActive rounded-[6px]"
            @click="deleteItem"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { BusyTime } from "~/types/api";
import { Icon } from "@iconify/vue";
// Define the props to be passed from the parent
const props = defineProps({
  interval: {
    type: Object as () => BusyTime,
    required: true,
  },
});

const showConfirmDialog = ref(false);

// Define the emit event to notify the parent when the delete button is clicked
const emit = defineEmits<{
  (e: "delete", id: string): void;
  (e: "closeDialog"): void;
  (e: "confirmDelete"): void;
}>();

const confirmDelete = () => {
  showConfirmDialog.value = true;
};

const deleteItem = () => {
  emit("delete", props.interval.id);
  showConfirmDialog.value = false;
};
</script>
