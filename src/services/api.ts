import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const fetch = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isPublicRoute = (url?: string) => {
  return (
    url?.includes("/auth/login") ||
    url?.includes("/auth/refresh") ||
    url?.includes("/onboarding") ||
    url?.includes("/account/send/code/change-password") ||
    url?.includes("/account/password-recovery/verify") ||
    url?.includes("/account/change-password")
  );
};

fetch.interceptors.request.use(async (config) => {
  if (!isPublicRoute(config.url)) {
    const access_token = await AsyncStorage.getItem("accessToken");

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  }

  return config;
});

fetch.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isPublicRoute(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("Refresh token não encontrado.");
        }

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
          {
            refreshToken,
          },
        );

        const newAccessToken = response.data.accessToken;

        await AsyncStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return fetch(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);

        throw refreshError;
      }
    }

    return Promise.reject(error);
  },
);

export default fetch;
