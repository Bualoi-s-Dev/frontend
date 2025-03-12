<script setup lang="ts">
import { AppointmentStatus, type AppointmentDetailResponse, type AppointmentUpdateStatusRequest } from '~/types/api';

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

const prop = withDefaults(
  defineProps<{
    role?: string;
    complete?: boolean;
    appointmentData: AppointmentDetailResponse;
  }>(),
  {
    role: "guest", 
    complete: false, 
  }
);

const onAccept = async () => {
    const appointmentStatus : AppointmentUpdateStatusRequest = {status: AppointmentStatus.Accepted};
    await api.updateAppointmentStatus(prop.appointmentData?.id, appointmentStatus);
}

const onReject = async () => {
    const appointmentStatus : AppointmentUpdateStatusRequest = {status: AppointmentStatus.Rejected};
    await api.updateAppointmentStatus(prop.appointmentData?.id, appointmentStatus);
}

const onCancel = async () => {
    const appointmentStatus : AppointmentUpdateStatusRequest = {status: AppointmentStatus.Canceled};
    await api.updateAppointmentStatus(prop.appointmentData?.id, appointmentStatus);
}

</script>

<template>
    <div class="bg-neutral-100 shadow-md rounded-lg mx-5 my-3 p-3">
        <div class="flex flex-col gap-1">
            <h2 class="text-lg font-semibold text-gray-900">{{ appointmentData?.packageName }}</h2>
            <p class="text-gray-600 mt-1">เวลา : <span class="font-medium">{{ appointmentData?.startTime }} - {{ appointmentData?.endTime }}</span></p>
            <p v-if="role == 'photographer'" class="text-gray-600">ลูกค้า : <span class="font-medium">{{ appointmentData?.customerName }}</span></p>
            <p v-else class="text-gray-600">เจ้าของ : <span class="font-medium">{{ appointmentData?.photographerName }}</span></p>
            <p class="text-red-500 text-lg font-semibold">฿ {{ appointmentData?.price }}</p>
            <div v-if="complete">
                <!-- <p v-if="role == 'photographer'" class="text-gray-600">status : <span class="font-medium">{{ appointmentData?.status }}</span></p> -->
                <p class="text-gray-600">status : <span class="font-medium">{{ appointmentData?.status }}</span></p>
            </div>
            <div v-else class="flex flex-row gap-2">
                <div v-if="role == 'photographer'" class="flex flex-row gap-2">
                    <Button v-if="appointmentData.status == 'Pending'" @onclick="onAccept" height="h-9" button-options="border border-stroke rounded-md px-4">Accept</Button>
                    <Button v-if="appointmentData.status == 'Pending'" @onclick="onReject" height="h-9" button-options="border border-stroke rounded-md px-4">Reject</Button>
                </div>
                <div v-else class="flex flex-row gap-2">
                    <Button v-if="appointmentData.status == 'Pending'" @onclick="onCancel" height="h-9" button-options="border border-stroke rounded-md px-4">Cancel</Button>
                </div>
            </div>
        </div>
    </div>
</template>