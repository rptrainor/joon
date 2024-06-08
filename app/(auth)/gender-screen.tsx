import { Text, StyleSheet, SafeAreaView, Pressable, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useSend } from '@/contexts/MachineContext';

type GenderOptions = 'male' | 'female' | 'other';
const GENDER_OPTIONS: GenderOptions[] = ['male', 'female', 'other'];

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
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBackButtonPress} style={styles.backButton}>
        <FontAwesome5 name="chevron-left" style={styles.backButtonIcon} />
      </Pressable>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>What is your gender?</Text>
        <View style={styles.genderContainer}>
          {GENDER_OPTIONS.map((gender) => (
            <Pressable
              key={gender}
              onPress={() => send({ type: 'SAVE_GENDER', gender })}
              style={[
                styles.genderButton,
                gender === selectedGender && styles.selectedGenderButton,
              ]}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === selectedGender && styles.selectedGenderText,
                ]}
              >{gender}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={hanldePressNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    padding: 16,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    flexWrap: 'nowrap',
    paddingHorizontal: 16,
  },
  genderButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 16,
    padding: 8,
    width: '30%',
  },
  selectedGenderButton: {
    backgroundColor: '#7E37D5',
  },
  selectedGenderText: {
    color: '#FFFFFF',
  },
  genderText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    margin: 16,
    backgroundColor: '#7E37D5',
    borderRadius: 16,
    width: 40,
    padding: 8,
  },
  backButtonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0a7ea4',
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
