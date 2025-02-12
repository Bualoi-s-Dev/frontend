<script setup lang="ts">
import background from "assets/background.png";
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-[544px] bg-cover bg-center -z-10"
    :style="{ backgroundImage: `url(${background})` }"
  ></div>
</template>
