<script setup lang="ts">
import Button from "@/components/Button.vue"
import profilePic from "@/assets/profilePicture.png"
import workImage from "@/assets/workImage.png";
import workImage2 from "@/assets/workImage2.png";
import { Icon } from "@iconify/vue";
import axios from "axios";

const allData = ref<any>(null)
const packages = ref([])

const user = ref({ name: '', gender:'', email: '', location: '' })
const responesMessage = ref("");
const imageUrl = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target?.files?.[0];
  if (file && file.type.startsWith("image/")) {
    console.log(target.value)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      imageUrl.value = reader.result as string;
      console.log(imageUrl.value)
    };
  }
};

const errorMessage = ref("")

const api = useApiStore();

const fetchUserProfile = async () => {
  try {
    const response = await api.fetchUserProfile();
    user.value.name = response.name
    user.value.gender = response.gender
    user.value.email = response.email
    user.value.location = response.location
    allData.value = response;  // Storing response in data
  } catch ( error: any ) {
    errorMessage.value = error.message;
  }
}

const updateUserInformation = async () => {
    const payload = {
        email: allData.value.email,
        name: user.value.name,
        gender: user.value.gender,
        profile: imageUrl.value,
        phone: allData.value.phone,
        location: user.value.location,
        isPhotographer: true,
        bankName: allData.value.bankName,
        bankAccount: allData.value.bankAccount,
        lineID: allData.value.lineID,
        facebook: allData.value.facebook,
        instagram: allData.value.instagram,
        showcasePackages: null,
        packages: null,
    }
    console.log(payload.profile)
    
}

onMounted(()=>{
    fetchUserProfile();
    //fetchUserPackage();
})

const isModalOpen = ref(false)
const currentField = ref('')
const editedValue = ref('')

const openEditModal = (field) => {
    currentField.value = field
    editedValue.value = user.value[field]
    isModalOpen.value = true
}

const closeEditModal = () => {
    isModalOpen.value = false
}

const saveChanges = () => {
    user.value[currentField.value] = editedValue.value;
    closeEditModal()
}
const handleChooseImage = () => fileInput.value?.click();
</script>

<template>
    <div class="mt-6">
        <div class="flex flex-col">
            <div class="flex flex-row justify-between mx-5.5">
                <div class="flex flex-row items-center gap-3">
                    <BackButton/>
                    <h1 class="text-md">Edit Information</h1>
                </div>
                <Button @click="updateUserInformation">Save</Button>
            </div>
            <div class="flex flex-col items-center">
                <input
                    type="file"
                    ref="fileInput"
                    @change="onFileChange"
                    accept="image/*"
                    style="display: none"
                />
                <ProfileImage @click="handleChooseImage" :src="imageUrl" :can-edit="true"/>
            </div>
            <div>
  </div>
            
            <div>
                <div v-for="([key, value], index) in Object.entries(user).filter(([k]) => k !== 'profilePic')" :key="index" class="flex justify-between items-center mt-2">
                    <div class="ml-6 text-left">
                        <strong class="text-gray-700">{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</strong>
                    </div>
                    <div class="mr-3 text-right text-gray-600">
                        {{ key === 'description' && value.length > 17 ? value.slice(0, 17) + '...' : value }}
                        <button @click="openEditModal(key)">
                            <Icon icon="iconoir:edit"/>
                        </button>
                    </div>
                </div>
                
            </div>
            <h2 class="ml-6 mt-6">Work showcase</h2>

            <WorkList :data="packages"/>

            <div class="m-5">
                <WorkCard :to-add="true"/>
            </div>
            
            <div v-if="isModalOpen" class="fixed inset-0 bg-opacity-50 flex items-center justify-center" @click.self="closeEditModal">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 class="text-lg font-semibold mb-4">Edit {{ formattedField }}</h3>

                <div v-if="currentField === 'gender'">
                    <label class="block font-semibold mb-2">Select Gender:</label>
                    <select
                        class="border border-gray-300 w-full rounded-md py-1.5 pl-2 text-lg mt-1.5"
                        v-model="editedValue"
                    >
                        <option disabled value="">Select Gender Type</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                    </select>
                </div>

                <input
                    v-else
                    v-model="editedValue"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div class="flex justify-between mt-4">
                <Button @click="saveChanges">Save</Button>
                <Button @click="closeEditModal">Cancel</Button>
                </div>
            </div>
            </div>

        </div>
    </div>
</template>