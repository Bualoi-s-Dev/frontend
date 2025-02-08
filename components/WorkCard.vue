<template>
    <div class="bg-gray-100 flex flex-col items-center">
      <div>
        <div class="border border-gray-300 rounded-lg overflow-hidden m-5 w-90 h-50 shadow-md">
          <div
        ref="carousel"
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(${offset}px)` }"
        @mousedown="startDrag"
        @touchstart="startDrag"
        @mousemove="onDrag"
        @touchmove="onDrag"
        @mouseup="endDrag"
        @touchend="endDrag"
        @mouseleave="endDrag"
      >
        <!-- Images -->
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full flex-shrink-0"
        >
          <img :src="image" alt="Carousel Image" class="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
        <div class="flex justify-center">
            <span 
                v-for="(image, index) in images" 
                :key="index" 
                :class="{ 'bg-gray-800': index === currentIndex, 'bg-gray-400': index !== currentIndex }"
                class="w-3 h-3 mx-1 rounded-full transition-colors">
            </span>
       </div>
        <div class="p-5 text-left">
            <Button bg-color="bg-rose-300"+>{{ type }}</Button>
            <div class="mt-5">
              <h2 class="text-lg font-semibold">{{ title }}</h2>
              <div class="flex flex-row justify-between">
                <p class="text-gray-600">{{ owner }}</p>
                <p class="text-rose-300"> $2500-5600 </p>
              </div>
            </div>
        </div>
       </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageCard',
    props: {
      images: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      owner: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        currentIndex: 0,
      offset: 0,
      startX: 0,
      isDragging: false,
      };
    },
    computed: {
    containerWidth() {
      return this.$refs.carousel?.clientWidth || 0;
    },
  },
    methods: {
        startDrag(event) {
        this.isDragging = true;
        this.startX = event.clientX || event.touches[0].clientX;
        },
        onDrag(event) {
        if (!this.isDragging) return;
        const currentX = event.clientX || event.touches[0].clientX;
        const diff = currentX - this.startX;
        this.offset = -this.currentIndex * this.containerWidth + diff;
        },
        endDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;

        const threshold = this.containerWidth / 4;
        const diff = this.offset + this.currentIndex * this.containerWidth;

        if (diff > threshold && this.currentIndex > 0) {
            this.prevImage();
        } else if (diff < -threshold && this.currentIndex < this.images.length - 1) {
            this.nextImage();
        } else {
            this.offset = -this.currentIndex * this.containerWidth;
        }
        },
        prevImage() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.offset = -this.currentIndex * this.containerWidth;
        }
        },
        nextImage() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.offset = -this.currentIndex * this.containerWidth;
        }
        }
    }
};
  </script>
  