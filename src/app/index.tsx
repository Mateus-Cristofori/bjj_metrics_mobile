import fetch from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const isTokenValid = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload.exp * 1000 > Date.now();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return false;
  }
};

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        if (!accessToken && !refreshToken) {
          router.replace("/welcome");
          return;
        }

        if (accessToken && isTokenValid(accessToken)) {
          router.replace("/dashboard");
          return;
        }

        if (refreshToken && isTokenValid(refreshToken)) {
          const response = await fetch.post<{ accessToken: string }>(
            "/auth/refresh",
            {
              refreshToken,
            },
          );

          await AsyncStorage.setItem("accessToken", response.data.accessToken);

          router.replace("/dashboard");
          return;
        }

        await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);

        router.replace("/login");
      } catch (error) {
        await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
        router.replace("/login");
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
