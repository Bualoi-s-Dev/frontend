<script setup lang="ts">
import { AppointmentStatus, PaymentStatus, UserRole, type AppointmentDetail, type AppointmentUpdateStatusRequest, type PaymentResponse } from '~/types/api';

const router = useRouter();
const route = useRoute()
const api = useApiStore();
const config = useRuntimeConfig();

// const paymentData = ref<PaymentResponse | undefined>();

const prop = withDefaults(
  defineProps<{
    pageId: string | undefined;
    role: UserRole | undefined;
    paymentData: PaymentResponse;
  }>(),
  {
    pageId: 'Transaction',
    role: UserRole.Guest, 
    paymentData: undefined
  }
);

// const fetchNewPaymentData = async() => {
//     const response = await api.fetchPayment(prop.paymentId);
//     paymentData.value = response;
// }

// onMounted(async () => {
//     fetchNewPaymentData();
// })

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
    router.push({ path: `/payment/order/${prop.paymentData.payment.id}` });
}

</script>

<template>
    <div class="bg-neutral-100 w-full shadow-md rounded-lg mx-5 my-3">
        <div class="bg-gray-400 p-3">
            <h2 class="text-lg font-semibold text-gray-900">{{ paymentData?.appointment?.packageName }} / {{ paymentData?.appointment?.subpackageName }}</h2>
        </div>
        <div class="flex flex-col gap-1 p-3">
            <p class="text-gray-600 mt-1">Date : <span class="font-medium">{{ formattedDate(paymentData?.appointment?.startTime) }}</span></p>
            <p class="text-gray-600">Time : <span class="font-medium">{{ formattedTime(paymentData?.appointment?.startTime) }} - {{ formattedTime(paymentData?.appointment?.endTime) }}</span></p>
            <p class="text-gray-600">From <span class="font-semibold">{{ paymentData?.appointment?.customerName }}</span> To <span class="font-semibold">{{ paymentData?.appointment?.photographerName }}</span></p>
            <div class="w-full h-0.5 bg-gray-400 mt-2 mb-2"></div>
            <div class="flex flex-row justify-between items-center">
                <div v-if="role == UserRole.Customer">
                    <p v-if="paymentData?.payment.customer.status == PaymentStatus.Unpaid" class="text-gray-900">Status : <span class="font-medium text-amber-600">{{ paymentData?.payment.customer.status }}</span></p>
                    <p v-if="paymentData?.payment.customer.status == PaymentStatus.Paid" class="text-gray-900">Status : <span class="font-medium text-green-600">{{ paymentData?.payment.customer.status }}</span></p>
                </div>
                <div v-if="role == UserRole.Photographer">
                    <p v-if="paymentData?.payment.photographer.status == PaymentStatus.Wait" class="text-gray-900">Status : <span class="font-medium text-amber-600">{{ paymentData?.payment.photographer.status }}</span></p>
                    <p v-if="paymentData?.payment.photographer.status == PaymentStatus.InProcess" class="text-gray-900">Status : <span class="font-medium text-blue-600">{{ paymentData?.payment.photographer.status }}</span></p>
                    <p v-if="paymentData?.payment.photographer.status == PaymentStatus.Completed" class="text-gray-900">Status : <span class="font-medium text-green-600">{{ paymentData?.payment.photographer.status }}</span></p>
                </div>
                <div>
                    <p class="text-gray-900"><span class="text-lg font-semibold">{{ paymentData?.appointment?.price }} ฿</span></p>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="flex flex-row gap-2">
                    <Button v-if="role == UserRole.Customer && paymentData?.payment.customer.status == PaymentStatus.Unpaid && pageId == 'ToPay'" class="mt-1" @click="onPay" height="h-9" button-options="border border-stroke rounded-md px-8">Pay</Button>
                </div>
            </div>
        </div>
    </div>
</template>