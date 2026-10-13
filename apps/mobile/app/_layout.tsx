import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'WeedClub', headerShown: false }} />
      <Stack.Screen name="clubs/[slug]" options={{ title: 'Detalle del Club' }} />
    </Stack>
  );
}
