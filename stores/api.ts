import { defineStore } from "pinia";
import axios from "axios";
import type { Package, PackageStrictRequest, User } from "~/types/api";
import { useAuthStore } from "./auth";

export const useApiStore = defineStore("api", () => {
  const auth = useAuthStore();
  const config = useRuntimeConfig();

  const fetchUserProfile = async (): Promise<User> => {
    const response = await axios.get(`${config.public.apiUrl}/user/profile`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return response.data as User;
  };

  const createPackage = async (pkg: PackageStrictRequest) => {
    // TODO: remove trailing slash when backend fix the endpoint.
    const response = await axios.post(`${config.public.apiUrl}/package/`, pkg, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
  };

  const updatePackage = async (id: string, pkg: PackageStrictRequest) => {
    console.log("updating package");
    const response = await axios.patch(
      `${config.public.apiUrl}/package/${id}`,
      pkg,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    console.log(pkg.photos[0], "update package");
    return response.data;
  };

  const fetchUserPackage = async (): Promise<Package[]> => {
    // TODO: remove trailing slash when backend fix the endpoint.
    const response = await axios.get(`${config.public.apiUrl}/package/`, {
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

  const updateUserInformation = async (payload: any) => {
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
