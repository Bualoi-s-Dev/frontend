<script setup lang="ts">
import Button from "@/components/Button.vue";
import profilePic from "@/assets/profilePicture.png";
import workImage from "@/assets/workImage.png";
import workImage2 from "@/assets/workImage2.png";
import { Icon } from "@iconify/vue";

const user = ref({
  name: "Gong Ji-cheol",
  email: "gongji@gmail.com",
  description: "Professional Photographers for you, babe",
  location: "Bangkok, Thailand",
  profilePic: profilePic,
});
const workList = ref([
  {
    images: [workImage, workImage2],
    title: "Beautiful Sunset",
    owner: "John Doe",
    type: "Nature",
    editable: true,
  },
  {
    images: [workImage, workImage2],
    title: "City Lights",
    owner: "Jane Smith",
    type: "Urban",
    editable: true,
  },
  {
    images: [workImage, workImage2],
    title: "Mountain View",
    owner: "Alice Johnson",
    type: "Adventure",
    editable: true,
  },
]);

const isModalOpen = ref(false);
const currentField = ref("");
const editedValue = ref("");

const openEditModal = (field) => {
  currentField.value = field;
  editedValue.value = user.value[field];
  isModalOpen.value = true;
};

const closeEditModal = () => {
  isModalOpen.value = false;
};

const saveChanges = () => {
  user.value[currentField.value] = editedValue.value;
  closeEditModal();
};
</script>

<template>
  <div class="mt-6">
    <div class="flex flex-col">
      <div class="flex flex-row justify-between mx-5.5">
        <div class="flex flex-row items-center gap-3">
          <BackButton />
          <h1 class="text-xl">Show package</h1>
        </div>
      </div>
      <div class="w-full h-full py-3 px-5 flex flex-row items-center">
        <input
          v-model="name"
          type="text"
          class="mr-2 border border-stroke w-full rounded-md text-lg"
        />
        <Button
          icon-color="gray"
          bg-color="bg-white"
          middle-icon="basil:filter-outline"
          button-options="border border-stroke rounded-md"
        ></Button>
      </div>

      <!--             <WorkList :data="workList"/>

            <div v-if="isModalOpen" class="fixed inset-0 bg-opacity-50 flex items-center justify-center" @click.self="closeEditModal">
                <div class="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h3 class="text-lg font-semibold mb-4">Edit {{ currentField.charAt(0).toUpperCase() + currentField.slice(1)}}</h3>
                    <input v-model="editedValue" type="text" class="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <div class="flex justify-between">
                        <Button @click="saveChanges">Save</Button>
                        <Button @click="closeEditModal">Cancel</Button>
                    </div>
                </div>
            </div> -->
    </div>
  </div>
</template>
