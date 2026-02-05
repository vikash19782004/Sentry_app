import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../theme";

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Authentication flow - shown when user is not logged in */}
        <Stack.Screen
          name="(auth)"
          options={{
            animation: "slide_from_bottom",
          }}
        />

        {/* Main app (home, profile, map, etc.) - shown after login */}
        <Stack.Screen
          name="(tabs)"
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
