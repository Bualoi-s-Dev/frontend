<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import type { SubpackageResponse } from "~/types/api";

// Props
const props = defineProps<{
  subpackages: SubpackageResponse[];
  onDeleted?: () => Promise<void>;
  navigate?: boolean;
  editable?: boolean;
  addable?: boolean;
  toAdd?: boolean;
  images?: string[];
  title?: string;
  owner?: string;
  type?: string;
  id?: string;
}>();

const priceRange = computed(() => {
  if (props.subpackages.length === 0) return "No Subpackage";

  const prices = props.subpackages.map((x) => x.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return `$${min}`;
  else return `$${min}-${max}`;
});

const router = useRouter();

// Reactive State
const currentIndex = ref(0);
const offset = ref(0);
const startX = ref(0);
const isDragging = ref(false);
const carousel = ref<HTMLElement | null>(null);
const showDeleteDialog = ref(false);
const deleteDialogLoading = ref(false);

// Compute container width
const containerWidth = computed(() => carousel.value?.clientWidth || 0);

// Dragging Functions
const startDrag = (event: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  startX.value = "touches" in event ? event.touches[0].clientX : event.clientX;
};

const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  const currentX =
    "touches" in event ? event.touches[0].clientX : event.clientX;
  const diff = currentX - startX.value;
  offset.value = -currentIndex.value * containerWidth.value + diff;
};

const endDrag = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  const threshold = containerWidth.value / 4;
  const diff = offset.value + currentIndex.value * containerWidth.value;

  if (diff > threshold && currentIndex.value > 0) {
    prevImage();
  } else if (
    diff < -threshold &&
    currentIndex.value < (props.images?.length ?? 0) - 1
  ) {
    nextImage();
  } else {
    offset.value = -currentIndex.value * containerWidth.value;
  }
};

const deleteItem = async () => {
  deleteDialogLoading.value = true;
  try {
    await props.onDeleted?.();
  } catch (err) {
  } finally {
    showDeleteDialog.value = false;
    deleteDialogLoading.value = false;
  }
};

const handleClick = () => {
  if (props.navigate) router.push(`/package/${props.id}`);
};

// Navigation Functions
const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    offset.value = -currentIndex.value * containerWidth.value;
  }
};

const nextImage = () => {
  if (currentIndex.value < (props.images?.length ?? 0) - 1) {
    currentIndex.value++;
    offset.value = -currentIndex.value * containerWidth.value;
  }
};

onMounted(() => {
  offset.value = -currentIndex.value * containerWidth.value;
});
</script>
<template>
  <button
    @click="handleClick"
    class="relative flex flex-col items-center w-full bg-white rounded-2xl shadow-lg"
    :aria-label="toAdd ? 'Create new package' : title"
  >
    <div class="w-full p-4">
      <!-- Image Section -->
      <div
        v-if="!toAdd"
        class="border border-gray-200 rounded-xl mt-2 w-full aspect-[334/200] overflow-hidden shadow-sm"
      >
        <img
          v-if="images?.[0]"
          class="w-full h-full object-cover object-center"
          :src="images[0]"
          alt="Package Image"
        />
        <div
          v-else
          class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
        >
          No Image
        </div>
      </div>
      <div
        v-else
        class="bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl w-full h-40 flex items-center justify-center shadow-md"
      >
        <Button
          bg-color="bg-transparent"
          button-options="w-full h-full"
          text-options="text-5xl text-white font-bold"
          aria-label="Add new package"
        >
          +
        </Button>
      </div>

      <!-- Content Section -->
      <div v-if="type" class="mt-4 text-left">
        <div class="flex flex-row justify-between items-center">
          <PackageTypeBadge v-if="type" :type="type" />

          <div class="flex flex-row items-center gap-3">
            <div v-if="editable">
              <button
                @click.stop="router.push(`/package/edit/${id}`)"
                class="p-2 rounded-full"
                aria-label="Edit package"
              >
                <Icon icon="iconoir:edit" width="24px" />
              </button>
              <button
                @click.stop="() => (showDeleteDialog = true)"
                class="p-2 rounded-full"
                aria-label="Delete package"
              >
                <Icon icon="iconoir:trash" width="24px" />
              </button>
            </div>
            <div v-else-if="addable">
              <Button
                bg-color="bg-primary-500"
                text-options="text-white font-medium"
                button-options="px-4 py-2 rounded-lg"
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
          <div class="flex flex-row justify-between items-baseline mt-1">
            <p class="text-body text-sm">{{ owner }}</p>
            <p class="text-primary-600 font-medium text-primary">
              {{ priceRange }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay for Create Action -->
    <button
      v-if="toAdd"
      @click="router.push(`/package/create`)"
      class="absolute inset-0 w-full h-full rounded-2xl opacity-0 hover:bg-black/5 transition-opacity"
      aria-label="Create package"
    ></button>
  </button>

  <DeleteConfirmPopup
    :disabled="deleteDialogLoading"
    item-text="package"
    :show="showDeleteDialog"
    @close="() => (showDeleteDialog = false)"
    @confirm="deleteItem"
  />
</template>
