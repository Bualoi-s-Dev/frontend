<script setup lang="ts">
import type { PaymentResponse } from '~/types/api';


const route = useRoute();
const api = useApiStore();
const oid = route.params.oid as string;

const paymentData = ref<PaymentResponse | undefined>()

const fetchNewPaymentData = async() => {
    const response = await api.fetchPayment(oid);
    paymentData.value = response;
}

onMounted(async () => {
    fetchNewPaymentData();
})

</script>

<template>
    <TransactionForm :paymentData="paymentData" />
</template>