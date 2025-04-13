<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  onMounted,
  onUnmounted,
} from "vue";

const emit = defineEmits(); // Define the emit method
const props = defineProps<{
  ratingId: string;
  name: string;
  image: string;
  rating_score: number;
  review?: string;
  date: string;
  owner: boolean;
  showReview: boolean;
}>();

const starIcons = computed(() => {
  const fullStars = props.rating_score;
  const emptyStars = 5 - fullStars;
  return { full: fullStars, empty: emptyStars };
});

const borderClass = computed(() =>
  props.owner
    ? "border-primary border-2 py-[15px] px-[20px] rounded-[16px]"
    : "px-[20px]"
);

const api = useApiStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const showConfirmDialog = ref(false);

// State to toggle the visibility of the full review
const isExpanded = ref(false);

// Truncate the review text if it's too long
const truncatedReview = computed(() => {
  if (props.review && props.review.length > 100 && !props.showReview) {
    return isExpanded.value ? props.review : props.review.slice(0, 100) + "...";
  }
  return props.review; // No truncation if showReview is true
});

// Toggle the review visibility between expanded and collapsed
const toggleReview = () => {
  isExpanded.value = !isExpanded.value;
};

// State for the popup menu
const isMenuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

// Toggle menu visibility
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Close the menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isMenuOpen.value = false;
  }
};

const confirmDelete = () => {
  showConfirmDialog.value = true;
};

const deleteItem = async () => {
  try {
    await api.deleteRating(id, props.ratingId); // Delete the review from the backend

    // Emit an event to remove the review from the frontend (parent component will handle it)
    emit("deleteReview", props.ratingId);
    useToastify("Successfully deleted rating", { type: "success" });
  } catch (error: any) {
    console.error("Failed to delete subpackage:", error);
    useToastify(error.message, { type: "error" });
  }
  showConfirmDialog.value = false;
};

const editItem = () => {
  router.push({ path: `/profile/${id}/editreview/${props.ratingId}` });
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div :class="['flex gap-[20px]', borderClass]">
    <img
      class="h-[35px] w-[35px] object-cover aspect-square rounded-full"
      :src="image"
      alt="Reviewer image"
    />

    <div class="flex flex-col gap-[5px] w-full">
      <div class="flex justify-between items-center relative">
        <p class="text-[16px] text-titleActive">{{ name }}</p>
        <Icon
          v-if="props.owner"
          icon="humbleicons:dots-vertical"
          class="text-body w-[20px] h-[20px] cursor-pointer"
          @click.stop="toggleMenu"
        />

        <!-- Popup menu -->
        <div
          v-if="isMenuOpen"
          ref="menuRef"
          class="absolute right-0 top-6 bg-white border border-gray-300 shadow-md rounded-md py-2 w-[120px] z-50"
        >
          <p
            class="px-4 py-2 text-[14px] text-titleActive cursor-pointer"
            @click="editItem"
          >
            Edit
          </p>
          <p
            class="px-4 py-2 text-[14px] text-titleActive cursor-pointer"
            @click="confirmDelete"
          >
            Delete
          </p>
        </div>
      </div>
      <!-- Rating stars -->
      <div class="flex">
        <Icon
          v-for="n in starIcons.full"
          :key="'full-' + n"
          icon="ic:round-star"
          class="text-yellow-500 w-[24px] h-[24px]"
        />
        <Icon
          v-for="n in starIcons.empty"
          :key="'empty-' + n"
          icon="ic:round-star"
          class="text-empty-star w-[24px] h-[24px]"
        />
      </div>

      <!-- Review text -->
      <p
        class="text-[16px] text-body max-w-full break-all"
        @click="toggleReview"
      >
        {{ truncatedReview }}
        <!-- "View more" text is visible only if the review is truncated and showReview is false -->
        <span
          v-if="
            props.review &&
            props.review.length > 100 &&
            !isExpanded &&
            !props.showReview
          "
          class="text-primary cursor-pointer underline ml-1"
        >
          View more
        </span>
        <!-- "View less" text is visible only if the review is expanded and showReview is false -->
        <span
          v-if="
            isExpanded &&
            props.review &&
            props.review.length > 100 &&
            !props.showReview
          "
          class="text-primary cursor-pointer underline ml-1"
        >
          View less
        </span>
      </p>
      <p class="text-[12px] text-body">{{ date }}</p>
    </div>
  </div>
  <DeleteConfirmPopup
    itemText="review"
    :show="showConfirmDialog"
    @close="showConfirmDialog = false"
    @confirm="deleteItem"
  />
</template>
