<script setup lang="ts">
import type { UserProfile } from 'firebase/auth';
import type { AppointmentDetailResponse, AppointmentResponse, UserRequest, UserResponse } from '~/types/api';

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

const appointmentList = ref<AppointmentDetailResponse[] | undefined>();
const userData = ref<UserResponse>();

onMounted(async () => {
    const response1 = await api.fetchAppointmentsDetail();
    appointmentList.value = response1;
    
    const response2 = await api.fetchUserProfile();
    userData.value = response2;
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
})

</script>

<template>
    <div class="mt-6 flex flex-col">
        <SearchBar />
        <div class="items-center mx-7 my-2">
            <h1 class="text-xl">Appointment List</h1>
        </div>
        <div
            v-for="appointment in appointmentList"
            :key="appointment.id"
            class="flex items-center"
        >
            <AppointmentCard :role="userData?.role" :complete=true :appointmentData="appointment" />
        </div>
    </div>
</template>