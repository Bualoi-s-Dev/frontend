import { defineStore } from 'pinia';
import axios from 'axios';
import type { User, Package } from '~/types/api';
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

    const createPackage = async (pkg: Package) => {
        const response = await axios.post(`${config.public.apiUrl}/package`, pkg, {
            headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        })
        return response.data;
    }

    const editPackage = async (pkg: Package) => {
        const response = await axios.put(`${config.public.apiUrl}/package`, pkg, {
            headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        })
        return response.data;
    }

    return {
        fetchUserProfile,
        createPackage
    };
});
