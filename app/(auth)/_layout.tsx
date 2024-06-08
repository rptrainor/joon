import React from 'react';
import { Stack } from 'expo-router';

import { useStateMachineNavigation } from '@/hooks/useStateMachineNavigation';

export default function AuthLayout() {
  useStateMachineNavigation();

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
