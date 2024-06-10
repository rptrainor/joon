import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Text, SafeAreaView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';

import { useSend } from '@/contexts/MachineContext';
import { spacing } from '@/styles/spacing';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { buttons } from '@/styles/buttons';
import { inputs } from '@/styles/inputs';
import { colors } from '@/styles/colors';

export default function AddChildScreen() {
  const { send, state } = useSend();
  const navigation = useNavigation();
  const { index } = useLocalSearchParams<{ index: string }>();

  const [childName, setChildName] = useState(state.context.childrenNames[parseInt(index ?? '-1')] ?? '');

  const handleAddChild = () => {
    const trimmedChildName = childName.trim();
    if (index === undefined || (trimmedChildName.length === 0 && index === '-1')) {
      navigation.goBack();
      return;
    }
    let updatedChildrenNames = [...state.context.childrenNames];
    if (index === '-1') {
      updatedChildrenNames.push(trimmedChildName);
    } else if (trimmedChildName.length === 0) {
      updatedChildrenNames.splice(parseInt(index), 1);
    } else {
      updatedChildrenNames[parseInt(index)] = trimmedChildName;
    }
    send({ type: 'SAVE_CHILDREN_NAMES', childrenNames: updatedChildrenNames });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={containers.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[containers.innerContainer, { paddingTop: spacing.xlarge }]}>
        <Text style={typography.headerText}>Add Child</Text>
        <TextInput
          style={inputs.baseInput}
          placeholder="Enter child's name"
          value={childName}
          onChangeText={setChildName}
          autoFocus
          placeholderTextColor={colors.placeholder}
          />
        <PrimaryButton onPress={handleAddChild} disabled={!childName.length && index === '-1'}>
          {index === '-1' ? 'Add name' : childName.length > 0 ? 'Change name' : 'Remove name'}
        </PrimaryButton>
        <Pressable onPress={navigation.goBack} style={[buttons.baseButton, buttons.secondaryButton]}>
          <Text style={[typography.baseButtonText, buttons.secondaryButtonText]}>Cancel</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
