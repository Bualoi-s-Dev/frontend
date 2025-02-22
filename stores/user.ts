import { defineStore } from 'pinia';
import type { UserResponse } from '~/types/api';

// Not using the user store for now. Considering to using it in the future or remove it.
export const useUserStore = defineStore('user', () => {
    const api = useApiStore();

    const profile = ref<UserResponse | null>(null);

    /**
     * Updates the user's profile by fetching the latest data from the API.
     * This function asynchronously retrieves the user profile information
     * and updates the `profile` ref with the fetched user data.
     * 
     * Must be called after logging into session or when updating the profile.
     */

    const updateProfile = async () => {
        profile.value = await api.fetchUserProfile();
    }

    return {
        profile,
        updateProfile
    };
});
