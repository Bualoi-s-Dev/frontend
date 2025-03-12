<script setup lang="ts">
import type { Package, PackageType } from '~/types/api';

const router = useRouter();
const route = useRoute()

const api = useApiStore();

const oldData = ref<Package | undefined>();
onMounted(async () => {
    const id = route.params.id as string;
    oldData.value = await api.fetchPackage(id);
})

const updating = ref(false);

const submit = async (image: string, name: string, type: string) => {
    if (!oldData.value) throw Error("No old package data");
    try {
        updating.value = true;
        await api.updatePackage(oldData.value.id!, {
            ...oldData.value,
            photos: [image],
            title: name,
            type: type as PackageType
        });
        useToastify('Successfully updated package.', { type: 'success', });

        router.push(`/profile`);
    } catch (error: any) {
        console.log(error.message)
        useToastify(error.message, { type: 'error' });
    } finally {
        updating.value = false;
    }
}
</script>

<template>
    <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
        <BackButton />
        Edit Package
    </div>

    <PackageForm :disabled="oldData === undefined || updating" :data="oldData" @submit="submit" />
</template>