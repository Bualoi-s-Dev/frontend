<script setup lang="ts">
import { PackageType } from '~/types/api';

const router = useRouter();
const api = useApiStore();

const submit = async (image: string, name: string, type: string) => {
    try {
        const response = await api.createPackage({
            photo_urls: [image],
            title: name,
            type: type as PackageType
        });
        useToastify('Successfully created package.', { type: 'success' });

        router.push(`/user/profile`);
    } catch (error: any) {
        useToastify(error.message, { type: 'error' });
    }
}
</script>

<template>
    <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
        <BackButton />
        Create Package
    </div>

    <PackageForm @submit="submit" />
</template>