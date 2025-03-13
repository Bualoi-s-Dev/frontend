<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useApiStore } from "@/stores/api";
import { BusyTimeType } from "@/types/api";
import BackButton from "~/components/BackButton.vue";

const router = useRouter();
const route = useRoute();
const api = useApiStore();

const startTime = ref("");
const endTime = ref("");
const date = ref("");
const valid = ref(true);
const errors = ref<{ [key: string]: string }>({});

const validate = () => {
  errors.value = {};
  if (!date.value) errors.value.date = "Date is required";
  if (!startTime.value) errors.value.startTime = "Start time is required.";
  if (!endTime.value) errors.value.endTime = "End time is required.";
  if (startTime.value && endTime.value && startTime.value >= endTime.value)
    errors.value.time = "Start time must be before end time.";

  return Object.keys(errors.value).length === 0;
};

// Function to construct ISO 8601 date-time string
const constructISODateTime = (dateStr: string, timeStr: string) => {
  return new Date(`${dateStr}T${timeStr}:00Z`).toISOString();
};

const handleSubmit = async () => {
  if (!validate()) return;
  try {
    const payload = {
      type: BusyTimeType.Photographer,
      startTime: constructISODateTime(date.value, startTime.value),
      endTime: constructISODateTime(date.value, endTime.value),
      isValid: valid.value,
    };

    await api.createBusyTime(payload);
    await router.push({ path: `/profile/schedule` });
    useToastify("Successfully created subpackage", { type: "success" });
  } catch (error: any) {
    console.error("Error creating subpackage:", error);
    useToastify(error.message, { type: "error" });
  }
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Create Busy Time
  </div>
  <div class="w-full h-full p-6 flex flex-col">
    <div class="flex flex-row text-lg mt-6">
      Date<span class="text-primary">*</span>
    </div>
    <input
      v-model="date"
      type="date"
      class="border disabled:opacity-50 w-full rounded-md py-1 px-2 text-lg mt-1.5"
      :class="{
        'border-red-500': errors.date,
        'border-stroke': !errors.date,
      }"
    />
    <div v-if="errors.date" class="text-red-500 text-sm mt-1">
      {{ errors.date }}
    </div>

    <div class="flex gap-[16px]">
      <div class="w-full">
        <div class="flex flex-row text-lg mt-6">
          Start Time<span class="text-primary">*</span>
        </div>
        <input
          v-model="startTime"
          type="time"
          class="border disabled:opacity-50 w-full rounded-md py-1 px-2 text-lg mt-1.5"
          :class="{
            'border-red-500': errors.startTime || errors.time,
            'border-stroke': !(errors.startTime || errors.time),
          }"
        />
        <div v-if="errors.startTime" class="text-red-500 text-sm mt-1">
          {{ errors.startTime }}
        </div>
      </div>

      <div class="w-full">
        <div class="flex flex-row text-lg mt-6">
          End Time<span class="text-primary">*</span>
        </div>
        <input
          v-model="endTime"
          type="time"
          class="border disabled:opacity-50 w-full rounded-md py-1 px-2 text-lg mt-1.5"
          :class="{
            'border-red-500': errors.endTime || errors.time,
            'border-stroke': !(errors.endTime || errors.time),
          }"
        />
        <div v-if="errors.endTime" class="text-red-500 text-sm mt-1">
          {{ errors.endTime }}
        </div>
      </div>
    </div>
    <div v-if="errors.time" class="text-red-500 text-sm mt-1">
      {{ errors.time }}
    </div>
    <button
      @click="handleSubmit"
      class="mt-6 ml-auto text-lg px-6 py-2 rounded-lg bg-black text-white disabled:opacity-50"
    >
      Submit
    </button>
  </div>
</template>
