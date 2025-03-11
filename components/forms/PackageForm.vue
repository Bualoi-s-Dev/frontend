<script setup lang="ts">
import { PackageType, type Package } from "~/types/api";

const props = defineProps<{
  onSubmit: (imageUrl: string, name: string, type: string) => void;
  data?: Package;
  disabled?: boolean;
}>();

const types: PackageType[] = Object.values(PackageType);

const imageUrl = ref("");
const name = ref("");
const type = ref("");

watch(() => props.data, async (val, old) => {
  if (!val || deepEqual(val, old)) return;

  imageUrl.value = val.photoUrls[0];
  name.value = val.title;
  type.value = val.type;
});

const valid = computed(() => imageUrl.value && name.value && type.value);
const disableAll = computed(() => props.disabled);

const handleSubmit = () =>
  props.onSubmit(imageUrl.value, name.value, type.value);
</script>

<template>
  <div class="w-full h-full p-6 flex flex-col">
    <FileChooser class="h-56" v-model="imageUrl" :disabled="disableAll" label="Package Thumbnail" />

    <div class="flex flex-row text-lg mt-6">
      Name<span class="text-primary">*</span>
    </div>
    <input :disabled="disableAll" v-model="name" type="text"
      class="border disabled:opacity-50 border-stroke w-full rounded-md py-1 pl-2 text-lg mt-1.5" />

    <div class="flex flex-row text-lg mt-6">
      Type<span class="text-primary">*</span>
    </div>
    <select :disabled="disableAll"
      class="border disabled:opacity-50 border-stroke w-full rounded-md py-1.5 pl-2 text-lg mt-1.5" v-model="type">
      <option disabled value="">Select Package Type</option>
      <!--  -->
      <option v-for="type in types" :value="type">{{ toTitleCase(type.split("_").join(" ")) }}</option>
    </select>

    <button :disabled="!valid || disableAll" @click="handleSubmit"
      class="mt-auto ml-auto text-lg px-6 py-2 rounded-lg bg-black text-white disabled:opacity-50">
      Submit
    </button>
  </div>
</template>
