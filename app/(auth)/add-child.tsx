import { useNavigation } from 'expo-router';
import { Text, SafeAreaView, TextInput, Pressable, View } from 'react-native';
import { useState } from 'react';
import { useSend } from '@/contexts/MachineContext';
import { spacing } from '@/styles/spacing';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { buttons } from '@/styles/buttons';
import { inputs } from '@/styles/inputs';

export default function AddChildScreen() {
  const { send, state } = useSend();
  const navigation = useNavigation();
  const [childName, setChildName] = useState('');

  const handleAddChild = () => {
    console.log('handleAddChild', childName);
    if (childName.length === 0) {
      navigation.goBack();
      return;
    }
    send({ type: 'SAVE_CHILDREN_NAMES', childrenNames: [...state.context.childrenNames, childName] });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={containers.container}>
      <View style={[containers.innerContainer, { paddingTop: spacing.xlarge }]}>
        <Text style={typography.headerText}>Add Child</Text>
        <TextInput
          style={inputs.baseInput}
          placeholder="Enter child's name"
          value={childName}
          onChangeText={setChildName}
          autoFocus
        />
        <PrimaryButton onPress={handleAddChild} disabled={!childName.length}>
          Add
        </PrimaryButton>
        <Pressable onPress={navigation.goBack} style={[buttons.baseButton, buttons.secondaryButton]}>
          <Text style={[typography.baseButtonText, buttons.secondaryButtonText]}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
