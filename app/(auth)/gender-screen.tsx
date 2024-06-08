import { Text, StyleSheet, SafeAreaView, Pressable, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useSend } from '@/contexts/MachineContext';
import { GENDER_OPTIONS } from '@/machines/create_account_machine';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { buttons } from '@/styles/buttons';

export default function GenderScreen() {
  const { send, state } = useSend();

  const handleBackButtonPress = () => {
    send({ type: 'BACK_SCREEN' });
  };

  const hanldePressNext = () => {
    send({ type: 'NEXT_SCREEN' });
  };

  const selectedGender = state.context.gender;

  return (
    <SafeAreaView style={containers.container}>
      <View style={containers.headerContainer}>
        <Pressable onPress={handleBackButtonPress} style={buttons.backButton}>
          <FontAwesome5 name="chevron-left" style={typography.backButtonIcon} />
        </Pressable>
      </View>
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

        <Pressable onPress={hanldePressNext} style={[buttons.baseButton, buttons.primaryButton]}>
          <Text style={[buttons.baseButtonText, buttons.primaryButtonText]}>Next</Text>
        </Pressable>
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
