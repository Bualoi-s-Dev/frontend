<script setup lang="ts">

const props = defineProps({
  data: {
    type: Array as () => Array<{
      images: string[];
      title: string;
      owner: string;
      type: string;
      editable?: boolean;
      addable?: boolean;
    }>,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <WorkCard
      v-for="(work, index) in data"
      :key="index"
      :images="work.images"
      :title="work.title"
      :owner="work.owner"
      :type="work.type"
      :editable="work.editable"
      :addable="work.addable"
    />
  </div>
</template>
