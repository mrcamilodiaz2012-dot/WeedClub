import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerShadowVisible: false,
          headerTintColor: '#111111',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#f5f6f5' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'WeedClub', headerShown: false }} />
        <Stack.Screen name="clubs/[slug]" options={{ title: 'Club', headerBackTitle: 'Directorio' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
