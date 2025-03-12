import { defineStore } from "pinia";
import axios from "axios";
import type {
  PackageResponse,
  PackageRequest,
  UserResponse,
  UserRequest,
  Subpackage,
  SubpackageRequest,
  SubpackageResponse,
} from "~/types/api";
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

  const fetchPackage = async (id: string): Promise<PackageResponse> => {
    const response = await axios.get(`${config.public.apiUrl}/package/${id}`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return response.data as PackageResponse;
  };

  const fetchAllPackage = async (): Promise<PackageResponse[]> => {
    const response = await axios.get(`${config.public.apiUrl}/package`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return response.data as PackageResponse[];
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

  const createSubpackage = async (id: string, spkg: SubpackageRequest) => {
    const response = await axios.post(
      `${config.public.apiUrl}/subpackage/${id}`,
      spkg,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data;
  };

  const deleteSubpackage = async (id: string) => {
    const response = await axios.delete(
      `${config.public.apiUrl}/subpackage/${id}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data;
  };

  const updateSubpackage = async (id: string, spkg: SubpackageRequest) => {
    const response = await axios.patch(
      `${config.public.apiUrl}/subpackage/${id}`,
      spkg,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data;
  };

  const fetchSubpackage = async (id: string): Promise<SubpackageResponse> => {
    const response = await axios.get(
      `${config.public.apiUrl}/subpackage/${id}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as SubpackageResponse;
  };

  return {
    fetchPackage,
    fetchAllPackage,
    fetchUserProfile,
    createPackage,
    updatePackage,
    updateUserInformation,
    createSubpackage,
    deleteSubpackage,
    fetchSubpackage,
    updateSubpackage,
  };
});
