import { Text, StyleSheet, SafeAreaView, TextInput, Pressable } from 'react-native';

import { useSend } from '@/contexts/MachineContext';
import { BackButton } from '@/components/Buttons/BackButton';

export default function LoginDetailsScreen() {
  const { send, state, handleBackButtonPress, handlePressNext } = useSend();


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BackButton onPress={handleBackButtonPress} />
      <Text>app/login-details-screen.tsx</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => send({ type: 'SAVE_NAME', name: text })}
        value={state.context.name}
      />
      <Pressable onPress={handlePressNext}>
        <Text>I'm pressable!</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
