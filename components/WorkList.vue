<script setup lang="ts">
  const props = defineProps<{
    data: {
        id?: string;
        photoUrls: string[];
        title: string;
        owner?: string;
        type: string;
        editable?: boolean;
        addable?: boolean;
      }[];
  }>();

  const config = useRuntimeConfig();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <div v-for="(work, index) in data" :key="index">
      <WorkCard
        :images="work.photoUrls.map(url => `${config.public.s3URL}${url}`)"
        :title="work.title"
        :owner="work.owner"
        :type="work.type"
        :id="work.id"
        editable
        :addable="work.addable"
      />
    </div>
  </div>
</template>
