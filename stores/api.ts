import { defineStore } from "pinia";
import axios from "axios";
import type { Package, PackageRequest, PackageStrictRequest, User, UserRequest, UserResponse } from "~/types/api";
import { useAuthStore } from "./auth";

export const useApiStore = defineStore("api", () => {
  const auth = useAuthStore();
  const config = useRuntimeConfig();

  const fetchUserProfile = async (): Promise<UserResponse> => {
    const response = await axios.get(`${config.public.apiUrl}/user/profile`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return response.data as UserResponse;
  };

  const createPackage = async (pkg: PackageRequest) => {
    const response = await axios.post(`${config.public.apiUrl}/package`, pkg, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
  };

  const updatePackage = async (id: string, pkg: PackageRequest) => {
    const response = await axios.patch(
      `${config.public.apiUrl}/package/${id}`,
      pkg,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data;
  };

  const fetchUserPackage = async (): Promise<Package[]> => {
    const response = await axios.get(`${config.public.apiUrl}/package`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return response.data as Package[];
  };

  const fetchPackage = async (id: string): Promise<Package> => {
    const response = await axios.get(`${config.public.apiUrl}/package/${id}`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return response.data as Package;
  };

  const updateUserInformation = async (payload: UserRequest) => {
    const response = await axios.patch(
      `${config.public.apiUrl}/user/profile`,
      payload,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
  };

  return {
    fetchPackage,
    fetchUserPackage,
    fetchUserProfile,
    createPackage,
    updatePackage,
    updateUserInformation,
  };
});
