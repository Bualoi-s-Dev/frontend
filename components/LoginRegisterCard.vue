<template>
  <div class="flex flex-col items-center justify-center h-fit py-[50px]">
    <div class="flex flex-col items-start gap-[6px] h-fit">
      <div
        class="px-[32px] py-[46px] flex flex-col h-fit mx-auto shadow-lg bg-innerBackground w-[330px] gap-[25px] rounded-lg"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
