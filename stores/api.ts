import { defineStore } from "pinia";
import axios from "axios";
import type {
  PackageResponse,
  PackageRequest,
  UserResponse,
  UserRequest,
  SubpackageRequest,
  BusyTime,
  AppointmentResponse,
  AppointmentUpdateStatusRequest,
  AppointmentRequest,
  SubpackageResponse,
  BusyTimeStrictRequest,
  AppointmentDetail,
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

  const fetchUserProfileById = async (id: string): Promise<UserResponse> => {
    const response = await axios.get(
      `${config.public.apiUrl}/user/profile/${id}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as UserResponse;
  };

  // TODO: change parameter/return type to actual type
  const searchPhotographer = async (req: any): Promise<any> => {
    const response = await axios.get(
      `${config.public.apiUrl}/user/photographer`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data;
  }

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

  const fetchUserPackage = async (): Promise<PackageResponse[]> => {
    const response = await axios.get(`${config.public.apiUrl}/package`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return response.data as PackageResponse[];
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

  const fetchBusyTime = async (id: string): Promise<BusyTime> => {
    const response = await axios.get(
      `${config.public.apiUrl}/busytime/photographer/${id}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as BusyTime;
  };

  const createBusyTime = async (busyTime: BusyTimeStrictRequest) => {
    const response = await axios.post(
      `${config.public.apiUrl}/user/busytime`,
      busyTime,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
  };

  const deleteBusyTime = async (id: string) => {
    console.log(id);
    const response = await axios.delete(
      `${config.public.apiUrl}/user/busytime/${id}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data;
  };
  const fetchAllAppointment = async (): Promise<AppointmentResponse[]> => {
    const response = await axios.get(`${config.public.apiUrl}/appointment`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return response.data as AppointmentResponse[];
  };

  const fetchAppointmentsDetail = async (): Promise<
    AppointmentDetail[]
  > => {
    const response = await axios.get(
      `${config.public.apiUrl}/appointment/detail`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as AppointmentDetail[];
  };

  const updateAppointmentStatus = async (
    id: string,
    payload: AppointmentUpdateStatusRequest
  ): Promise<AppointmentResponse> => {
    const response = await axios.patch(
      `${config.public.apiUrl}/appointment/status/${id}`,
      payload,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as AppointmentResponse;
  };

  const fetchAppointment = async (id: string): Promise<AppointmentResponse> => {
    const response = await axios.delete(
      `${config.public.apiUrl}/appointment/${id}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as AppointmentResponse;
  };

  const deleteAppointment = async (id: string) => {
    const response = await axios.get(
      `${config.public.apiUrl}/appointment/${id}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
  };

  const updateAppointment = async (
    id: string,
    payload: AppointmentRequest
  ): Promise<AppointmentResponse> => {
    const response = await axios.patch(
      `${config.public.apiUrl}/appointment/${id}`,
      payload,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as AppointmentResponse;
  };

  const createAppointment = async (
    subid: string,
    payload: AppointmentRequest
  ): Promise<AppointmentResponse> => {
    const response = await axios.post(
      `${config.public.apiUrl}/appointment/${subid}`,
      payload,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as AppointmentResponse;
  };

  return {
    fetchPackage,
    fetchAllPackage,
    fetchUserPackage,
    fetchUserProfile,
    fetchUserProfileById,
    searchPhotographer,
    createPackage,
    updatePackage,
    updateUserInformation,
    fetchAllAppointment,
    fetchAppointmentsDetail,
    updateAppointmentStatus,
    fetchAppointment,
    deleteAppointment,
    updateAppointment,
    createAppointment,
    createSubpackage,
    deleteSubpackage,
    fetchSubpackage,
    updateSubpackage,
    fetchBusyTime,
    createBusyTime,
    deleteBusyTime,
  };
});
