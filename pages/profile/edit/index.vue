<script setup lang="ts">
import Button from "@/components/Button.vue";
import { Icon } from "@iconify/vue";
import type { PackageResponse, UserRequest } from "~/types/api";

type EditData = { name: string; gender: string; location: string };

const allData = ref<any>(null);
const config = useRuntimeConfig();
const user = ref<EditData>({ name: "", gender: "", location: "" });
const imageUrl = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const packages = ref<PackageResponse[] | null>(null);
const oldImage = ref("");
const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target?.files?.[0];
  if (file && file.type.startsWith("image/")) {
    imageUrl.value = await readFileAsDataURL(file);
  }
};

const errorMessage = ref("");

const api = useApiStore();

const fetchUserProfile = async () => {
  updating.value = true;
  try {
    const response = await api.fetchUserProfile();
    user.value.name = response.name;

    imageUrl.value = config.public.s3URL + response.profile;
    oldImage.value = config.public.s3URL + response.profile;

    user.value.gender = response.gender;
    user.value.location = response.location;

    packages.value = response.photographerPackages;
    allData.value = response; // Storing response in data
  } catch (error: any) {
    console.error(error.message);
    useToastify(error.message, { type: "error" });
    errorMessage.value = error.message;
  } finally {
    updating.value = false;
  }
};

const updating = ref(false);

const updateUserInformation = async () => {
  updating.value = true;
  const payload: UserRequest = {
    name: user.value.name,
    gender: user.value.gender,
    phone: allData.value.phone,
    location: user.value.location,
  };
  if (imageUrl.value !== oldImage.value) payload.profile = imageUrl.value;

  try {
    await api.updateUserInformation(payload);
    useToastify("Successfully updated profile.", { type: "success" });
  } catch (error: any) {
    useToastify(error.message, { type: "error" });
    errorMessage.value = error.message;
    console.error(errorMessage);
  } finally {
    updating.value = false;
  }
};

onMounted(() => {
  fetchUserProfile();
});

const isModalOpen = ref(false);
const currentField = ref<keyof EditData | null>(null);
const editedValue = ref("");

const openEditModal = (field: keyof EditData) => {
  currentField.value = field;
  editedValue.value = user.value[field];
  isModalOpen.value = true;
};

const closeEditModal = () => {
  isModalOpen.value = false;
};

const saveChanges = () => {
  if (currentField.value === null) return;
  user.value[currentField.value] = editedValue.value;
  closeEditModal();
};
const handleChooseImage = () => fileInput.value?.click();
</script>

<template>
  <div class="mt-6">
    <div class="flex flex-col">
      <div class="flex flex-row justify-between mx-5.5">
        <div class="flex flex-row items-center gap-3">
          <BackButton />
          <h1 class="text-md">Edit Information</h1>
        </div>
        <Button
          :disabled="updating"
          class="disabled:opacity-50"
          @click="updateUserInformation"
          >Save</Button
        >
      </div>
      <div class="flex flex-col items-center">
        <input
          type="file"
          ref="fileInput"
          @change="onFileChange"
          accept="image/*"
          style="display: none"
        />
        <ProfileImage
          :disabled="updating"
          @click="handleChooseImage"
          :src="imageUrl"
          :can-edit="true"
        />
      </div>
      <div></div>

      <div>
        <div
          v-for="([key, value], index) in Object.entries(user).filter(
            ([k]) => k !== 'profilePic'
          )"
          :key="index"
          class="flex justify-between items-center mt-2"
        >
          <div class="ml-6 text-left">
            <strong class="text-gray-700"
              >{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</strong
            >
          </div>
          <div class="mr-3 text-right text-gray-600">
            {{
              key === "description" && value.length > 17
                ? value.slice(0, 17) + "..."
                : value
            }}
            <button
              :disabled="updating"
              class="disabled:opacity-50"
              @click="openEditModal(key as keyof EditData)"
            >
              <Icon icon="iconoir:edit" />
            </button>
          </div>
        </div>
      </div>
      <h2 class="ml-6 mt-6">Work showcase</h2>

      <WorkList v-if="packages" :data="packages" />

      <div class="m-5">
        <WorkCard :to-add="true" />
      </div>

      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-opacity-50 flex items-center justify-center"
        @click.self="closeEditModal"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-80">
          <h3 class="text-lg font-semibold mb-4">
            Edit
            {{
              (currentField?.charAt(0).toUpperCase() ?? "") +
              currentField?.slice(1)
            }}
          </h3>

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
