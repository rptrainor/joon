import { Text, StyleSheet, SafeAreaView, Pressable, View } from 'react-native';

import { useSend } from '@/contexts/MachineContext';
import { GENDER_OPTIONS } from '@/machines/create_account_machine';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { buttons } from '@/styles/buttons';
import { BackButton } from '@/components/Buttons/BackButton';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';

export default function GenderScreen() {
  const { send, state, handlePressNext, handleBackButtonPress } = useSend();

  const selectedGender = state.context.gender;

  return (
    <SafeAreaView style={containers.container}>
      <BackButton onPress={handleBackButtonPress} />
      <View style={containers.innerContainer}>
        <Text style={typography.headerText}>What is your gender?</Text>
        <View style={styles.genderContainer}>
          {GENDER_OPTIONS.map((gender) => (
            <Pressable
              key={gender}
              onPress={() => send({ type: 'SAVE_GENDER', gender })}
              style={[
                buttons.baseButton,
                gender === selectedGender ? styles.genderButtonSelected : styles.genderButton,
              ]}
            >
              <Text
                style={[
                  buttons.baseButtonText,
                  gender === selectedGender && buttons.primaryButtonText,
                ]}
              >{gender}</Text>
            </Pressable>
          ))}
        </View>
        <PrimaryButton onPress={handlePressNext}>
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
