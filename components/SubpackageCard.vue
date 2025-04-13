<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  packageId: string;
  subpackageId: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  timeStart: string;
  timeEnd: string;
  dateStart: string;
  dateEnd: string;
  activeDays: string[];
  isInf: boolean;
  isOwner?: boolean;
}>();

const emit = defineEmits(["delete"]);

const showConfirmDialog = ref(false);

const days = computed(() => [
  { name: "Sun", active: props.activeDays.includes("SUN") },
  { name: "Mon", active: props.activeDays.includes("MON") },
  { name: "Tue", active: props.activeDays.includes("TUE") },
  { name: "Wed", active: props.activeDays.includes("WED") },
  { name: "Thu", active: props.activeDays.includes("THU") },
  { name: "Fri", active: props.activeDays.includes("FRI") },
  { name: "Sat", active: props.activeDays.includes("SAT") },
]);

// Compute formatted duration string
const formattedDuration = computed(() => {
  return `${props.duration} ${props.duration === 1 ? "Min" : "Mins"}`;
});

const handleClick = () => {
  if (!props.isOwner)
    router.push(
      `/package/${props.packageId}/subpackage/schedule/${props.subpackageId}`
    );
};

const confirmDelete = () => {
  showConfirmDialog.value = true;
};

const deleteItem = () => {
  emit("delete", props.subpackageId);
  showConfirmDialog.value = false;
};

const editItem = () => {
  router.push(
    `/package/${props.packageId}/subpackage/edit/${props.subpackageId}`
  );
};
</script>

<template>
  <!-- TODO: very inefficient to render dialog in every subpackage card, refactor to ancestor elements -->
  <div
    v-if="showConfirmDialog"
    class="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-[101]"
  ></div>

  <button
    @click="handleClick"
    class="flex flex-col gap-[10px] py-[20px] px-[15px] w-full h-fit bg-white rounded-2xl shadow-lg"
  >
    <div class="flex justify-between items-center w-full">
      <h1 class="text-xl font-semibold text-gray-900">{{ props.title }}</h1>
      <div v-if="props.isOwner" class="flex gap-[10px]">
        <button
          @click="editItem"
          class="p-2 rounded-full"
          aria-label="Edit package"
        >
          <Icon icon="iconoir:edit" width="24px" />
        </button>
        <button
          @click="confirmDelete"
          class="p-2 rounded-full"
          aria-label="Edit package"
        >
          <Icon icon="iconoir:trash" width="24px" />
        </button>
      </div>
    </div>
    <p class="text-body text-sm text-start">
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
      <div class="flex flex-col gap-[10px] items-start">
        <p class="text-primary-600 font-medium text-primary">
          Duration: {{ formattedDuration }}
        </p>
        <p class="text-primary-600 font-medium text-primary">
          {{ props.timeStart }} - {{ props.timeEnd }}
        </p>
        <p
          v-if="!props.isInf"
          class="text-primary-600 font-medium text-primary"
        >
          {{ props.dateStart }} - {{ props.dateEnd }}
        </p>
      </div>
      <p class="text-primary-600 font-medium text-primary">
        ฿ {{ props.price.toLocaleString() }}
      </p>
    </div>
  </button>

  <!-- Confirmation Dialog -->
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
          Are you sure you want to delete this subpackage?
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
