<template>
    <!-- Wrapper to control overflow -->
    <div class="relative inline-block">
      <!-- Avatar Container -->
      <div class="w-32 h-32 rounded-full shadow-lg">
        <img
          :src="src"
          :alt="altText"
          class="w-full h-full object-cover rounded-full"
        />
      </div>
  
      <!-- Edit Icon (Always Visible When canEdit is true) -->
      <div
        v-if="canEdit"
        class="absolute w-10 h-10 -top-0 -right-0 bg-gray-500 text-white p-2 rounded-full shadow-md border-2 border-white flex flex-col items-center align-middle"
      >
        <Icon icon="fluent:image-add-32-filled" width="20px" />
      </div>
  
      <!-- Clickable Overlay for Changing the Image -->
      <div
        v-if="canEdit"
        class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"
      >
        <button
          @click="changeImage"
          class="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { Icon } from "@iconify/vue";
  const props = defineProps<{
    src?: string;
    altText?: string;
    canEdit?: boolean;
  }>();
  
  const defaultSrc = "/default-avatar.png"; // Provide a fallback image
  // const imgSrc = ref(props.src || defaultSrc);
  
  const changeImage = () => {
    console.log("Trigger file upload or image change action here!");
    // You can implement an input file picker to select a new image.
  };
  </script>
  