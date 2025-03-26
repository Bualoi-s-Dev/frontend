<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { defineAsyncComponent } from "vue";
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { loadStripe } from "@stripe/stripe-js";
import type { AppointmentDetail, AppointmentStatus, PackageResponse, PaymentResponse } from "~/types/api";

const router = useRouter();
const api = useApiStore();
const config = useRuntimeConfig();

const updating = ref(false);
const errors = ref<Record<string, string>>({});
const paymentMethod = ref("Only Stripe Available");
const temp = ref(""); // TODO: replace with another method

const prop = withDefaults(
    defineProps<{
        paymentData: PaymentResponse | undefined;
    }>(),
    {

    }
);

const fullPackage = computed(() => `${prop.paymentData?.appointment.packageName} / ${prop.paymentData?.appointment.subpackageName}`);

// TODO: Import StripeCheckout dynamically (to prevent SSR issues)
// const StripeCheckout = defineAsyncComponent(() => import("@vue-stripe/vue-stripe"));

// Load environment variables from Nuxt runtimeConfig
const publishableKey = ref(config.public.STRIPE_PUBLISHABLE_KEY);

// Define the reference for the StripeCheckout component
const checkoutRef = ref<StripeCheckout>();

// Function to trigger Stripe checkout

const onSubmit = () => {
    // TODO: go to transaction page
    if (checkoutRef.value) {
        checkoutRef.value.redirectToCheckout();
    }
};

const redirectToCheckout = async () => {
    const stripe = await loadStripe(publishableKey.value);
    if (!stripe) {
        console.error("Stripe failed to initialize.");
        return;
    }

    if (prop.paymentData?.payment.customer.checkoutId == undefined) {
        console.error("Checkout id is undefined.");
        return;
    }

    const { error } = await stripe.redirectToCheckout({ sessionId: prop.paymentData?.payment.customer.checkoutId });

    if (error) {
        console.error("Stripe checkout error:", error);
    }
};

</script>

<template>
    <!-- <div v-if="popUp != 0" @click="resetPop" onc class="bg-black absolute top-0 left-0 w-screen h-screen" :class="popUp != 0 ? 'opacity-50' : 'opacity-0'"></div>
    <div v-if="popUp == 1" @click="resetPop">
        <div class="fixed inset-0 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <div class="flex flex-col items-center justify-center">
                    <Icon icon="line-md:circle-twotone-to-confirm-circle-transition" style="color: rgb(230, 130, 130); width: 120; height: inherit;" />
                    <label class="text-red-400 text-xl">Payment Successful</label>
                    <p class="text-sm/6 text-center pl-4 pr-4">Congratulations! Your transaction has been completed.</p>
                </div>
            </div>
        </div>
    </div> -->
    <!-- <div v-if="popUp == 2" @click="resetPop">
        <div class="fixed inset-0 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <div class="flex flex-col items-center justify-center gap-5">
                    <label class="text-gray-900 text-xl">You do not have enough funds. Please top up your balance.</label>
                    <button :disabled="updating" @click="okPop"
                        class="text-l px-10 py-2 rounded-lg bg-black text-white">
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div> -->

    <div class="mt-6 flex flex-col mx-7">
        <div class="flex flex-row items-center my-2 gap-3">
            <BackButton />
            <h1 class="text-xl">Order Overview</h1>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-1">
                <label class="text-[16px]">Appointment</label>
                <input disabled type="number" :value="fullPackage"
                    class="block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="flex flex-row gap-5">
                <div class="flex flex-col gap-1">
                    <label class="text-[16px]">From</label>
                    <!-- TODO -->
                    <input disabled type="text" :value="paymentData?.appointment?.customerName"
                        class="block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        readonly />
                </div>
                <div class="flex flex-col gap-1">
                    <label class="text-[16px]">To</label>
                    <!-- TODO -->
                    <input disabled type="text" :value="paymentData?.appointment?.photographerName"
                        class="block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        readonly />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[16px]">Price</label>
                <input disabled type="number" :value="paymentData?.appointment?.price"
                    class="block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[16px]">Proceed to payment via Stripe</label>
                <!-- TODO: fix this v-model shit -->
                <!-- <select :disabled="updating" -->
                <!-- <select disabled
                    class="border w-full text-gray-600 rounded-md py-2 px-2 text-[14px] border-stroke"
                    v-model="temp">

                    <option disabled value="">{{ paymentMethod }}</option>
                     <option v-for="packageData in packages" :value="packageData" :key="packageData.id">{{ packageData.title }}</option>
                </select> -->
            </div>
            <!-- <button :disabled="updating" @click="onSubmit"
                class="mt-auto ml-auto text-l px-6 py-2 rounded-lg bg-black text-white">
                Continue
            </button> -->

            <!-- TODO: fix this checkout button -->

            <!-- <StripeCheckout
                ref="checkoutRef"
                :pk="publishableKey"
                :session-id="paymentData?.payment.customer.checkoutId"
            /> -->
            <button @click="redirectToCheckout" class="mt-auto ml-auto text-l px-6 py-2 rounded-lg bg-black text-white">
                Continue</button>
        </div>
    </div>
</template>