<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    {{ title }}
  </div>
  <div class="w-full h-full p-6 flex flex-col">
    <div class="flex gap-[16px] items-center">
      <img class="h-[50px] w-[50px] object-cover rounded-full cursor-pointer" :src="profileUrl" alt="Profile Image"
        @click="router.push(`/profile/${ownerId}`)" />
      <p class="text-xl">{{ name }}</p>
    </div>
    <img class="h-[253px] w-full object-cover rounded-[20px] mt-6" :src="imageUrl" />
    <div class="p-4">
      <h2 class="text-lg mb-2">Time Schedule</h2>
      <h2 class="text-lg mb-2">Date</h2>
      <div class="mb-4"> 
        <VueDatePicker v-model="selectedDate" :enable-time-picker="false" :clearable="false" :min-date="new Date().toISOString().split('T')[0]" :max-date="subpackageDetails?.availableEndDay" :disabled-week-days="disabledWeekDays" />
      </div>
      <TimeSchedule v-model:input-date="selectedDate" :show-date="true" :active-days="subpackageDetails?.repeatedDay" />
      <p class="flex justify-center mt-5 text-xl">
        {{ formatDate(selectedDate) }}
      </p>
      <div>
        <ul v-if="includedDate" class="flex flex-col gap-5 my-5">
          <li v-for="(interval, index) in intersectedIntervals" :key="index">
            <button @click="() => handleClick(index)" :class="[
              'rounded-2xl drop-shadow-xl p-7 text-white w-full',
              interval.isIntersected
                ? 'bg-red-schedule'
                : 'bg-green-schedule',
            ]">
              {{ interval.start }} - {{ interval.end }}
            </button>
          </li>
        </ul>
        <div v-else class="font-bold text-xl w-full text-center mt-6">
          The selected date is not in subpackage.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, computed } from "vue";
import type { DayName, SubpackageResponse } from "~/types/api";

const route = useRoute();
const router = useRouter();
const api = useApiStore();

const id = route.params.id as string;
const subpackageid = route.params.subpackageid as string;

const config = useRuntimeConfig();

const imageUrl = ref("");
const title = ref("");

const name = ref("");
const profileUrl = ref("");
const ownerId = ref("");

interface Event {
  title: string;
  start: string;
  end: string;
}
const selectedDate = ref<string>(new Date().toISOString().split("T")[0]);
const subpackageDetails = ref<SubpackageResponse | undefined>();

const disabledWeekDays = computed(() => {
  if (!subpackageDetails.value) return [];

  const repeatedDays = subpackageDetails.value.repeatedDay.map((x) => dayNameToDayIndex(x as DayName));
  // Return array of days (0-6) that are not in repeatedDays
  return [0, 1, 2, 3, 4, 5, 6].filter(day => !repeatedDays.includes(day));
});


const includedDate = computed(() =>
  subpackageDetails.value?.repeatedDay
    .map((x) => dayNameToDayIndex(x as DayName))
    .includes(new Date(selectedDate.value).getDay())
);

const handleClick = (idx: number) => {
  if (intersectedIntervals.value[idx].isIntersected) return;
  const params = new URLSearchParams({
    date: selectedDate.value,
    start: intersectedIntervals.value[idx].start,
    end: intersectedIntervals.value[idx].end,
  });
  router.push(
    `/package/${id}/subpackage/appointment/create/${subpackageid}?${params.toString()}`
  );
};

const fetchUserProfileById = async (id: string) => {
  try {
    const response = await api.fetchUserProfileById(id);

    name.value = response.name;
    profileUrl.value = config.public.s3URL + response.profile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }
};

onMounted(async () => {
  const [response1, response2] = await Promise.all([
    api.fetchPackage(id),
    api.fetchSubpackage(subpackageid),
  ]);
  console.log(response1, response2);
  if (response1.photoUrls && response1.photoUrls.length > 0) {
    const imgUrl = config.public.s3URL + response1.photoUrls[0];
    response1.photoUrls[0] = imgUrl;

    imageUrl.value = response1.photoUrls[0];
  }
  title.value = response1.title;
  ownerId.value = response1.ownerId;
  subpackageDetails.value = response2;

  await fetchUserProfileById(response1.ownerId);
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
    subpackageDetails.value.availableStartTime,
    subpackageDetails.value.availableEndTime,
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
    const intersectingEvent = events.value.find((event) =>
      timesIntersect(interval.start, interval.end, event.start, event.end)
    );

    return { ...interval, isIntersected: !!intersectingEvent };
  });
});

const events = computed<Event[]>(() => {
  if (!subpackageDetails.value) return [];

  const result = subpackageDetails.value.busyTimes
    .map(b => ({
      // Subtract 7 hours to covert GMT+7
      ...b,
      startTime: new Date(new Date(b.startTime).getTime() - 7 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(new Date(b.endTime).getTime() - 7 * 60 * 60 * 1000).toISOString()
    }))
    .filter(b => b.startTime.split("T")[0] <= selectedDate.value && selectedDate.value <= b.endTime.split("T")[0])
    .map(b => ({
      start: formatTime(new Date(b.startTime)),
      end: formatTime(new Date(b.endTime)),
      title: "Busy",
    }));

  // Mark past time if user currently select current date
  if (new Date().toISOString().split("T")[0] === selectedDate.value) {
    result.push({
      start: "00:00",
      end: formatTime(new Date()),
      title: "Past Time",
    })
  }
  console.log('events', result)
  return result;
});
</script>
