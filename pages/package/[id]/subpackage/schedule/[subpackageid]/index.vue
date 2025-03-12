<template>
  <div class="mx-6 mt-6 text-xl">
    <div class="flex flex-row gap-4 mb-3">
      <BackButton />
      <p>{{ title }}</p>
    </div>
    <img class="w-full rounded-2xl" :src="imageUrl" />
  </div>
  <div class="p-4">
    <h2 class="text-lg mb-2">Time Schedule</h2>
    <h2 class="text-lg mb-2">Date</h2>
    <div class="mb-4">
      <input :min="new Date().toISOString().split('T')[0]" type="date" v-model="selectedDate" class="p-2 border rounded-lg shadow-sm w-full" />
    </div>
    <TimeSchedule :input-date="selectedDate" :show-date="true" />
    <p class="flex justify-center mt-5 text-xl">
      {{ formatDate(selectedDate) }}
    </p>
    <div>
      <ul v-if="includedDate" class="flex flex-col gap-5 my-5">
        <li v-for="(interval, index) in intersectedIntervals" :key="index">
          <div :class="[
            'rounded-2xl drop-shadow-xl p-7 text-white',
            interval.isIntersected ? 'bg-red-schedule' : 'bg-green-schedule',
          ]">
            {{ interval.start }} - {{ interval.end }}
          </div>
        </li>
      </ul>

      <div class="font-bold text-xl w-full text-center mt-6">The selected date is not in subpackage.</div> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type {  DayName, SubpackageResponse } from "~/types/api";

const route = useRoute();
const api = useApiStore();

const id = route.params.id as string;
const subpackageid = route.params.subpackageid as string;

const config = useRuntimeConfig();

const imageUrl = ref("");
const title = ref("");

interface Event {
  title: string;
  start: string;
  end: string;
}
const selectedDate = ref<string>(new Date().toISOString().split("T")[0]);
const subpackageDetails = ref<SubpackageResponse | undefined>();

const includedDate = computed(() => subpackageDetails.value?.repeatedDay.map(x => dayNameToDayIndex(x as DayName)).includes(new Date(selectedDate.value).getDay()));

onMounted(async () => {
  const [response1, response2] = await Promise.all([api.fetchPackage(id), api.fetchSubpackage(subpackageid)]);

  if (response1.photoUrls && response1.photoUrls.length > 0) {
    const imgUrl = config.public.s3URL + response1.photoUrls[0];
    // const imgBlob = await fetch(imgUrl).then((res) => res.blob());
    // response1.photoUrls[0] = await readFileAsDataURL(imgBlob);
    response1.photoUrls[0] = imgUrl;

    imageUrl.value = response1.photoUrls[0];
  }
  title.value = response1.title;

  subpackageDetails.value = response2;
});

const formatDate = (dateString: string, separator = " "): string => {
  const date = new Date(dateString); // Convert the string to a Date object

  const day = date.getDate(); // Get the day (1-31)
  const month = date.toLocaleString("default", { month: "long" }); // Get the month in full name (January, February, etc.)
  const year = date.getFullYear(); // Get the year (e.g., 2025)

  return `${day}${separator}${month}${separator}${year}`;
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Function to get all time intervals based on duration
const getTimeIntervals = (
  startTime: string,
  endTime: string,
  duration: number
) => {
  const intervals = [];

  // Convert start and end times to Date objects
  const start = new Date(`2021-01-01T${startTime}:00`);
  const end = new Date(`2021-01-01T${endTime}:00`);

  while (start < end) {
    const intervalEnd = new Date(start.getTime() + duration * 60000); // Add duration in milliseconds

    // Push the start-end interval
    intervals.push({ start: formatTime(start), end: formatTime(intervalEnd) });

    // Move to next start time by adding the duration
    start.setTime(start.getTime() + duration * 60000);
  }

  return intervals;
};

const intervals = computed(() => {
  if (!subpackageDetails.value) return [];
  return getTimeIntervals(
    subpackageDetails.value.avaliableStartTime,
    subpackageDetails.value.avaliableEndTime,
    subpackageDetails.value.duration
  );
});

const parseTime = (time: string): Date => {
  const [hour, minuteAndAmPm] = time.split(":");
  const [minute, amPm] = minuteAndAmPm.split(" ");

  let hours = parseInt(hour);
  const minutes = parseInt(minute);

  // Adjust hour for AM/PM
  if (amPm === "PM" && hours < 12) {
    hours += 12; // Convert PM hours to 24-hour format
  } else if (amPm === "AM" && hours === 12) {
    hours = 0; // Convert 12 AM to 0 hour
  }

  // Construct a new Date object in UTC to avoid issues with time zones
  const date = new Date(Date.UTC(2021, 0, 1, hours, minutes)); // Use a fixed date like 2021-01-01
  return date;
};

const timesIntersect = (
  intervalStart: string,
  intervalEnd: string,
  eventStart: string,
  eventEnd: string
): boolean => {
  const intervalStartTime = parseTime(intervalStart);
  const intervalEndTime = parseTime(intervalEnd);
  const eventStartTime = parseTime(eventStart);
  const eventEndTime = parseTime(eventEnd);

  // Check if the event's time overlaps with the interval's time
  return (
    (eventStartTime >= intervalStartTime && eventStartTime < intervalEndTime) || // Event starts within the interval
    (eventEndTime > intervalStartTime && eventEndTime <= intervalEndTime) || // Event ends within the interval
    (eventStartTime <= intervalStartTime && eventEndTime >= intervalEndTime) // Event fully encompasses the interval
  );
};

// Compute intersected intervals
const intersectedIntervals = computed(() => {
  if (!intervals.value) return []; // Ensure intervals are available before processing

  return intervals.value.map((interval) => {
    // Find if any event intersects with the current interval
    const intersectingEvent = events.value.find(
      (event) =>
        timesIntersect(
          interval.start,
          interval.end,
          event.start,
          event.end
        )
    );

    return { ...interval, isIntersected: !!intersectingEvent };
  });
});

const events = computed<Event[]>(() => {
  if (!subpackageDetails.value?.busyTimeMap[selectedDate.value]) return [];

  return subpackageDetails.value.busyTimeMap[selectedDate.value].map(m => ({
    start: formatTime(new Date(m.startTime)),
    end: formatTime(new Date(m.endTime)),
    title: "Busy"
  }));
});
</script>
