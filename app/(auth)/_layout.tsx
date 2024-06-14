import type { ReactNode } from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout(): ReactNode {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="gender-screen" />
      <Stack.Screen name="children-names-screen" />
      <Stack.Screen name="login-details-screen" />
      <Stack.Screen name="add-child" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
