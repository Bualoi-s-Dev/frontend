<script setup lang="ts">
import { ref } from "vue";

const updating = ref(false);
const packages = ref("");
const subPackages = ref("");
const errors = ref<Record<string, string>>({});

</script>

<template>
    <div class="mt-6 flex flex-col mx-7">
        <div class="flex flex-row items-center my-2 gap-3">
            <BackButton />
            <h1 class="text-xl">New Appointment</h1>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-1">
                <label class="text-[16px]"
                    >Package<span class="text-primary">*</span></label
                >
                <select
                    :disabled="updating"
                    class="border w-full disabled:opacity-50 rounded-md py-2 px-2 text-[14px] border-stroke"
                    v-model="packages"
                    :class="{ 'border-red-500': errors.packages }"
                >
                    <option disabled value="">Select on package</option>
                    <option>Package A</option>
                    <option>Package B</option>
                    <option>Package C</option>
                </select>
                <p v-if="errors.packages" class="text-red-500 text-xs">
                    {{ errors.packages }}
                </p>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[16px]"
                    >Sub Package<span class="text-primary">*</span></label
                >
                <select
                    :disabled="updating"
                    class="border w-full disabled:opacity-50 rounded-md py-2 px-2 text-[14px] border-stroke"
                    v-model="subPackages"
                    :class="{ 'border-red-500': errors.subPackages }"
                >
                    <option disabled value="">Select on package</option>
                    <option>Sub Package A</option>
                    <option>Sub Package B</option>
                    <option>Sub Package C</option>
                </select>
                <p v-if="errors.subPackages" class="text-red-500 text-xs">
                    {{ errors.subPackages }}
                </p>
            </div>
            <div class="flex flex-row gap-5">
                <div class="flex flex-col gap-1">
                    <label class="text-[16px]"
                        >Start Time<span class="text-primary">*</span></label
                    >
                    <!-- TODO -->
                    <input
                        type="time"
                        id="start-time"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div class="flex flex-col gap-1">
                    <label class="text-[16px]"
                        >End Time<span class="text-primary">*</span></label
                    >
                    <!-- TODO -->
                    <input
                        type="time"
                        id="start-time"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[16px]"
                    >Location<span class="text-primary">*</span></label
                >
                <input
                    type="text"
                    id="location"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button class="mt-auto ml-auto text-lg px-6 py-2 rounded-lg bg-black text-white disabled:opacity-50">
                Submit
            </button>
        </div>
    </div>
</template>