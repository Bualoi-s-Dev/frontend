<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  setDate,
  setMonth,
  setYear,
} from "date-fns";

const props = defineProps<{
  inputDate: string;
  showDate?: boolean;
}>();

const selectedDate = ref(new Date(props.inputDate));

const day = computed(() =>
  selectedDate.value ? new Date(selectedDate.value).getDate() : ""
);
const month = computed(() =>
  selectedDate.value ? new Date(selectedDate.value).getMonth() + 1 : ""
);
const year = computed(() =>
  selectedDate.value ? new Date(selectedDate.value).getFullYear() : ""
);

watch(props, (newProps) => {
  selectedDate.value = new Date(newProps.inputDate);
});

const weekDays = computed(() => {
  // Get the middle index of the week (3rd index in a 7-day array)
  const middleIndex = Math.floor(7 / 2);

  // Set the start of the "week" so that selectedDate is in the middle
  const customStart = addDays(selectedDate.value, -middleIndex);

  // Generate the 7-day array
  return Array.from({ length: 7 }, (_, i) => addDays(customStart, i));
});


const isSelected = (date: Date) => {
  return isSameDay(date, selectedDate.value);
};
</script>

<template>
  <div class="flex space-x-1">
    <div
      v-for="day in weekDays"
      :key="day.toString()"
      class="p-1 border rounded-lg text-center cursor-pointer w-11"
      :class="{
        'border-primary text-primary': day,
        'border-body text-body': !isSelected(day),
      }"
    >
      <div class="text-sm">{{ format(day, "EEE") }}</div>
      <div v-if="showDate" class="text-sm">{{ format(day, "d") }}</div>
    </div>
  </div>
</template>
isSelected
