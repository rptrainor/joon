import { Text, SafeAreaView, TextInput, View } from 'react-native';
import { useState } from 'react';

import { useSend } from '@/contexts/MachineContext';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { inputs } from '@/styles/inputs';
import { spacing } from '@/styles/spacing';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { useDebounce } from '@/hooks/useDebounce';

export default function NameScreen() {
  const { send, state, handlePressNext } = useSend();
  const [inputValue, setInputValue] = useState(state.context.name);

  const handleNameChange = (text: string) => {
    setInputValue(text);
    debouncedSendName(text);
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
        <PrimaryButton onPress={handlePressNext} disabled={!state.context.name.length}>
        Next
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
