<script setup lang="ts">
import {
  AppointmentStatus,
  UserRole,
  type AppointmentDetail,
  type AppointmentUpdateStatusRequest,
} from "~/types/api";

const router = useRouter();
const route = useRoute();
const api = useApiStore();
const config = useRuntimeConfig();

const prop = withDefaults(
  defineProps<{
    role?: UserRole;
    complete?: boolean;
    appointmentData: AppointmentDetail;
    index: number;
    manageStatus: (index: number, status: AppointmentStatus) => void;
  }>(),
  {
    role: UserRole.Guest,
    complete: false,
  }
);

const loading = ref(false);

const formattedDate = (time: string) => {
  const date = new Date(time);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formattedTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};

const onAccept = async () => {
  loading.value = true;

  const appointmentStatus: AppointmentUpdateStatusRequest = {
    status: AppointmentStatus.Accepted,
  };
  await api.updateAppointmentStatus(
    prop.appointmentData?.id,
    appointmentStatus
  );
  prop.manageStatus(prop.index, AppointmentStatus.Accepted);
  useToastify("Appointment has been accepted", { type: "success" });

  loading.value = false;
};

const onReject = async () => {
  loading.value = true;

  const appointmentStatus: AppointmentUpdateStatusRequest = {
    status: AppointmentStatus.Rejected,
  };
  await api.updateAppointmentStatus(
    prop.appointmentData?.id,
    appointmentStatus
  );
  prop.manageStatus(prop.index, AppointmentStatus.Rejected);
  useToastify("Appointment has been rejected", { type: "success" });

  loading.value = false;
};

const onCancel = async () => {
  loading.value = true;

  const appointmentStatus: AppointmentUpdateStatusRequest = {
    status: AppointmentStatus.Canceled,
  };
  await api.updateAppointmentStatus(
    prop.appointmentData?.id,
    appointmentStatus
  );
  prop.manageStatus(prop.index, AppointmentStatus.Canceled);
  useToastify("Appointment has been canceled", { type: "success" });

  loading.value = false;
};

// TODO: This function for demo only
const onCreatePayment = async () => {
  loading.value = true;

  if (prop.appointmentData == undefined) return;
  await api.createPayment(prop.appointmentData.id);
  useToastify("Mock payment created", { type: "success" });

  loading.value = false;
};
</script>

<template>
  <div class="bg-neutral-100 w-full shadow-md rounded-lg mx-5 my-3">
    <div class="bg-red-300 p-3">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ appointmentData?.packageName }} / {{ appointmentData?.subpackageName }}
        </h2>
    </div>
    <div class="flex flex-col gap-1 p-3">
      <p v-if="role == UserRole.Photographer" class="text-gray-600 font-medium">
        Customer :
        <span class="font-bold">{{ appointmentData?.customerName }}</span>
      </p>
      <p v-else class="text-gray-600 font-medium">
        Photographer :
        <span class="font-bold">{{ appointmentData?.photographerName }}</span>
      </p>
      <p class="text-gray-600 mt-1">
        Date :
        <span class="font-medium">{{
          formattedDate(appointmentData?.startTime)
        }}</span>
      </p>
      <p class="text-gray-600">
        Time :
        <span class="font-medium"
          >{{ formattedTime(appointmentData?.startTime) }} -
          {{ formattedTime(appointmentData?.endTime) }}</span
        >
      </p>
      <p class="text-gray-600">
        Meeting at : 
        <span class="font-medium">{{ appointmentData.location }}</span>
      </p>
      <div class="flex flex-row justify-between items-center">
        <div>
            <p v-if="appointmentData.status == AppointmentStatus.Canceled || appointmentData.status == AppointmentStatus.Rejected" class="text-gray-900">Status : <span class="font-medium text-red-600">{{ appointmentData.status }}</span></p>
            <p v-if="appointmentData.status == AppointmentStatus.Pending" class="text-gray-900">Status : <span class="font-medium text-blue-600">{{ appointmentData.status }}</span></p>
            <p v-if="appointmentData.status == AppointmentStatus.Accepted || appointmentData.status == AppointmentStatus.Completed" class="text-gray-900">Status : <span class="font-medium text-green-600">{{ appointmentData.status }}</span></p>
        </div>
        <p class="text-gray-900 text-lg font-semibold">
          {{ appointmentData?.price }} ฿
        </p>
      </div>

      <div v-if="!complete" class="flex flex-row gap-2 mt-1">
        <div v-if="role == UserRole.Photographer" class="flex flex-row gap-2">
          <!-- TODO: This button for demo only -->
          <Button
            :disabled="loading"
            v-if="appointmentData.status == AppointmentStatus.Accepted"
            @click="onCreatePayment"
            height="h-9"
            button-options="border border-stroke rounded-md px-4"
            >Create Payment</Button
          >

          <Button
            :disabled="loading"
            v-if="appointmentData.status == AppointmentStatus.Pending"
            @click="onAccept"
            height="h-9"
            button-options="border border-stroke rounded-md px-4 bg-green-600"
            >Accept</Button
          >
          <Button
            :disabled="loading"
            v-if="appointmentData.status == AppointmentStatus.Pending"
            @click="onReject"
            height="h-9"
            button-options="border border-stroke rounded-md px-4 bg-red-600"
            >Reject</Button
          >
          <Button
            :disabled="loading"
            v-if="appointmentData.status == AppointmentStatus.Accepted"
            @click="onCancel"
            height="h-9"
            button-options="border border-stroke rounded-md px-4 bg-red-600"
            >Cancel</Button
          >
        </div>
        <div v-else class="flex flex-row gap-2 mt-1">
          <Button
            :disabled="loading"
            v-if="
              appointmentData.status == AppointmentStatus.Pending ||
              appointmentData.status == AppointmentStatus.Accepted
            "
            @click="onCancel"
            height="h-9"
            button-options="border border-stroke rounded-md px-4 bg-red-600"
            >Cancel</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
