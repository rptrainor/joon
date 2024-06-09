import { Text, StyleSheet, SafeAreaView, Pressable, View, FlatList } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';

import { containers } from '@/styles/containers';
import { BackButton } from '@/components/Buttons/BackButton';
import { colors } from '@/styles/colors';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { typography } from '@/styles/typography';
import { buttons } from '@/styles/buttons';
import { useSend } from '@/contexts/MachineContext';
import { ListItemButton } from '@/components/ListItemButton';

export default function ChildrenNamesScreen() {
  const { handleBackButtonPress, state, handlePressNext } = useSend();

  const handleAddChild = ({ index }: { index: number }) => {
    router.navigate(`add-child?index=${index}`);
  };

  return (
    <SafeAreaView style={containers.container}>
      <BackButton onPress={handleBackButtonPress} />
      <View style={containers.innerContainer}>
        <Text style={typography.headerText}>Add your children</Text>
        {state.context.childrenNames && state.context.childrenNames.length > 0 ? (
          <FlatList
            style={{ maxHeight: '50%' }}
            data={state.context.childrenNames}
            renderItem={({ item, index }) => (
              <ListItemButton onPress={() => handleAddChild({ index: index })} >{item}</ListItemButton>
            )}
            keyExtractor={(item) => item}
          />
        ) : null}
          <Pressable onPress={() => handleAddChild({ index: -1 })} style={[buttons.baseButton, styles.modalTriggerButton]}>
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
});
