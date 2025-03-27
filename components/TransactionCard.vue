<script setup lang="ts">
import { AppointmentStatus, PaymentStatus, UserRole, type AppointmentDetail, type AppointmentUpdateStatusRequest, type PaymentResponse } from '~/types/api';

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

const paymentData = ref<PaymentResponse | undefined>();

const prop = withDefaults(
  defineProps<{
    role: UserRole | undefined;
    paymentId: string;
  }>(),
  {
    role: UserRole.Guest
  }
);

const fetchNewPaymentData = async() => {
    const response = await api.fetchPayment(prop.paymentId);
    paymentData.value = response;
}

onMounted(async () => {
    fetchNewPaymentData();
})

const formattedDate = (time: string | undefined) => {
    if(time == undefined) return 'Error no time parameter';
    const date = new Date(time);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const formattedTime = (time: string | undefined) => {
    if(time == undefined) return 'Error no time parameter';
    const date = new Date(time);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit"});
}

const onPay = async () => {
    router.push({ path: `/payment/order/${paymentData.value?.payment.id}` });
}

</script>

<template>
    <div class="bg-neutral-100 w-full shadow-md rounded-lg mx-5 my-3 p-3">
        <div class="flex flex-col gap-1">
            <h2 class="text-lg font-semibold text-gray-900">{{ paymentData?.appointment?.packageName }}</h2>
            <p class="text-gray-600 mt-1">Date : <span class="font-medium">{{ formattedDate(paymentData?.appointment?.startTime) }}</span></p>
            <p class="text-gray-600 mt-1">Time : <span class="font-medium">{{ formattedTime(paymentData?.appointment?.startTime) }} - {{ formattedTime(paymentData?.appointment?.endTime) }}</span></p>
            <p class="text-gray-600">From <span class="font-semibold">{{ paymentData?.appointment?.customerName }}</span> To <span class="font-semibold">{{ paymentData?.appointment?.photographerName }}</span></p>
            <p class="text-gray-600">Total : <span class="text-lg font-semibold text-red-500">{{ paymentData?.appointment?.price }} ฿</span></p>
            <div v-if="paymentData?.payment.customer.status != PaymentStatus.Unpaid">
                <p v-if="role == UserRole.Customer" class="text-gray-900">Status : <span class="font-medium">{{ paymentData?.payment.customer.status }}</span></p>
            </div>
            <p v-if="role == UserRole.Photographer" class="text-gray-900">Status : <span class="font-medium">{{ paymentData?.payment.photographer.status }}</span></p>
            <div class="flex flex-row gap-2">
                <div class="flex flex-row gap-2">
                    <Button v-if="role == UserRole.Customer && paymentData?.payment.customer.status == PaymentStatus.Unpaid" @click="onPay" height="h-9" button-options="border border-stroke rounded-md px-8">Pay</Button>
                </div>
            </div>
        </div>
    </div>
</template>