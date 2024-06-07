import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="gender-screen" />
      <Stack.Screen name="children-names-screen" />
      <Stack.Screen name="login-details-screen" />
    </Stack>
  );
}