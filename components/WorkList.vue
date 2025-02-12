<script setup lang="ts">

const props = defineProps({
  data: {
    type: Array as () => Array<{
      photo_urls: string[];
      title: string;
      owner?: string;
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
    <div v-for="(work, index) in data" :key="index">
      <WorkCard
        :images="work.photo_urls.map(url => `https://pub-58a5559d12b34ac5999431d8764da7fa.r2.dev${url}`)"
        :title="work.title"
        :owner="work.owner"
        :type="work.type"
        :editable="work.editable"
        :addable="work.addable"
      />
      <!-- <pre>{{ console.log(work.photo_urls) }}</pre>  -->
    </div>
  </div>
</template>
