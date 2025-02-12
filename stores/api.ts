import { defineStore } from 'pinia';
import axios from 'axios';
import type { Package, User } from '~/types/api';
import { useAuthStore } from './auth';

export const useApiStore = defineStore('api', () => {
    const auth = useAuthStore();
    const config = useRuntimeConfig();

    const fetchUserProfile = async (): Promise<User> => {
        const response = await axios.get(`${config.public.apiUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        });
        return response.data as User;
    };

    const createPackage = async (pkg: Package) => {
        console.log('posting', pkg);
        const  response = await fetch (`${config.public.apiUrl}/package`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await auth.fetchToken()}`
            },
            body: JSON.stringify(pkg)
        })
        // const response = await axios.post(`${config.public.apiUrl}/package`, pkg, {
        //     headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        // })
        console.log('posted', pkg);
        return response.data;
    }

    const updatePackage = async (pkg: Package) => {
        const response = await axios.put(`${config.public.apiUrl}/package`, pkg, {
            headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        })
        return response.data;
    }

    const fetchUserPackage = async (): Promise<Package> => {
        // TODO: remove trailing slash when backend fix the endpoint.
        const response = await axios.get(`${config.public.apiUrl}/package/`, {
            headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        });
        console.log(response.data)
        return response.data as Package;
    }

    const updateUserInformation = async (payload: any) => {
        const response = await axios.put(`${config.public.apiUrl}/user/profile`, payload, {
            headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        });
    }

    return {
        fetchUserProfile,
        fetchUserPackage,
        createPackage,
        updatePackage,
        updateUserInformation
    };
});
