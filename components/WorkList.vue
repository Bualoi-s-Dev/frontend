<script setup lang="ts">
import type { SubpackageResponse } from "~/types/api";

const route = useRoute();
const api = useApiStore();

const props = defineProps<{
  data: {
    id?: string;
    photoUrls: string[];
    title: string;
    ownerId: string;
    type: string;
    editable?: boolean;
    addable?: boolean;
    subPackages: SubpackageResponse[];
  }[];
  onDelete?: (id: string) => Promise<void>;
  ownerView?: boolean;
  navigate?: boolean;
}>();

const owners = ref<Record<string, string>>({}); // Store owner names

onMounted(async () => {
  for (const work of props.data) {
    if (!owners.value[work.ownerId]) {
      try {
        const response = await api.fetchUserProfileById(work.ownerId);
        owners.value[work.ownerId] = response.name || "Unknown";
      } catch (error) {
        console.error(`Error fetching owner ${work.ownerId}:`, error);
        owners.value[work.ownerId] = "Unknown";
      }
    }
  }
});

const config = useRuntimeConfig();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
    <div v-for="(work, index) in data" :key="index">
      <WorkCard
        @deleted="async () => onDelete?.(work.id ?? 'no id in data')"
        :subpackages="work.subPackages"
        :navigate="navigate"
        :images="work.photoUrls.map((url) => `${config.public.s3URL}${url}`)"
        :title="work.title"
        :owner="owners[work.ownerId] || 'Unknown'"
        :type="work.type"
        :id="work.id"
        :editable="ownerView"
        :addable="work.addable"
      />
    </div>
  </div>
</template>
