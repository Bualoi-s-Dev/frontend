<script setup lang="ts">
const router = useRouter();

const reviews = ref([
  {
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating_score: 5,
    review: "Absolutely loved the photography session! Highly recommended.",
    date: "2025-03-18",
    owner: false,
  },
  {
    name: "Mark Smith",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating_score: 4,
    review:
      "Great experience, but could improve in editing speed. Great experience, but could improve in editing speed.Great experience, but could improve in editing speed.Great experience, but could improve in editing speed.",
    date: "2025-03-15",
    owner: false,
  },
  {
    name: "Sophia Lee",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating_score: 5,
    review: "Fantastic work! Will book again for future events.",
    date: "2025-03-10",
    owner: true,
  },
  {
    name: "James Brown",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating_score: 3,
    review: "Good work, but I expected better lighting.",
    date: "2025-03-05",
    owner: false,
  },
]);
</script>

<template>
  <div class="mx-6 mt-6 flex justify-between items-center">
    <div class="flex flex-row gap-3 text-xl">
      <BackButton />
      All Reviews
    </div>
    <FilterButton />
  </div>

  <div class="mt-[20px]">
    <ReviewList :reviews="reviews" :showAll="true" />
  </div>
</template>
