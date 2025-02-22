<script setup lang="ts">
import imageIcon from "assets/icons/image.svg";

const props = defineProps<{
  accept?: string;
  class?: string;
  disabled?: boolean;
  label?: string;
}>();

const clazz = computed(() => props.class ?? '');

const fileInput = useTemplateRef('fileInput');

/**
 * The image that is updated by this component will be base64 string.
 */
const image = defineModel<string>();

const onFileChange = async () => {
  const file = fileInput.value?.files?.[0];
  if (file && file.type.startsWith("image/")) {
    image.value = await readFileAsDataURL(file);
  }
};

const handleChooseImage = () => fileInput.value?.click();
</script>

<template>
  <button @click="handleChooseImage" :disabled="disabled" :style="{ backgroundImage: `url(${image})` }" :class="clazz"
    class="flex disabled:opacity-50 border border-stroke rounded-xl flex-col text-label text-base items-center justify-center gap-4 w-full font-light bg-cover bg-center">
    <slot>
      <template v-if="!image">
        <img class="w-[41px]" :src="imageIcon" alt="image" />
        <h1 class="text-[10px] text-label">{{label}}</h1>
      </template>
    </slot>
  </button>

  <input type="file" ref="fileInput" @change="onFileChange" :accept="accept ?? 'image/*'" class="hidden" />
</template>
