import { Text, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { z } from 'zod';
import { router } from 'expo-router';

import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { inputs } from '@/styles/inputs';
import { spacing } from '@/styles/spacing';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { colors } from '@/styles/colors';
import { useCreateAccountStore } from '@/stores/createAccountStore';
import ErrorMessage from '@/components/ErrorMessage';

const nameSchema = z.string().min(1, { message: "Please enter a name" });

export default function NameScreen() {
  const [name, setName] = useCreateAccountStore((state) => [state.name, state.setName]);
  const [error, setError] = useState<string | null>(null);

  const handleChangeText = (text: string) => {
    setName(text);
    try {
      nameSchema.parse(text);
      setError(null);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
    }
  };

  const handleNext = () => {
    try {
      nameSchema.parse(name);
      setError(null);
      router.navigate('(auth)/gender-screen');
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
    }
  };

  return (
    <SafeAreaView style={[containers.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[containers.innerContainer, { paddingTop: spacing.xlarge }]}>
        <Text style={typography.headerText}>What is your name?</Text>
        <TextInput
          style={inputs.baseInput}
          onChangeText={handleChangeText}
          value={name}
          placeholder='E.g. Kevin'
          placeholderTextColor={colors.placeholder}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <PrimaryButton onPress={handleNext} testID='next-button'>
          Next
        </PrimaryButton>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
