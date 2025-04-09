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
  activeDays?: string[];
}>();

const emit = defineEmits<{
  (e: "update:inputDate", value:string): void;
}>();

const updateSelectedDate = ( date: Date ) => {
  selectedDate.value = date;
  emit('update:inputDate', date.toISOString().split('T')[0]);
}

const days = computed(() => [
  { name: "Sun", active: props.activeDays?.includes("SUN") ?? false },
  { name: "Mon", active: props.activeDays?.includes("MON") ?? false },
  { name: "Tue", active: props.activeDays?.includes("TUE") ?? false },
  { name: "Wed", active: props.activeDays?.includes("WED") ?? false },
  { name: "Thu", active: props.activeDays?.includes("THU") ?? false },
  { name: "Fri", active: props.activeDays?.includes("FRI") ?? false },
  { name: "Sat", active: props.activeDays?.includes("SAT") ?? false },
]);

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
  <div class="flex justify-between mt-2">
    <button
      v-for="(date, index) in weekDays"
      :key="index"
      class="flex flex-col items-center w-[36px] py-[10px] px-[12px] border rounded-[5px] text-[12px] font-light cursor-pointer"
      :class="{
        'bg-primary text-white': isSelected(date),
        'border-primary text-primary': activeDays?.includes(
          format(date, 'EEE').toUpperCase()
        ),
        'border-stroke text-placeHolder': !activeDays?.includes(
          format(date, 'EEE').toUpperCase()
        ),
      }"
      @click="updateSelectedDate(date)"
    >
      <div>{{ format(date, "EEE") }}</div>
      <div>{{ format(date, "d") }}</div>
    </button>
  </div>
</template>
