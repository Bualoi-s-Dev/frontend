<script setup lang="ts">
import imageIcon from "assets/icons/image.svg";

const props = defineProps<{
  accept?: string;
  class?: string;
  disabled?: boolean;
}>();

const clazz = computed(() => props.class ?? '');

const fileInput = useTemplateRef('fileInput');

/**
 * Base64
 */
const image = defineModel<string>();

const onFileChange = () => {
  const file = fileInput.value?.files?.[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      image.value = reader.result as string;
    };
  }
};

const handleChooseImage = () => fileInput.value?.click();
</script>

<template>
  <button @click="handleChooseImage" :disabled="disabled" :style="{ backgroundImage: `url(${image})` }"
    :class="clazz"
    class="flex disabled:opacity-50 border border-stroke rounded-xl flex-col text-label text-base items-center justify-center gap-4 w-full h-[142px] font-light bg-cover bg-center">
    <template v-if="!image">
      <img class="w-[41px]" :src="imageIcon" alt="image" />
      <h1 class="text-[10px] text-label">Profile Picture</h1>
    </template>
  </button>

  <input type="file" ref="fileInput" @change="onFileChange" :accept="accept ?? 'image/*'" class="hidden" />
</template>
