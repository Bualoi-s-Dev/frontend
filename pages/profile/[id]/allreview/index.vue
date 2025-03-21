<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const api = useApiStore();
const config = useRuntimeConfig();

const reviews = ref<
  Array<{
    ratingId: string;
    name: string;
    image: string;
    rating_score: number;
    review?: string;
    date: string;
    owner: boolean;
  }>
>([]);

const userId = ref("");
const errorMessage = ref("");

const id = route.params.id as string;

const fetchUserProfile = async () => {
  try {
    const response = await api.fetchUserProfile();
    userId.value = response.id;
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};

const fetchCustomer = async (
  rating_id: string,
  customer_id: string,
  rating: number,
  review: string | undefined,
  date: string
) => {
  try {
    const response = await api.fetchUserProfileById(customer_id);
    if (response) {
      reviews.value.push({
        ratingId: rating_id,
        name: response.name || "Unknown",
        image: response.profile ? config.public.s3URL + response.profile : "",
        rating_score: rating,
        review: review || "",
        date: date,
        owner: customer_id === userId.value,
      });
    }
  } catch (error: any) {
    console.error("Error fetching customer:", error);
    errorMessage.value = error.message;
  }
};

const fetchRating = async () => {
  try {
    const response = await api.fetchRating(id);
    console.log(response);
    if (Array.isArray(response)) {
      for (const rating of response) {
        let formattedDate = "";
        // Ensure createdTime is a valid date object
        const createdDate = new Date(rating.createdTime);

        if (!isNaN(createdDate.getTime())) {
          // Check if it's a valid date
          formattedDate = createdDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
        } else {
          formattedDate = "Invalid Date"; // Handle invalid date
        }

        await fetchCustomer(
          rating.id,
          rating.customerId,
          Number(rating.rating),
          rating.review,
          formattedDate
        );
      }
    }
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};

onMounted(async () => {
  await fetchUserProfile();
  await fetchRating();
});
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
