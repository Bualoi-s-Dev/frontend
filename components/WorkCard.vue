<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";

// Props
const props = defineProps<{
  editable?: boolean;
  addable?: boolean;
  toAdd?: boolean;
  images?: string[];
  title?: string;
  owner?: string;
  type?: string;
  id?: string;
}>();

const router = useRouter();

// Reactive State
const currentIndex = ref(0);
const offset = ref(0);
const startX = ref(0);
const isDragging = ref(false);
const carousel = ref<HTMLElement | null>(null);

// Compute container width
const containerWidth = computed(() => carousel.value?.clientWidth || 0);

// Dragging Functions
const startDrag = (event: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  startX.value = "touches" in event ? event.touches[0].clientX : event.clientX;
};

const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  const currentX = "touches" in event ? event.touches[0].clientX : event.clientX;
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
  } else if (diff < -threshold && currentIndex.value < (props.images?.length ?? 0) - 1) {
    nextImage();
  } else {
    offset.value = -currentIndex.value * containerWidth.value;
  }
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
  <div class="bg-gray-100 relative flex flex-col items-center w-full rounded-2xl shadow-md">
    <div>
      <div v-if="!toAdd" class="border border-gray-300 rounded-lg mt-3 w-77 aspect-[334/200] overflow-hidden shadow-md">
        <div ref="carousel" class="flex transition-transform duration-300 ease-in-out w-full h-full"
          :style="{ transform: `translateX(${offset}px)` }" @mousedown="startDrag" @touchstart="startDrag"
          @mousemove="onDrag" @touchmove="onDrag" @mouseup="endDrag" @touchend="endDrag" @mouseleave="endDrag">
          <!-- Images -->
          <div v-for="(image, index) in images" :key="index" class="w-full h-full flex-shrink-0">
            <img class="w-full h-full object-cover object-center" :src="image" alt="Carousel Image" />
          </div>
        </div>
      </div>
      <div v-else class="bg-gray-400 rounded-lg overflow-hidden w-77 h-40 shadow-md">
        <Button bg-color="bg-gray-400" button-options="w-full h-full" text-options="text-4xl text-white">+</Button>
      </div>
      <div class="flex justify-center mt-2">
        <span v-for="(image, index) in images" :key="index"
          :class="{ 'bg-gray-800': index === currentIndex, 'bg-gray-400 bg-': index !== currentIndex }"
          class="w-1 h-1 mx-1 rounded-full transition-colors">
        </span>
      </div>

      <div v-if="type" class="my-4 text-left">
        <div class="flex flex-row justify-between">
          <Button bg-color="bg-primary">{{ type }}</Button>
          <div v-if="editable">
            <button @click="router.push(`/package/edit/${id}`)">
              <Icon icon="iconoir:edit" width="30px" />
            </button>
          </div>
          <div v-else-if="addable">
            <Button>Add</Button>
          </div>
        </div>
        <div class="mt-4">
          <h2 class="text-lg font-medium">{{ title }}</h2>
          <div class="flex flex-row justify-between">
            <p class="text-gray-600 font-light">{{ owner }}</p>
            <p class="text-primary font-light"> $2,500-5,600 </p>
          </div>
        </div>
      </div>
    </div>

    <button v-if="toAdd" @click="router.push(`/package/create`)" class="absolute w-full h-full top-0 left-0"></button>
  </div>
</template>