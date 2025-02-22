import { defineStore } from 'pinia';
import type { User } from '~/types/api';

export const useUserStore = defineStore('user', () => {
    const api = useApiStore();

    const profile = ref<User | null>(null);

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
