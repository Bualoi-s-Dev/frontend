<template>
  <div class="flex flex-col items-center justify-center h-fit py-[10px]">
    <div class="flex flex-col items-start gap-[6px] h-fit">
      <slot name="backButton"></slot>
      <!-- Slot for Button (optional) -->
      <div
        class="px-8 py-12 flex flex-col h-fit mx-auto shadow-lg bg-innerBackground w-[330px] gap-6 rounded-lg"
      >
        <slot></slot>
        <!-- Main Content Slot -->
      </div>
    </div>
  </div>
</template>
