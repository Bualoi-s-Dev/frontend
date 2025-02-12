<script setup lang="ts">
import imageIcon from "assets/icons/image.svg";
import { PackageType } from "~/types/api";

const props = defineProps<{
  onSubmit: (imageUrl: string, name: string, type: string) => void;
}>();

const types: PackageType[] = Object.values(PackageType);

const imageUrl = ref("");
const name = ref("");
const type = ref("");

const fileInput = useTemplateRef("fileInput");

const onFileChange = async (event: any) => {
  const file = event.target?.files[0];
  if (file && file.type.startsWith("image/")) {
    imageUrl.value = await readFileAsDataURL(file);
  }
};

const valid = computed(() => imageUrl.value && name.value && type.value);

const handleSubmit = () =>
  props.onSubmit(imageUrl.value, name.value, type.value);
const handleChooseImage = () => fileInput.value?.click();
</script>

<template>
  <div class="w-full h-full p-6 flex flex-col">
    <button @click="handleChooseImage" :style="{ backgroundImage: `url(${imageUrl})` }"
      class="flex border border-stroke rounded-xl flex-col text-label text-base items-center justify-center gap-4 w-full h-56 font-light bg-cover bg-center">
      <template v-if="!imageUrl">
        <img class="w-12" :src="imageIcon" alt="image" />
        Package Thumbnail
      </template>
    </button>

    <div class="flex flex-row text-lg mt-6">
      Name<span class="text-primary">*</span>
    </div>
    <input v-model="name" type="text" class="border border-stroke w-full rounded-md py-1 pl-2 text-lg mt-1.5" />

    <div class="flex flex-row text-lg mt-6">
      Type<span class="text-primary">*</span>
    </div>
    <select class="border border-stroke w-full rounded-md py-1.5 pl-2 text-lg mt-1.5" v-model="type">
      <option disabled value="">Select Package Type</option>
      <!--  -->
      <option v-for="type in types" :value="type">{{ toTitleCase(type.split("_").join(" ")) }}</option>
    </select>

    <button :disabled="!valid" @click="handleSubmit"
      class="mt-auto ml-auto text-lg px-6 py-2 rounded-lg bg-black text-white disabled:opacity-50">
      Submit
    </button>
  </div>

  <!-- Hidden file input -->
  <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" style="display: none" />
</template>
