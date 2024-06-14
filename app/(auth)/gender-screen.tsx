import { Text, StyleSheet, SafeAreaView, Pressable, View } from 'react-native';
import { router } from 'expo-router';

import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { buttons } from '@/styles/buttons';
import BackButton from '@/components/Buttons/BackButton';
import  PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useCreateAccountStore } from '@/stores/createAccountStore';

export const GENDER_OPTIONS = ['male', 'female', 'other'] as const;

export default function GenderScreen() {
  const [gender, setGender] = useCreateAccountStore((state) => [state.gender, state.setGender]);

  return (
    <SafeAreaView style={containers.container}>
      <BackButton onPress={router.back} />
      <View style={containers.innerContainer}>
        <Text style={typography.headerText}>What is your gender?</Text>
        <View style={styles.genderContainer}>
          {GENDER_OPTIONS.map((genderOption) => (
            <Pressable
              key={genderOption}
              onPress={() => setGender(genderOption)}
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
              >{gender}</Text>
            </Pressable>
          ))}
        </View>
        <PrimaryButton onPress={() => router.navigate('(auth)/children-names-screen')} disabled={!gender} testID='next-button'>
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
