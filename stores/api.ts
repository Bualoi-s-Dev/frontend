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
  RatingRequest,
  RatingResponse,
  PaymentURL,
  PaymentResponse,
} from "~/types/api";
import { useAuthStore } from "./auth";
import type { SearchPhotographerParams } from "~/types/api_manual";

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

  const searchPhotographer = async (req: SearchPhotographerParams): Promise<UserResponse[]> => {
    const response = await axios.get(
      `${config.public.apiUrl}/user/photographers`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
        // TODO: remove limit when doing pagination
        params: { ...req, limit: 1000 },
      }
    );
    // TODO: also return pagination data
    return response.data.photographers as UserResponse[];
  }

  const searchPhotographerWithFilter = async (params: string): Promise<UserResponse[]> => {
    const response = await axios.get(
      `${config.public.apiUrl}/user/photographers${params}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as UserResponse[];
  }

  const createPackage = async (pkg: PackageRequest) => {
    const token = await auth.fetchToken()
    console.log(token)
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

  const fetchAllPackageWithFilter = async (filter: string): Promise<PackageResponse[]> => {
    const response = await axios.get(`${config.public.apiUrl}/package${filter}`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return (response.data ?? []) as PackageResponse[];
  };

  const deletePackage = async (id: string) => {
    const response = await axios.delete(
      `${config.public.apiUrl}/package/${id}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data;
  }

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

  const fetchAllSubpackage = async (): Promise<SubpackageResponse[]> => {
    const response = await axios.get(
      `${config.public.apiUrl}/subpackage`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as SubpackageResponse[];
  };


  const fetchSubpackageWithFilter = async (filter: string): Promise<SubpackageResponse[]> => {
    // TODO remove this limit when doing pagination
    filter = filter.length === 0 ? "limit=1000" : filter + "&limit=1000";

    const response = await axios.get(
      `${config.public.apiUrl}/subpackage${filter}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    // TODO: include pagination information
    return (response.data.subpackages ?? []) as SubpackageResponse[];
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

  const fetchAppointmentDetailsWithFilter = async (param: string): Promise<AppointmentDetail[]> => {
    const response = await axios.get(`${config.public.apiUrl}/appointment/detail${param}`, {
      headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
    });
    return response.data as AppointmentDetail[];
  };

  const fetchAppointmentDetailWithId = async (id: string): Promise<AppointmentResponse[]> => {
    const response = await axios.get(`${config.public.apiUrl}/appointment/detail/${id}`, {
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

  const fetchRating = async (id: string): Promise<RatingResponse> => {
    const response = await axios.get(
      `${config.public.apiUrl}/user/${id}/rating`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as RatingResponse;
  };

  const fetchRatingById = async (
    photographerId: string,
    ratingId: string
  ): Promise<RatingResponse> => {
    const response = await axios.get(
      `${config.public.apiUrl}/user/${photographerId}/rating/${ratingId}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as RatingResponse;
  };

  const createRating = async (id: string, payload: RatingRequest) => {
    const response = await axios.post(
      `${config.public.apiUrl}/user/${id}/rating`,
      payload,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data;
  };

  const deleteRating = async (photographerId: string, ratingId: string) => {
    const response = await axios.delete(
      `${config.public.apiUrl}/user/${photographerId}/rating/${ratingId}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data;
  };

  const updateRating = async (
    photographerId: string,
    ratingId: string,
    payload: RatingRequest
  ): Promise<RatingResponse> => {
    const response = await axios.put(
      `${config.public.apiUrl}/user/${photographerId}/rating/${ratingId}`,
      payload,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as RatingResponse;
  };

  const fetchAllPayment = async (): Promise<
    PaymentResponse[]
  > => {
    const response = await axios.get(
      `${config.public.apiUrl}/payment`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as PaymentResponse[];
  };

  const fetchPayment = async (id: string): Promise<
    PaymentResponse
  > => {
    const response = await axios.get(
      `${config.public.apiUrl}/payment/${id}`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as PaymentResponse;
  };

  const fetchOnboardingURL = async (): Promise<
    PaymentURL
  > => {
    const response = await axios.get(
      `${config.public.apiUrl}/payment/onboardingURL`,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as PaymentURL;
  };

  // TODO: This API is for demo ONLY!
  const createPayment = async (id: string): Promise<
    PaymentResponse
  > => {
    const response = await axios.post(
      `${config.public.apiUrl}/payment/charge/${id}`,
      null,
      {
        headers: { Authorization: `Bearer ${await auth.fetchToken()}` },
      }
    );
    return response.data as PaymentResponse;
  };

  return {
    fetchPackage,
    fetchAllPackage,
    fetchAllPackageWithFilter,
    fetchUserPackage,
    fetchUserProfile,
    fetchAllSubpackage,
    fetchUserProfileById,
    searchPhotographer,
    searchPhotographerWithFilter,
    createPackage,
    updatePackage,
    deletePackage,
    updateUserInformation,
    fetchAllAppointment,
    fetchAppointmentDetailsWithFilter,
    fetchAppointmentDetailWithId,
    fetchAppointmentsDetail,
    updateAppointmentStatus,
    fetchAppointment,
    deleteAppointment,
    updateAppointment,
    createAppointment,
    createSubpackage,
    deleteSubpackage,
    fetchSubpackage,
    fetchSubpackageWithFilter,
    updateSubpackage,
    fetchBusyTime,
    createBusyTime,
    deleteBusyTime,
    fetchRating,
    fetchRatingById,
    createRating,
    deleteRating,
    updateRating,
    fetchAllPayment, 
    fetchPayment, 
    fetchOnboardingURL, 
    createPayment
  };
});
