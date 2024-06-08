// app/(auth)/index.tsx
import { useNavigation } from 'expo-router';
import { Text, StyleSheet, SafeAreaView, TextInput, Pressable, View } from 'react-native';
import { useEffect, useState, useCallback, useRef } from 'react';

import { useSend } from '@/contexts/MachineContext';

const useDebounce = (callback: (...args: any) => void, delay: number) => {
  const debounceTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  return useCallback((...args: any) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

export default function NameScreen() {
  const { send, state } = useSend();
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState(state.context.name);

  const handleNameChange = (text: string) => {
    setInputValue(text);
    debouncedSendName(text);
  };

  const handlePressNext = () => {
    send({ type: 'NEXT_SCREEN' });
  };

  const debouncedSendName = useDebounce((text: string) => {
    send({ type: 'SAVE_NAME', name: text });
  }, 300);

  useEffect(() => {
    console.log('index - context', state.context);
    console.log('index - value', state.value);
  }, [state]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    setInputValue(state.context.name);
  }, [state.context.name]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>What is your name?</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleNameChange}
          value={inputValue}
          placeholder='E.g. Kevin'
        />
        <Pressable onPress={handlePressNext} style={styles.button}>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 16,
    fontSize: 18,
    backgroundColor: '#DDDDDD',
    color: 'black',
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
  },
});
