<script setup lang="ts">
import { PackageType } from "~/types/api";

const router = useRouter();
const api = useApiStore();

const adding = ref(false);

const submit = async (image: string, name: string, type: string) => {
  try {
    adding.value = true;
    await api.createPackage({
      photos: [image],
      title: name,
      type: type as PackageType,
    });
    useToastify("Successfully created package.", { type: "success" });

    router.push(`/profile`);
  } catch (error: any) {
    console.error(error.message);
    useToastify(error.message, { type: "error" });
  } finally {
    adding.value = false;
  }
};
</script>

<template>
  <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
    <BackButton />
    Create Package
  </div>

  <PackageForm @submit="submit" :disabled="adding" />
</template>
