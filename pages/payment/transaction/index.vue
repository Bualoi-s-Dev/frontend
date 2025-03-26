<script setup lang="ts">
import type { UserProfile } from 'firebase/auth';
import Index from '~/pages/package/showcase/index.vue';
import { PaymentStatus, type PaymentResponse, type UserResponse } from '~/types/api';

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

const errorMessage = ref("");

const paymentList = ref<PaymentResponse[] | undefined>();
const userData = ref<UserResponse>();

onMounted(async () => {
    try {
        const response = await api.fetchAllPayment();
        paymentList.value = response;
    }
    catch (error: any) {
        errorMessage.value = error.message;
    }
    
    try {
        const response = await api.fetchUserProfile();
        userData.value = response;
    }
    catch (error: any) {
        errorMessage.value = error.message;
    }
})

</script>

<template>
    <div class="mt-6 flex flex-col">
        <SearchBar :role="userData?.role" :but="false" />
        <div class="items-center mx-7 my-2">
            <h1 class="text-xl">Transactions</h1>
        </div>
        <div
            v-for="payment in paymentList"
            :key="payment.payment.id"
            class="flex items-center"
        >
            <TransactionCard v-if="payment.payment.customer.status == PaymentStatus.Paid || payment.payment.photographer.status == PaymentStatus.InProcess || payment.payment.photographer.status == PaymentStatus.Completed" :role="userData?.role" :paymentId="payment.payment.id" />
        </div>
    </div>
</template>