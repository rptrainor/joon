import { Text, StyleSheet, SafeAreaView, Pressable, View } from 'react-native';
import { useState, type ReactNode } from 'react';
import { z } from 'zod';
import { router } from 'expo-router';

import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { buttons } from '@/styles/buttons';
import BackButton from '@/components/Buttons/BackButton';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useCreateAccountStore } from '@/stores/createAccountStore';
import ErrorMessage from '@/components/ErrorMessage';

export const GENDER_OPTIONS = ['male', 'female', 'other'] as const;

const genderSchema = z.enum(GENDER_OPTIONS, { errorMap: () => ({ message: 'Please select a gender' }) });

export default function GenderScreen(): ReactNode {
  const [gender, setGender] = useCreateAccountStore((state) => [state.gender, state.setGender]);
  const [error, setError] = useState<string | null>(null);

  const handleGenderSelect = (selectedGender: typeof GENDER_OPTIONS[number]) => {
    setGender(selectedGender);
    setError(null); 
  };

  const handleNext = () => {
    try {
      genderSchema.parse(gender);
      setError(null);
      router.navigate('(auth)/children-names-screen');
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
    }
  };

  return (
    <SafeAreaView style={containers.container}>
      <BackButton onPress={router.back} testID='back-button' />
      <View style={containers.innerContainer}>
        <Text style={typography.headerText}>What is your gender?</Text>
        <View style={styles.genderContainer}>
          {GENDER_OPTIONS.map((genderOption) => (
            <Pressable
              key={genderOption}
              onPress={() => handleGenderSelect(genderOption)}
              style={[
                buttons.baseButton,
                genderOption === gender ? styles.genderButtonSelected : styles.genderButton,
              ]}
            >
              <Text
                style={[
                  buttons.baseButtonText,
                  genderOption === gender && buttons.primaryButtonText,
                ]}
              >{genderOption}</Text>
            </Pressable>
          ))}
        </View>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <PrimaryButton onPress={handleNext} testID='next-button'>
          Next
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    flexWrap: 'nowrap',
  },
  genderButton: {
    backgroundColor: '#E6E6E6',
    width: '30%',
  },
  genderButtonSelected: {
    backgroundColor: '#7E37D5',
    width: '30%',
  }
});
