import { Text, SafeAreaView, TextInput, Pressable, View } from 'react-native';
import { useState, useCallback, useRef } from 'react';

import { useSend } from '@/contexts/MachineContext';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { buttons } from '@/styles/buttons';
import { inputs } from '@/styles/inputs';
import { spacing } from '@/styles/spacing';

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

  return (
    <SafeAreaView style={[containers.container]}>
      <View style={[containers.innerContainer, { paddingTop: spacing.xlarge }]}>
        <Text style={typography.headerText}>What is your name?</Text>
        <TextInput
          style={inputs.baseInput}
          onChangeText={handleNameChange}
          value={inputValue}
          placeholder='E.g. Kevin'
        />
        <Pressable onPress={handlePressNext} style={[buttons.baseButton, buttons.primaryButton]}>
          <Text style={[buttons.baseButtonText, buttons.primaryButtonText]}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
