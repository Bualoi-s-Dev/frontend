<script setup lang="ts">
import { Icon } from "@iconify/vue";

const router = useRouter();

const onTransaction = () => {
    router.push({ path: "/payment/transaction" });
}

</script>

<template>
    <div @click="onTransaction" onc class="bg-black absolute top-0 left-0 w-screen h-screen opacity-50"></div>
    <div @click="onTransaction">
        <div class="fixed inset-0 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <div class="flex flex-col items-center justify-center">
                    <Icon icon="line-md:circle-twotone-to-confirm-circle-transition" style="color: rgb(230, 130, 130); width: 120; height: inherit;" />
                    <label class="text-red-400 text-xl">Payment Successful</label>
                    <p class="text-sm/6 text-center pl-4 pr-4">Congratulations! Your transaction has been completed.</p>
                </div>
            </div>
        </div>
    </div>
</template>