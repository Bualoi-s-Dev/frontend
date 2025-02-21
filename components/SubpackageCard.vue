<script setup lang="ts">
import { defineProps, computed, ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  title: string;
  description: string;
  price: number;
  timeStart: string;
  timeEnd: string;
  dateStart: string;
  dateEnd: string;
  activeDays: string[];
  isOwner?: boolean;
}>();

const showConfirmDialog = ref(false);

const days = computed(() => [
  { name: "Sun", active: props.activeDays.includes("Sun") },
  { name: "Mon", active: props.activeDays.includes("Mon") },
  { name: "Tue", active: props.activeDays.includes("Tue") },
  { name: "Wed", active: props.activeDays.includes("Wed") },
  { name: "Thu", active: props.activeDays.includes("Thu") },
  { name: "Fri", active: props.activeDays.includes("Fri") },
  { name: "Sat", active: props.activeDays.includes("Sat") },
]);

const confirmDelete = () => {
  showConfirmDialog.value = true;
};

const deleteItem = () => {
  // Handle delete logic here
  console.log("Item deleted");
  showConfirmDialog.value = false;
};
</script>

<template>
  <div
    class="flex flex-col gap-[10px] py-[20px] px-[15px] w-full h-fit shadow-lg bg-innerBackground rounded-lg"
  >
    <div class="flex justify-between items-center w-full">
      <h1 class="text-titleActive text-[16px]">{{ props.title }}</h1>
      <div v-if="props.isOwner" class="flex gap-[10px]">
        <Icon
          icon="icon-park-outline:edit-two"
          class="w-[27px] h-[27px] text-body cursor-pointer"
        />
        <Icon
          icon="pajamas:remove-all"
          class="w-[27px] h-[27px] text-body cursor-pointer"
          @click="confirmDelete"
        />
      </div>
    </div>
    <p class="text-body text-[14px]">
      {{ props.description }}
    </p>
    <div class="flex py-[5px] gap-[10px]">
      <p
        v-for="(day, index) in days"
        :key="index"
        class="flex justify-center w-[36px] py-[5px] border rounded-[5px] text-[12px]"
        :class="{
          'border-primary text-primary': day.active,
          'border-body text-body': !day.active,
        }"
      >
        {{ day.name }}
      </p>
    </div>
    <div class="flex justify-between items-end">
      <div class="flex flex-col gap-[10px]">
        <p class="text-primary text-[16px]">
          {{ props.timeStart }} - {{ props.timeEnd }}
        </p>
        <p class="text-primary text-[16px]">
          {{ props.dateStart }} - {{ props.dateEnd }}
        </p>
      </div>
      <p class="text-primary text-[16px]">
        ฿ {{ props.price.toLocaleString() }}
      </p>
    </div>
  </div>

  <!-- Confirmation Dialog -->
  <div
    v-if="showConfirmDialog"
    class="fixed inset-0 flex items-center justify-center"
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
          Are you sure to delete this subpackage?
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
