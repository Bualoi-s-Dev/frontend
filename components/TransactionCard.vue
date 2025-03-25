<script setup lang="ts">
import { AppointmentStatus, type AppointmentDetail, type AppointmentUpdateStatusRequest } from '~/types/api';

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

const prop = withDefaults(
  defineProps<{
    appointmentData: AppointmentDetail;
    index: number;
    manageStatus: (index: number, status: AppointmentStatus) => void;
  }>(),
  {

  }
);

const formattedDate = (time: string) => {
      const date = new Date(time);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const formattedTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit"});
}

const onPay = async () => {
    // TODO
    router.push({ path: "/payment/order/1" });
}

</script>

<template>
    <div class="bg-neutral-100 w-full shadow-md rounded-lg mx-5 my-3 p-3">
        <div class="flex flex-col gap-1">
            <h2 class="text-lg font-semibold text-gray-900">{{ appointmentData?.packageName }}</h2>
            <p class="text-gray-600 mt-1">Date : <span class="font-medium">{{ formattedDate(appointmentData?.startTime) }}</span></p>
            <p class="text-gray-600 mt-1">Time : <span class="font-medium">{{ formattedTime(appointmentData?.startTime) }} - {{ formattedTime(appointmentData?.endTime) }}</span></p>
            <p class="text-gray-600">From <span class="font-semibold">{{ appointmentData?.customerName }}</span> To <span class="font-semibold">{{ appointmentData?.photographerName }}</span></p>
            <p class="text-gray-600">Total : <span class="text-lg font-semibold text-red-500">{{ appointmentData?.price }} ฿</span></p>
            <p v-if="appointmentData.status == AppointmentStatus.Completed" class="text-gray-900">Status : <span class="font-medium">{{ appointmentData?.status }}</span></p>
            <!-- TODO: It work only if status = AppointmentStatus.Completed -->
            <div class="flex flex-row gap-2">
                <div class="flex flex-row gap-2">
                    <Button v-if="appointmentData.status != AppointmentStatus.Completed" @click="onPay" height="h-9" button-options="border border-stroke rounded-md px-8">Pay</Button>
                </div>
            </div>
        </div>
    </div>
</template>