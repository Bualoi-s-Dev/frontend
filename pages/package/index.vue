<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    พรีเวดดิ้ง (เต็มวัน, ครึ่งเช้า/บ่าย)
  </div>
  <div class="w-full h-full p-6 flex flex-col">
    <div class="flex items-center justify-between gap-[10px] w-full">
      <input
        type="text"
        class="border border-stroke w-full rounded-md py-1 pl-2 text-lg"
      />
      <FilterButton />
      <button
        class="flex justify-center items-center gap-[8px] text-[14px] p-[9px] pr-[13px] rounded-[6px] bg-black text-white"
      >
        <Icon icon="ic:baseline-plus" class="w-[16px] h-[16px]" />
        New
      </button>
    </div>
    <img
      class="h-[253px] w-full object-cover rounded-[20px] mt-6"
      src="../../assets/workImage2.png"
    />
    <div
      class="text-[12px] text-white rounded-[10px] px-[10px] py-[8px] w-fit mt-6 bg-gradient-to-r from-primary to-secondary opacity-85"
    >
      Pre-wedding
    </div>
    <div class="flex flex-col gap-[16px] mt-6">
      <SubpackageCard
        title="Premium Package"
        description="A great package with full features."
        :price="1999"
        timeStart="09:00"
        timeEnd="15:00"
        dateStart="2025-03-01"
        dateEnd="2025-03-31"
        :activeDays="['Mon', 'Wed', 'Fri']"
        :isOwner="true"
      />
    </div>
  </div>
</template>
