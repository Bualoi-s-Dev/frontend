<script setup lang="ts">
import type { UserProfile } from 'firebase/auth';
import type { AppointmentDetailResponse, AppointmentResponse, AppointmentStatus, UserRequest, UserResponse } from '~/types/api';

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

const appointmentList = ref<AppointmentDetailResponse[] | undefined>();
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
        <SearchBar />
        <div class="items-center mx-7 my-2">
            <h1 class="text-xl">Appointment List</h1>
        </div>
        <div
            v-for="appointment, index in appointmentList"
            :key="appointment.id"
            class="flex items-center"
        >
            <AppointmentCard v-if="appointment.status == 'Completed'" :role="userData?.role" :complete=true :appointmentData="appointment"  :index="index" :manageStatus="manageStatus" />
        </div>
    </div>
</template>