<script setup lang="ts">
import type { PackageRequest, PackageResponse, PackageType } from '~/types/api';

const router = useRouter();
const route = useRoute()

const api = useApiStore();

const config = useRuntimeConfig();

const oldData = ref<PackageResponse | undefined>();

onMounted(async () => {
    const id = route.params.id as string;
    const response = await api.fetchPackage(id);

    const imgUrl = config.public.s3URL + response.photoUrls[0];
    // const imgBlob = await fetch(imgUrl).then(res => res.blob());
    // response.photoUrls[0] = await readFileAsDataURL(imgBlob);
    response.photoUrls[0] = imgUrl;

    oldData.value = response;
})

const updating = ref(false);

const submit = async (image: string, name: string, type: string) => {
    if (!oldData.value) throw Error("No old package data");

    updating.value = true;
    try {
        const payload: PackageRequest = {
            title: name,
            type: type as PackageType
        };
        if (image !== oldData.value.photoUrls[0]) payload.photos = [image];
        await api.updatePackage(oldData.value.id!, payload);
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