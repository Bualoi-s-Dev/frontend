<script setup lang="ts">
import Button from "@/components/Button.vue"
import profilePic from "@/assets/profilePicture.png"
import { Icon } from "@iconify/vue";
import workImage from "@/assets/workImage.png";
import workImage2 from "@/assets/workImage2.png";

const user = ref({ name: 'Gong Ji-cheol', description: 'Professional Photographers for you, babe', location: 'Bangkok, Thailand', profilePic: profilePic})

const workList = ref([
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
]);
</script>

<template>
    <div class="mt-10">
        <div class="flex flex-col">
            <div class="flex flex-col items-center">
                <ProfileImage :src="user.profilePic"/>
                <h2 class="text-xl font-semibold mt-4">{{ user.name }}</h2>
                <p class="text-sm text-red-900">{{ user.description }}</p>
                <p class="text-sm text-red-900 mb-2">{{ user.location }}</p>
                <Button width="w-80" text-options="text-white text-right text-sm">Edit Profile</Button>
                <Button width="w-80" text-options="mt-2 text-white text-right text-sm">View All Packages</Button>
            </div>
            <h2 class="ml-6 mt-6">Work showcase</h2>
            <WorkList :data="workList"/>
            <div>
                <div class="flex items-center ml-5 mb-3">
                    <Button middle-icon="carbon:user"  height="h-10" bg-color="bg-rose-50"></Button>
                    <div class="flex-col ml-4">
                        <p>Contact Information</p>
                        <p class="text-sm text-gray-400">Find their contact details!</p>
                    </div>
                </div>
                <div class="flex items-center ml-5">
                    <Button middleIcon="carbon:user" height="h-10" bg-color="bg-rose-300"></Button>
                    <div class="flex-col ml-4">
                        <p>Review</p>
                        <p class="text-sm text-gray-400">Check their reviews now</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>