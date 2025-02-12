import { defineStore } from 'pinia';
import axios from 'axios';
import type { Package, User } from '~/types/api';
import { useAuthStore } from './auth';

export const useApiStore = defineStore('api', () => {
    const auth = useAuthStore();
    const config = useRuntimeConfig();

    const fetchUserProfile = async (): Promise<User> => {
        const response = await axios.get(`${config.public.apiUrl}/user/profile`, {
            // headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        });
        return response.data as User;
    };

    const fetchUserPackage = async(): Promise<Package> => {
        const response = await axios.get(`${config.public.apiUrl}/package`, {
            headers: { Authorization: `Bearer ${await auth.fetchToken()}` }
        });
        console.log(response.data)
        return response.data as Package;
    }

    // const fetchUserPackage = async() => {
    //     axios.get('http://localhost:8080/package/', {
    //         headers: {
    //           Authorization: 'Bearer ' + varToken
    //         }
    //       })
    //       .then(response => {
    //         packages.value = response.data;
    //         console.log(response.data)
    //       })
    //       .catch(error => {
    //         error = error.response ? error.response.data : error.message;  // Storing error in data
    //       });
    // }

    // const fetchUserProfile = async() => {
    //     axios.get('http://localhost:8080/user/profile', {
    //         headers: {
    //           Authorization: 'Bearer ' + varToken
    //         }
    //       })
    //       .then(response => {
    //         console.log(response.data)
    //         imageUrl.value = 'https://pub-58a5559d12b34ac5999431d8764da7fa.r2.dev' + response.data.profile
    //         user.value.name = response.data.name
    //         user.value.gender = response.data.gender
    //         user.value.email = response.data.email
    //         user.value.location = response.data.location
    //         allData.value = response.data;  // Storing response in data
    //       })
    //       .catch(error => {
    //         error = error.response ? error.response.data : error.message;  // Storing error in data
    //       });
    // }
    // const fetchUserPackage = async() => {
    //     axios.get('http://localhost:8080/package/', {
    //         headers: {
    //           Authorization: 'Bearer ' + varToken
    //         }
    //       })
    //       .then(response => {
    //         packages.value = response.data;
    //         console.log(response.data)
    //       })
    //       .catch(error => {
    //         error = error.response ? error.response.data : error.message;  // Storing error in data
    //       });
    // }

    // const updateUserInformation = async () => {
    //     try{
    //         const payload = {
    //             email: allData.value.email,
    //             name: user.value.name,
    //             gender: user.value.gender,
    //             profile: imageUrl.value,
    //             phone: allData.value.phone,
    //             location: user.value.location,
    //             isPhotographer: true,
    //             bankName: allData.value.bankName,
    //             bankAccount: allData.value.bankAccount,
    //             lineID: allData.value.lineID,
    //             facebook: allData.value.facebook,
    //             instagram: allData.value.instagram,
    //             showcasePackages: null,
    //             packages: null,
    //         }
    //         console.log(payload.profile)
    //         const response = await axios.put(
    //             "http://localhost:8080/user/profile",
    //             payload,
    //             {
    //                 headers: {
    //                     Authorization: 'Bearer ' + varToken,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //         responesMessage.value = "Username updated successfully!";
    //     } catch (error) {
    //         responesMessage.value = "Failed to update username.";
    //         console.log(error)
    //     }
    // }

    return {
        fetchUserProfile,
        fetchUserPackage
    };
});
