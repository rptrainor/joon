import { Text, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { inputs } from '@/styles/inputs';
import { spacing } from '@/styles/spacing';
import  PrimaryButton from '@/components/Buttons/PrimaryButton';
import { colors } from '@/styles/colors';
import { useCreateAccountStore } from '@/stores/createAccountStore';
import { router } from 'expo-router';

export default function NameScreen() {
  const [name, setName] = useCreateAccountStore((state) => [state.name, state.setName]);

  return (
    <SafeAreaView style={[containers.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[containers.innerContainer, { paddingTop: spacing.xlarge }]}>
        <Text style={typography.headerText}>What is your name?</Text>
        <TextInput
          style={inputs.baseInput}
          onChangeText={setName}
          value={name}
          placeholder='E.g. Kevin'
          placeholderTextColor={colors.placeholder}
          />
        <PrimaryButton onPress={() => router.navigate('(auth)/gender-screen')} disabled={!name.length} testID='next-button'>
          Next
        </PrimaryButton>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
