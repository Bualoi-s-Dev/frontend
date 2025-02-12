import { defineStore } from 'pinia';
import axios from 'axios';
import type { User } from '~/types/api';
import { useAuthStore } from './auth';

export const useApiStore = defineStore('api', () => {
    const auth = useAuthStore();
    const config = useRuntimeConfig();

    const fetchUserProfile = async (): Promise<User> => {
        const response = await axios.get(`${config.public.apiUrl}/user/me`, {
            headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        });
        return response.data as User;
    };


    return {
        fetchUserProfile
    };
});
