import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const fetch = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isPublicRoute = (url?: string) => {
  return url?.includes("/auth/login") || url?.includes("/onboarding");
};

fetch.interceptors.request.use(async (config) => {
  if (!isPublicRoute(config.url)) {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default fetch;
