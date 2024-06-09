import { Text, StyleSheet, SafeAreaView, Pressable, View, FlatList } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';

import { useSend } from '@/contexts/MachineContext';
import { containers } from '@/styles/containers';
import { BackButton } from '@/components/Buttons/BackButton';
import { colors } from '@/styles/colors';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { typography } from '@/styles/typography';
import { buttons } from '@/styles/buttons';
import { spacing } from '@/styles/spacing';
import { inputs } from '@/styles/inputs';

const Item = ({ name }: { name: string }) => (
  <View style={[inputs.baseInput, { marginBottom: spacing.small, justifyContent: 'flex-start', height: 'auto', minHeight: spacing.xlarge }]}>
    <Text style={[inputs.baseButtonText, { textAlign: 'left' }]}>{name}</Text>
  </View>
);

export default function ChildrenNamesScreen() {
  const { state, handlePressNext, handleBackButtonPress } = useSend();

  const handleAddChild = () => {
    router.navigate('add-child');
  };

  return (
    <SafeAreaView style={containers.container}>
      <BackButton onPress={handleBackButtonPress} />
      <View style={containers.innerContainer}>
        <Text style={typography.headerText}>Add your children</Text>
        {state.context.childrenNames && state.context.childrenNames.length > 0 ? (
          <FlatList
            style={styles.list}
            data={state.context.childrenNames}
            renderItem={({ item }) => <Item name={item} />}
            keyExtractor={(item) => item}
          />
        ) : null}
        <Pressable onPress={handleAddChild} style={[buttons.baseButton, styles.modalTriggerButton]}>
          <FontAwesome6 name="plus" size={18} color={colors.secondary} />
          <Text style={[typography.baseButtonText, styles.modalTriggerButtonText]}>Add Child</Text>
        </Pressable>
        <PrimaryButton onPress={handlePressNext}>
          Done
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalTriggerButton: {
    gap: 8,
    flexWrap: 'nowrap',
    borderColor: '#7E37D5',
    borderWidth: 1,
  },
  modalTriggerButtonText: {
    color: '#7E37D5',
  },
  list: {
    maxHeight: '50%',
  }
});
