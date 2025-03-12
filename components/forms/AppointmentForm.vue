<script setup lang="ts">
import { ref } from "vue";
import type { AppointmentRequest, PackageResponse } from "~/types/api";

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

const updating = ref(true);
const packages = ref<PackageResponse[] | undefined>();
const packageInfo = ref<PackageResponse | undefined>();
const errors = ref<Record<string, string>>({});
const location = ref("");
const duration = ref(0);
const shitt = ref(""); // TODO: delete this

const prop = defineProps<{
        packageName: string;
        subpackageName: string;
        date: string;
        startTime: string;
        endTime: string;
        subpackageId: string;
    }>();

// watchEffect(() => console.log(prop))
// console.log(prop)

// const adjustTime = (currentTime: string, sign: number) => {
//   if (!currentTime) return "";

//   let [hours, mins] = currentTime.split(":").map(Number);
//   let newDate = new Date();
//   newDate.setHours(hours, mins);
//   newDate.setMinutes(newDate.getMinutes() + sign * duration.value);

//   return newDate.toTimeString().slice(0, 5);
// };

// watch(startTime, (newStart) => {
//   if (newStart) endTime.value = adjustTime(newStart, 1);
// });

// watch(endTime, (newEnd) => {
//   if (newEnd) startTime.value = adjustTime(newEnd, -1);
// });

onMounted(() => {
    console.log({"HEYYYYYYYYYYYYYYYY": prop})
});

const parseTime = (time: string) => {
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

    return { hours, minutes };
}

const parseDate = (time: string) => {
    const [year, month, day] = time.split("-");

    const years = parseInt(year);
    const months = parseInt(month);
    const days = parseInt(day);

    return { years, months, days };
}

// TODO: try catch
const onSubmit = async () => {
    try {
        const { hours, minutes } = parseTime(prop.startTime)
        const { years, months, days } = parseDate(prop.date)
        const start_time_date = new Date(Date.UTC(years, months - 1, days, hours, minutes))
        const time_parse = start_time_date.toISOString()
        const payload: AppointmentRequest = {
            start_time: time_parse,
            location: location.value
        };
        console.log(payload);
        const subid = prop.subpackageId;
        console.log(prop.subpackageId);
        await api.createAppointment(subid, payload);
        await router.push({ path: "/" });
    } catch (error: any) {
        console.error("Error submiting appointment:", error);
        useToastify(error.message, { type: "error" });
    } finally {
        updating.value = false;
    }
}

// watch(subpackageId, async (newSubPackageId) => {
//     const response = await api.fetchSubpackage(newSubPackageId);
//     duration.value = response.duration;
// });

</script>

<template>
    <div class="mt-6 flex flex-col mx-7">
        <div class="flex flex-row items-center my-2 gap-3">
            <BackButton />
            <h1 class="text-xl">New Appointment</h1>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-1">
                <label class="text-[16px]">Package</label>
                <!-- TODO: fix this v-model shit -->
                <select :disabled="updating"
                    class="border w-full disabled:opacity-50 rounded-md py-2 px-2 text-[14px] border-stroke"
                    v-model="shitt" :class="{ 'border-red-500': errors.packages }">

                    <option disabled value="">{{ prop.packageName }}</option>
                    <!-- <option v-for="packageData in packages" :value="packageData" :key="packageData.id">{{ packageData.title }}</option> -->
                </select>
                <p v-if="errors.packages" class="text-red-500 text-xs">
                    {{ errors.packages }}
                </p>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[16px]">Sub Package</label>
                <select :disabled="updating"
                    class="border w-full disabled:opacity-50 rounded-md py-2 px-2 text-[14px] border-stroke"
                    v-model="shitt" :class="{ 'border-red-500': errors.subpackageId }">
                    <option disabled value="">{{ prop.subpackageName }}</option>
                    <!-- <option v-for="subpackageData in packageInfo?.subPackages" :value="subpackageData.id"
                        :key="subpackageData.id">{{ subpackageData.title }}</option> -->
                </select>
                <p v-if="errors.subpackageId" class="text-red-500 text-xs">
                    {{ errors.subpackageId }}
                </p>
                <label class="text-[16px]">Date</label>
                <!-- TODO -->
                <input type="text" :value="date"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    readonly />
            </div>
            <div class="flex flex-row gap-5">
                <div class="flex flex-col gap-1">
                    <label class="text-[16px]">Start Time</label>
                    <!-- TODO -->
                    <input type="text" :value="startTime"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        readonly />
                </div>
                <div class="flex flex-col gap-1">
                    <label class="text-[16px]">End Time</label>
                    <!-- TODO -->
                    <input type="text" :value="endTime"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        readonly />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[16px]">Location<span class="text-primary">*</span></label>
                <input type="text" id="location" v-model="location"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <button @click="onSubmit"
                class="mt-auto ml-auto text-lg px-6 py-2 rounded-lg bg-black text-white disabled:opacity-50">
                Confirm
            </button>
            <!-- TODO -->
        </div>
    </div>
</template>