<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { PackageType } from "~/types/api";

const showConfirmDialog = ref(false);
const emit = defineEmits<{
  (
    e: "applyFilter",
    filterData: {
      url: string;
    }
  ): void;
  (e: "delete", id: string): void;
  (e: "closeFilter"): void;
  (e: "openFilter"): void;
}>();

const startDate = ref("");
const endDate = ref("");
const location = ref("")
const selectedCategory = ref(); // Default selected category
const dropdownOpen = ref(false);
const activeDays = ref<string[]>([]);
const availableCategories = Object.values(PackageType);

// Days
const toggleDay = (day: string) => {
  const uppercaseDay = day.toUpperCase(); // Ensure the day is in uppercase

  if (activeDays.value.includes(uppercaseDay)) {
    activeDays.value = activeDays.value.filter((d) => d !== uppercaseDay);
  } else {
    activeDays.value.push(uppercaseDay);
  }
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const props = defineProps<{
  filterOptions?: {
    isCategorizing?: boolean;
    isSorting?: boolean;
    isSelectingDuration?: boolean;
    isSelectingPriceRange?: boolean;
    isSelectingDateRange?: boolean;
    isSelectingLocation?: boolean;
    isSelectingActiveDays?: boolean;
  };
  activeDays?: string[];
}>();

const sliderValue = ref([0, 500]); // Initial values

const days = computed(() => [
  { name: "Sun", active: props.activeDays?.includes("SUN") ?? false },
  { name: "Mon", active: props.activeDays?.includes("MON") ?? false },
  { name: "Tue", active: props.activeDays?.includes("TUE") ?? false },
  { name: "Wed", active: props.activeDays?.includes("WED") ?? false },
  { name: "Thu", active: props.activeDays?.includes("THU") ?? false },
  { name: "Fri", active: props.activeDays?.includes("FRI") ?? false },
  { name: "Sat", active: props.activeDays?.includes("SAT") ?? false },
]);

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  dropdownOpen.value = false; // Close dropdown after selection
};

const applyFilter = () => {
  const params = new URLSearchParams();

  if (props.filterOptions?.isCategorizing && selectedCategory.value) {
    params.append("type", selectedCategory.value);
  }
  if (props.filterOptions?.isSelectingPriceRange) {
    params.append("minPrice", sliderValue.value[0].toString());
  }
  if (props.filterOptions?.isSelectingPriceRange) {
    params.append("maxPrice", sliderValue.value[1].toString());
  }
  if (props.filterOptions?.isSelectingDateRange && startDate.value) {
    params.append("startDate", startDate.value);
  }
  if (props.filterOptions?.isSelectingDateRange && endDate.value) {
    params.append("endDate", endDate.value);
  }
  if (props.filterOptions?.isSelectingActiveDays) {
    if (activeDays.value.length) {
      params.append("repeatedDay", activeDays.value.join(","));
    }
  }
  if (props.filterOptions?.isSelectingLocation && location.value) {
    params.append("location", location.value);
  }

  emit("applyFilter", { url: `${params.toString()}` });
  showConfirmDialog.value = false;
};

const openFilter = () => {
  showConfirmDialog.value = true;
};

const closeFilter = () => {
  showConfirmDialog.value = false;
};
</script>

<template>
  <div class="flex items-center justify-center p-[10px] border border-stroke rounded-[6px]" @click="openFilter">
    <Icon icon="solar:filter-linear" class="w-[16px] h-[16px] text-black" />
  </div>

  <div v-if="showConfirmDialog" class="fixed inset-0 flex items-center justify-center z-[102]">
    <div class="gap-[20px] bg-white p-[25px] rounded-lg shadow-lg w-[346px]">
      <div class="flex justify-between items-center font-medium">
        <span>Sort & Filter</span>
        <p @click="applyFilter">Apply</p>
      </div>

      <hr class="border-t border-gray-300 my-4" />

      <!-- Category -->
      <div v-if="props.filterOptions?.isCategorizing" class="flex relative justify-between mb-2">
        <span class="text-gray-500">Category</span>
        <button @click="toggleDropdown" class="text-gray-500 focus:outline-none">
          &gt;
        </button>

        <!-- Dropdown -->
        <div v-if="dropdownOpen"
          class="absolute z-50 top-8 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-60">
          <ul>
            <li v-for="category in availableCategories" :key="category" @click="selectCategory(category)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
              {{ category }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Category Input -->
      <div v-if="selectedCategory" class="flex gap-2">
        <div class="bg-black text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
          {{ selectedCategory }}
        </div>
      </div>

      <div v-if="props.filterOptions?.isSelectingDateRange" class="mt-4 flex flex-col gap-2">
        <h2 class="text-gray-500">Date Range</h2>
        <div class="flex gap-2">
          <div>
            <label class="block text-sm font-medium">Start Date</label>
            <input v-model="startDate" type="date" class="w-full border rounded-md p-1.5 text-sm text-gray-500" />
          </div>
          <div>
            <label class="block text-sm font-medium">End Date</label>
            <input v-model="endDate" type="date" class="w-full border rounded-md p-1.5 text-sm text-gray-500" />
          </div>
        </div>
      </div>

      <div v-if="props.filterOptions?.isSelectingPriceRange">
        <h2 class="text-gray-500 mt-4">Choose Price</h2>
        <DoubleSlider v-model="sliderValue" :min="0" :max="10000" :minRange="5" class="custom-slider" />
        <p>Selected Range: {{ sliderValue[0] }} - {{ sliderValue[1] }}</p>
      </div>

      <div v-if="props.filterOptions?.isSelectingDuration">
        <h2 class="text-gray-500 mt-4">Select Duration (Minute)</h2>
        <DoubleSlider v-model="sliderValue" :min="0" :max="600" :minRange="5" class="custom-slider" />
        <p>Selected Range: {{ sliderValue[0] }} - {{ sliderValue[1] }}</p>
      </div>

      <!-- Location Filter -->
      <div v-if="props.filterOptions?.isSelectingLocation">
        <h2 class="text-gray-500 mt-4">Location</h2>
        <input v-model="location" type="text" class="w-full border rounded-md p-1.5 text-sm text-gray-500" />
      </div>

      <!-- Selecting Day -->
      <div v-if="props.filterOptions?.isSelectingActiveDays">
        <h2 class="text-gray-500 mt-4">Avaliable Date</h2>
        <div class="flex justify-between mt-1.5">
          <button v-for="(day, index) in days" :key="index"
            class="flex justify-center w-[36px] py-[10px] px-[12px] border rounded-[5px] text-[12px] font-light cursor-pointer"
            :class="{
              'border-primary text-primary': activeDays.includes(
                day.name.toUpperCase()
              ),
              'border-stroke text-placeHolder': !activeDays.includes(
                day.name.toUpperCase()
              ),
            }" @click="toggleDay(day.name)">
            {{ day.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
