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
    index: number;
    manageStatus: (index: number, status: AppointmentStatus) => void;
  }>(),
  {
    role: "guest", 
    complete: false, 
  }
);

const onAccept = async () => {
    const appointmentStatus : AppointmentUpdateStatusRequest = {status: AppointmentStatus.Accepted};
    await api.updateAppointmentStatus(prop.appointmentData?.id, appointmentStatus);
    prop.manageStatus(prop.index, AppointmentStatus.Accepted);
}

const onReject = async () => {
    const appointmentStatus : AppointmentUpdateStatusRequest = {status: AppointmentStatus.Rejected};
    await api.updateAppointmentStatus(prop.appointmentData?.id, appointmentStatus);
    prop.manageStatus(prop.index, AppointmentStatus.Rejected);
}

const onCancel = async () => {
    const appointmentStatus : AppointmentUpdateStatusRequest = {status: AppointmentStatus.Canceled};
    await api.updateAppointmentStatus(prop.appointmentData?.id, appointmentStatus);
    prop.manageStatus(prop.index, AppointmentStatus.Canceled);
}

</script>

<template>
    <div class="bg-neutral-100 shadow-md rounded-lg mx-5 my-3 p-3">
        <div class="flex flex-col gap-1">
            <h2 class="text-lg font-semibold text-gray-900">{{ appointmentData?.packageName }}</h2>
            <p class="text-gray-600 mt-1">เวลา : <span class="font-medium">{{ appointmentData?.startTime }} - {{ appointmentData?.endTime }}</span></p>
            <p v-if="role == 'Photographer'" class="text-gray-600">ลูกค้า : <span class="font-medium">{{ appointmentData?.customerName }}</span></p>
            <p v-else class="text-gray-600">เจ้าของ : <span class="font-medium">{{ appointmentData?.photographerName }}</span></p>
            <p class="text-gray-600">สถานที่: {{ appointmentData.location }}</p>
            <p class="text-red-500 text-lg font-semibold">฿ {{ appointmentData?.price }}</p>
            <p class="text-gray-600">status : <span class="font-medium">{{ appointmentData?.status }}</span></p>
           
            <div v-if="!complete" class="flex flex-row gap-2">
                <div v-if="role == 'Photographer'" class="flex flex-row gap-2">
                    <Button v-if="appointmentData.status == AppointmentStatus.Pending" @click="onAccept" height="h-9" button-options="border border-stroke rounded-md px-4">Accept</Button>
                    <Button v-if="appointmentData.status == AppointmentStatus.Pending" @click="onReject" height="h-9" button-options="border border-stroke rounded-md px-4">Reject</Button>
                </div>
                <div v-else class="flex flex-row gap-2">
                    <Button v-if="appointmentData.status == AppointmentStatus.Pending" @click="onCancel" height="h-9" button-options="border border-stroke rounded-md px-4">Cancel</Button>
                </div>
            </div>
        </div>
    </div>
</template>