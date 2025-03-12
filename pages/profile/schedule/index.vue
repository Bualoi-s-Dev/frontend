<template>
    <div class="mx-6 mt-6 text-xl">
      <div class="flex flex-row gap-4 mb-3">
        <BackButton />
        <p>Manage Busy Time</p>
      </div>
    </div>
  
    <div class="py-3 px-5 flex flex-row items-center">
      <input
        v-model="name"
        type="text"
        class="mr-2 border border-stroke w-full rounded-md text-lg"
      />
      <Button
        icon-color="gray"
        bg-color="bg-white"
        middle-icon="basil:filter-outline"
        button-options="border border-stroke rounded-md"
      />
    </div>
  
    <div class="p-4">
      <TimeSchedule :input-date="selectedDate" :show-date="true" />
      <p class="flex justify-center mt-5 text-xl">
        {{ formatDate(selectedDate) }}
      </p>
  
      <div>
        <ul class="flex flex-col gap-5 my-5">
          <li v-for="(interval, index) in updatedPackageData" :key="interval.id">
            <div
              :class="[
                'flex flex-col gap-2 rounded-xl drop-shadow-xl p-3 text-white relative',
                interval.type === 'Photographer' ? 'bg-red-schedule' : 'bg-scarlet-schedule',
              ]"
            >
              <p v-if="interval.type === 'Photographer'">My appointment</p>
              <p v-else>My busy time</p>
              {{ interval.startTime }} - {{ interval.endTime }}
  
              <!-- Delete Button -->
              <button
                class="absolute top-2 right-2 bg-white text-red-500 px-2 py-1 rounded-md text-sm"
                @click="deletePackage(interval.id)"
              >
                ✖
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  
  const selectedDate = ref<string>(new Date().toISOString().split("T")[0]);
  
  const packageData = ref([
    {
      endTime: "2025-02-23T12:00:00Z",
      id: "12345678abcd1",
      isValid: true,
      photographerId: "12345678abcd",
      startTime: "2025-02-23T10:00:00Z",
      type: "Photographer",
    },
    {
      endTime: "2025-02-23T14:00:00Z",
      id: "12345678abcd2",
      isValid: true,
      photographerId: "12345678abcd",
      startTime: "2025-02-23T13:00:00Z",
      type: "Appointment",
    },
  ]);
  
  // Format Date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  
  // Format Time with AM/PM
  const formatWithAMPM = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };
  
  // Process and format package data
  const updatedPackageData = computed(() =>
    packageData.value.map(item => {
      const startDate = new Date(item.startTime);
      const endDate = new Date(item.endTime);
  
      return {
        ...item,
        startDate: startDate.toISOString().split("T")[0],
        startTime: formatWithAMPM(startDate),
        endDate: endDate.toISOString().split("T")[0],
        endTime: formatWithAMPM(endDate),
      };
    })
  );
  
  // Delete Function
  const deletePackage = (id: string) => {
    packageData.value = packageData.value.filter(item => item.id !== id);
  };
  </script>
  