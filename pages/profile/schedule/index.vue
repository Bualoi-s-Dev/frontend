<template>
  <div class="mx-6 mt-6 text-xl">
    <div class="flex flex-row gap-4 mb-3">
      <BackButton />
      <p>Manage Busy Time</p>
    </div>
  </div>

  <div class="py-3 px-5 flex flex-row items-center justify-between gap-5">
    <input
      :min="new Date().toISOString().split('T')[0]"
      type="date"
      v-model="selectedDate"
      class="p-2 border rounded-lg shadow-sm w-full"
    />
    <button
      class="flex justify-center items-center gap-[8px] text-[14px] p-[9px] pr-[13px] rounded-[6px] bg-black text-white"
      @click="goToCreateBusyTime"
    >
      <Icon icon="ic:baseline-plus" class="w-[16px] h-[16px]" />
      New
    </button>
  </div>

  <div class="p-4">
    <TimeSchedule :input-date="selectedDate" :show-date="true" />
    <p class="flex justify-center mt-5 text-xl">
      {{ formatDate(selectedDate) }}
    </p>

    <div>
      <ul class="flex flex-col gap-5 my-5">
        <li v-for="(interval, index) in updatedPackageData" :key="interval.id">
          <!-- Use the IntervalCard component -->
          <ScheduleCard :interval="interval" @delete="deleteItem" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import type { BusyTime } from "~/types/api";

const router = useRouter();
const route = useRoute();
const api = useApiStore();

const selectedDate = ref<string>(new Date().toISOString().split("T")[0]);
const currentPackageToDeleteID = ref<String>("");
const name = ref("");
const packageData = ref<BusyTime[]>([]);
const filteredPackageData = computed(() => {
  return packageData.value.filter((item) => {
    const itemDate = new Date(item.startTime).toISOString().split("T")[0]; // Extract YYYY-MM-DD
    console.log(itemDate, selectedDate.value);
    return itemDate === selectedDate.value;
  });
});

const deleteItem = async (busytimeId: string) => {
  try {
    console.log("Deleting busy time:", busytimeId);
    await api.deleteBusyTime(busytimeId); // Deleting the item via API
    // Filter out the item from packageData after deletion
    packageData.value = packageData.value.filter(
      (item) => item.id !== busytimeId
    );
  } catch (error) {
    console.error("Failed to delete busytime:", error);
  }
};

const goToCreateBusyTime = () => {
  router.push(`/profile/createBusyTime`);
};
//todo ; fix the code bro
onMounted(async () => {
  try {
    const profile = await api.fetchUserProfile();
    console.log(profile);

    // Fetch busy time data and remove invalid entries
    const response = (await api.fetchBusyTime(profile.id)).filter(item => item.isValid);

    // Combine both data arrays
    packageData.value = response;
    console.log(packageData.value);
  } catch (error) {
    console.error("Failed to fetch busy time data:", error);
  }
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatWithAMPM = (date: Date): string => {
  let hours = date.getUTCHours(); // Use UTC time to avoid local timezone conversion
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

const updatedPackageData = computed(() =>
  filteredPackageData.value.map((item: BusyTime) => {
    const startDate = new Date(item.startTime);
    const endDate = new Date(item.endTime);

    return {
      ...item,
      startDate: startDate.toISOString().split("T")[0], // Keep the date in YYYY-MM-DD format
      startTime: formatWithAMPM(startDate), // Format time in 12-hour format with AM/PM
      endDate: endDate.toISOString().split("T")[0], // Keep the date in YYYY-MM-DD format
      endTime: formatWithAMPM(endDate), // Format time in 12-hour format with AM/PM
    };
  })
);
</script>
