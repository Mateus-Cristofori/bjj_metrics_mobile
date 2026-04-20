import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#0C0E10");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
