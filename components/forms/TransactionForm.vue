<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import type { AppointmentDetail, AppointmentStatus, PackageResponse } from "~/types/api";

const router = useRouter();
const api = useApiStore();
const config = useRuntimeConfig();

const updating = ref(false);
const errors = ref<Record<string, string>>({});
const paymentMethod = ref("A payment method");
const temp = ref(""); // TODO: replace with another method
const popUp = ref(2);

const prop = defineProps<{
    // packageName: string;
    // subpackageName: string;
    // date: string;
    // startTime: string;
    // endTime: string;
    // subpackageId: string;
    appointmentData: AppointmentDetail;
    index: number;
    manageStatus: (index: number, status: AppointmentStatus) => void;
}>();

const formattedTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit"});
}

// TODO: try catch
const onSubmit = async () => {
    // TODO: go to transaction page
}

const resetPop = () => {
    if(popUp.value == 1) {
        popUp.value = 0;
        router.push({ path: "/payment/transaction" });
    }
}

const okPop = () => {
    if(popUp.value == 2) {
        popUp.value = 0;
        router.push({ path: "/payment/topay" });
    }
}

</script>

<template>
    <div v-if="popUp != 0" @click="resetPop" onc class="bg-black absolute top-0 left-0 w-screen h-screen" :class="popUp != 0 ? 'opacity-50' : 'opacity-0'"></div>
    <div v-if="popUp == 1" @click="resetPop">
        <div class="fixed inset-0 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <div class="flex flex-col items-center justify-center">
                    <Icon icon="line-md:circle-twotone-to-confirm-circle-transition" style="color: rgb(230, 130, 130); width: 120; height: inherit;" />
                    <label class="text-red-400 text-xl">Payment Successful</label>
                    <p class="text-sm/6 text-center pl-4 pr-4">Congratulations! Your transaction has been completed.</p>
                </div>
            </div>
        </div>
    </div>
    <div v-if="popUp == 2" @click="resetPop">
        <div class="fixed inset-0 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <div class="flex flex-col items-center justify-center gap-5">
                    <label class="text-gray-900 text-xl">You do not have enough funds. Please top up your balance.</label>
                    <button :disabled="updating" @click="okPop"
                        class="text-l px-10 py-2 rounded-lg bg-black text-white">
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-6 flex flex-col mx-7">
        <div class="flex flex-row items-center my-2 gap-3">
            <BackButton />
            <h1 class="text-xl">Order Overview</h1>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-row gap-5">
                <div class="flex flex-col gap-1">
                    <label class="text-[16px]">From</label>
                    <!-- TODO -->
                    <input disabled type="text" :value="formattedTime(appointmentData?.startTime)"
                        class="block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        readonly />
                </div>
                <div class="flex flex-col gap-1">
                    <label class="text-[16px]">To</label>
                    <!-- TODO -->
                    <input disabled type="text" :value="formattedTime(appointmentData?.endTime)"
                        class="block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        readonly />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[16px]">Price</label>
                <input disabled type="number" :value="appointmentData?.price"
                    class="block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[16px]">Payment</label>
                <!-- TODO: fix this v-model shit -->
                <!-- <select :disabled="updating" -->
                <select disabled
                    class="border w-full text-gray-600 rounded-md py-2 px-2 text-[14px] border-stroke"
                    v-model="temp">

                    <option disabled value="">{{ paymentMethod }}</option>
                    <!-- <option v-for="packageData in packages" :value="packageData" :key="packageData.id">{{ packageData.title }}</option> -->
                </select>
            </div>
            <button :disabled="updating" @click="onSubmit"
                class="mt-auto ml-auto text-l px-6 py-2 rounded-lg bg-black text-white">
                Continue
            </button>
            <!-- TODO -->
        </div>
    </div>
</template>