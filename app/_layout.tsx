import FontAwesome from "@expo/vector-icons/FontAwesome";
import "@/localization/i18n";

import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ArimaBold: require("../assets/fonts/arima/Arima-Bold.ttf"),
    ArimaRegular: require("../assets/fonts/arima/Arima-Regular.ttf"),
    RobotoRegular: require("../assets/fonts/roboto/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/roboto/Roboto-Bold.ttf"),
    RobotoMedium: require("../assets/fonts/roboto/Roboto-Medium.ttf"),
    RobotoSlabRegular: require("../assets/fonts/roboto-slab/RobotoSlab-Regular.ttf"),
    RobotoSlabMedium: require("../assets/fonts/roboto-slab/RobotoSlab-Medium.ttf"),
    RobotoSlabBold: require("../assets/fonts/roboto-slab/RobotoSlab-Bold.ttf"),

    IntegralRegular: require("../assets/fonts/integral/integralcf-regular.otf"),
    IntegralBold: require("../assets/fonts/integral/integralcf-bold.otf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}

const queryClient = new QueryClient();
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <AuthProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
