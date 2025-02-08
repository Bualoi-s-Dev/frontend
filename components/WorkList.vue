<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <ImageCard 
        v-for="(item, index) in items" 
        :key="index" 
        :images="item.images" 
        :title="item.title" 
        :owner="item.owner" 
        :type="item.type" 
      />
    </div>
  </template>
  
  <script>
  import ImageCard from "@/components/WorkCard.vue";
  import workImage from "@/assets/workImage.png"
  import workImage2 from "@/assets/workImage2.png"
  export default {
    name: "ImageCardList",
    components: {
      ImageCard,
    },
    data() {
      return {
        items: [
          {
            images: [workImage, workImage2],
            title: "Beautiful Sunset",
            owner: "John Doe",
            type: "Nature",
          },
          {
            images: [workImage, workImage2],
            title: "City Lights",
            owner: "Jane Smith",
            type: "Urban",
          },
          {
            images: [workImage, workImage2],
            title: "Mountain View",
            owner: "Alice Johnson",
            type: "Adventure",
          },
        ],
      };
    },
  };
  </script>
  