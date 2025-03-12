<template>
    <div class="mx-6 mt-6 text-xl">
        <div class="flex flex-row gap-4 mb-3">
          <BackButton />
          <p>Pre-wedding ( Full Morning )</p>
        </div>
        <img class="w-full rounded-2xl" :src="workImage"/>
    </div>
    <div class="p-4">
      <h2 class="text-lg mb-2">Time Schedule</h2>
      <h2 class="text-lg mb-2">Date</h2>
      <div class="mb-4">
        <input type="date" v-model="selectedDate" class="p-2 border rounded-lg shadow-sm w-full
        ">
      </div>
      <div class="border rounded-lg shadow-md p-4 bg-white">
        <TimeSchedule :input-date="selectedDate" :show-date="true"/>
        <div class="grid grid-cols-1 divide-y">
          <div v-for="hour in hours" :key="hour" class="relative flex items-center py-2">
            <span class="w-16 text-sm font-medium text-gray-500">{{ hour }}</span>
            <div class="flex-1 border-l border-gray-300 pl-4 relative">
              <div v-for="event in filteredEvents.filter(e => e.start === hour)" :key="event.id" 
                   class="absolute w-full border-l-4 p-2 rounded-md shadow-md"
                   :class="event.color">
                <p class="text-sm font-semibold">{{ event.title }}</p>
                <p class="text-xs">{{ event.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import workImage from "@/assets/workImage.png";

  interface Event {
    id: number;
    title: string;
    start: string;
    time: string;
    date: string;
    color: string;
  }

  const selectedDate = ref<string>(new Date().toISOString().split("T")[0]);

  const hours: string[] = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
  ];

  const events = ref<Event[]>([
    { id: 1, title: "Zürich design days", start: "9:00 AM", time: "9:00 AM - 10:00 AM", date: "2025-02-17", color: "border-green-500 bg-green-100" },
    { id: 2, title: "Prepare workshop", start: "11:00 AM", time: "11:00 AM - 12:00 PM", date: "2025-02-18", color: "border-blue-500 bg-blue-100" },
    { id: 3, title: "Marketing workshop", start: "12:00 PM", time: "12:00 PM - 1:00 PM", date: "2025-02-17", color: "border-indigo-500 bg-indigo-100" },
    { id: 4, title: "Update slide deck", start: "2:00 PM", time: "2:00 PM - 3:00 PM", date: "2025-02-19", color: "border-purple-500 bg-purple-100" },
    { id: 5, title: "Concert with Helen Plaza", start: "6:00 PM", time: "6:00 PM - 8:00 PM", date: "2025-02-17", color: "border-yellow-500 bg-yellow-100" }
  ]);

  const filteredEvents = computed<Event[]>(() => {
    return events.value.filter(event => event.date === selectedDate.value);
  });
  </script>
