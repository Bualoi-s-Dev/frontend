<script setup lang="ts">

const prop = withDefaults(
  defineProps<{
    role?: number;
    complete?: boolean;
    status?: string;
    startTime?: string;
    endTime?: string;
  }>(),
  {
    role: 1, 
    complete: false, 
    status: "None", 
    startTime: "x", 
    endTime: "x"
  }
);
</script>

<template>
    <div class="bg-neutral-100 shadow-md rounded-lg mx-5 my-3 p-3">
        <div class="flex flex-col gap-1">
            <h2 class="text-lg font-semibold text-gray-900">งานฟรีเวดดิ้งเต็มวัน (เช้าบ่าย)</h2>
            <p class="text-gray-600 mt-1">เวลา : <span class="font-medium">08:30 - 17:00 น.</span></p>
            <p v-if="role" class="text-gray-600">ลูกค้า : <span class="font-medium">นายชยานิน คงทน</span></p>
            <p v-else class="text-gray-600">เจ้าของ : <span class="font-medium">นายชยานอน คงทาน</span></p>
            <p class="text-red-500 text-lg font-semibold">฿ 5,600</p>
            <div v-if="complete">
                <p v-if="role" class="text-gray-600">status : <span class="font-medium">{{ status }}</span></p>
            </div>
            <div v-else class="flex flex-row gap-2">
                <div v-if="role" class="flex flex-row gap-2">
                    <Button height="h-9" button-options="border border-stroke rounded-md px-4">Accept</Button>
                    <Button height="h-9" button-options="border border-stroke rounded-md px-4">Reject</Button>
                </div>
                <div v-else class="flex flex-row gap-2">
                    <Button height="h-9" button-options="border border-stroke rounded-md px-4">Cancel</Button>
                </div>
            </div>
        </div>
    </div>
</template>