<script setup lang="ts">
import { ref, computed } from "vue";

const title = ref("");
const description = ref("");
const price = ref("");
const startTime = ref("");
const endTime = ref("");
const startDate = ref("");
const endDate = ref("");
const activeDays = ref<string[]>([]);
const repeatForever = ref(false);
const errors = ref<{ [key: string]: string }>({});

const days = computed(() =>
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => ({
    name: day,
    active: activeDays.value.includes(day),
  }))
);

const toggleDay = (day: string) => {
  if (activeDays.value.includes(day)) {
    activeDays.value = activeDays.value.filter((d) => d !== day);
  } else {
    activeDays.value.push(day);
  }
};

const validate = () => {
  errors.value = {};

  if (!title.value) errors.value.title = "Title is required.";
  if (!description.value) errors.value.description = "Description is required.";
  if (!price.value || isNaN(Number(price.value)) || Number(price.value) <= 0)
    errors.value.price = "Price must be a valid positive number.";
  if (!startTime.value) errors.value.startTime = "Start time is required.";
  if (!endTime.value) errors.value.endTime = "End time is required.";
  if (startTime.value && endTime.value && startTime.value >= endTime.value)
    errors.value.time = "Start time must be before end time.";
  if (activeDays.value.length === 0)
    errors.value.activeDays = "Please select at least one day.";

  if (!repeatForever.value) {
    if (!startDate.value) errors.value.startDate = "Start date is required.";
    if (!endDate.value) errors.value.endDate = "End date is required.";
    if (startDate.value && endDate.value && startDate.value > endDate.value)
      errors.value.date = "Start date must be before end date.";
  }

  return Object.keys(errors.value).length === 0;
};

const updating = ref(false);

const handleSubmit = () => {
  if (!validate()) return;

  console.log({
    title: title.value,
    description: description.value,
    price: price.value,
    startTime: startTime.value,
    endTime: endTime.value,
    startDate: repeatForever.value ? null : startDate.value,
    endDate: repeatForever.value ? null : endDate.value,
    activeDays: activeDays.value,
    repeatForever: repeatForever.value,
  });
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Create Subpackage
  </div>
  <div class="w-full h-full p-6 flex flex-col">
    <div class="flex flex-row text-lg mt-6">
      Title<span class="text-primary">*</span>
    </div>
    <input
      v-model="title"
      type="text"
      class="border disabled:opacity-50 w-full rounded-md py-1 pl-2 text-lg mt-1.5"
      :class="{
        'border-red-500': errors.title,
        'border-stroke': !errors.title,
      }"
    />
    <div v-if="errors.title" class="text-red-500 text-sm mt-1">
      {{ errors.title }}
    </div>

    <div class="flex flex-row text-lg mt-6">
      Description<span class="text-primary">*</span>
    </div>
    <input
      v-model="description"
      type="text"
      class="border disabled:opacity-50 w-full rounded-md py-1 pl-2 text-lg mt-1.5"
      :class="{
        'border-red-500': errors.description,
        'border-stroke': !errors.description,
      }"
    />
    <div v-if="errors.description" class="text-red-500 text-sm mt-1">
      {{ errors.description }}
    </div>

    <div class="flex flex-row text-lg mt-6">
      Price<span class="text-primary">*</span>
    </div>
    <input
      v-model="price"
      type="text"
      class="border disabled:opacity-50 w-full rounded-md py-1 pl-2 text-lg mt-1.5"
      :class="{
        'border-red-500': errors.price,
        'border-stroke': !errors.price,
      }"
    />
    <div v-if="errors.price" class="text-red-500 text-sm mt-1">
      {{ errors.price }}
    </div>

    <hr class="h-[1px] w-full border-body mt-6" />

    <div class="flex flex-row text-lg mt-6">
      Select Day<span class="text-primary">*</span>
    </div>
    <div class="flex justify-between mt-1.5">
      <p
        v-for="(day, index) in days"
        :key="index"
        class="flex justify-center w-[36px] py-[10px] px-[12px] border rounded-[5px] text-[12px] font-light cursor-pointer"
        :class="{
          'border-primary text-primary': day.active,
          'border-stroke text-placeHolder': !day.active,
        }"
        @click="toggleDay(day.name)"
      >
        {{ day.name }}
      </p>
    </div>
    <div v-if="errors.startTime" class="text-red-500 text-sm mt-1">
      {{ errors.activeDays }}
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
    <div class="flex items-center mt-6 gap-[10px] px-[5px]">
      <input
        id="repeat-checkbox"
        type="checkbox"
        v-model="repeatForever"
        class="w-[20px] h-[20px] rounded-[6px]"
      />
      <p class="text-[16px] font-light text-body">Repeat Forever</p>
    </div>

    <div v-if="!repeatForever">
      <div class="flex flex-row text-lg mt-6">
        Start Date<span class="text-primary">*</span>
      </div>
      <input
        v-model="startDate"
        type="date"
        class="border disabled:opacity-50 w-full rounded-md py-1 px-2 text-lg mt-1.5"
        :class="{
          'border-red-500': errors.startDate || errors.date,
          'border-stroke': !(errors.startDate || errors.date),
        }"
      />
      <div v-if="errors.startDate" class="text-red-500 text-sm mt-1">
        {{ errors.startDate }}
      </div>

      <div class="flex flex-row text-lg mt-6">
        End Date<span class="text-primary">*</span>
      </div>
      <input
        v-model="endDate"
        type="date"
        class="border disabled:opacity-50 w-full rounded-md py-1 px-2 text-lg mt-1.5"
        :class="{
          'border-red-500': errors.endDate || errors.date,
          'border-stroke': !(errors.endDate || errors.date),
        }"
      />
      <div v-if="errors.endDate" class="text-red-500 text-sm mt-1">
        {{ errors.endDate }}
      </div>
    </div>
    <div v-if="errors.date" class="text-red-500 text-sm mt-1">
      {{ errors.date }}
    </div>
    <button
      :disabled="updating"
      @click="handleSubmit"
      class="mt-6 ml-auto text-lg px-6 py-2 rounded-lg bg-black text-white disabled:opacity-50"
    >
      Submit
    </button>
  </div>
</template>
