import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { initializeDefaultSettings } from "../utils/settings";
import { Platform } from "react-native";
SplashScreen.preventAutoHideAsync();

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await initializeDefaultSettings();
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
      onLayoutRootView={onLayoutRootView}
    >
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Slot />
        </SafeAreaView>
      </BottomSheetModalProvider>
      <StatusBar
        style={Platform.OS == "ios" ? "dark" : "light"}
        backgroundColor="#1f1f1f"
      />
    </GestureHandlerRootView>
  );
}
