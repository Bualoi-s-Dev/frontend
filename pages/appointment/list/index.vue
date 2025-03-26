<script setup lang="ts">
import type { UserProfile } from 'firebase/auth';
import { AppointmentStatus, type AppointmentDetail, type AppointmentResponse, type UserRequest, type UserResponse } from '~/types/api';

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

const appointmentList = ref<AppointmentDetail[] | undefined>();
const userData = ref<UserResponse>();

// TODO: refactor function to not use index
const manageStatus = (index: number, status: AppointmentStatus) => {
    if(appointmentList.value == undefined) return ;
    appointmentList.value[index].status = status;
    return ;
}

onMounted(async () => {
    const response1 = await api.fetchAppointmentsDetail();
    appointmentList.value = response1;
    
    const response2 = await api.fetchUserProfile();
    userData.value = response2;
})

</script>

<template>
    <div class="mt-6 flex flex-col">
        <SearchBar :role="userData?.role" />
        <div class="items-center mx-7 my-2">
            <h1 class="text-xl">Appointment List</h1>
        </div>
        <div
            v-for="appointment, index in appointmentList"
            :key="appointment.id"
            class="flex items-center"
        >
            <AppointmentCard v-if="appointment.status != AppointmentStatus.Completed" :role="userData?.role" :appointmentData="appointment" :index="index" :manageStatus="manageStatus" />
        </div>
    </div>
</template>