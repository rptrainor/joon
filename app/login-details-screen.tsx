import { useNavigation } from 'expo-router';
import { Text, StyleSheet, SafeAreaView, TextInput, Pressable } from 'react-native';
import { useEffect } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useSend } from '@/contexts/MachineContext';

export default function LoginDetailsScreen() {
  const navigation = useNavigation();
  const { send, state } = useSend();


  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={() => send({ type: 'BACK_SCREEN' })}>
        <FontAwesome5 name="chevron-left" size={24} color="black" />
      </Pressable>
      <Text>app/login-details-screen.tsx</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => send({ type: 'SAVE_NAME', name: text })}
        value={state.context.name}
      />
      <Pressable onPress={() => send({ type: 'NEXT_SCREEN' })}>
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
