import { Text, StyleSheet, SafeAreaView, Pressable, View, FlatList } from 'react-native';
import { useState, type ReactNode } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { z } from 'zod';

import { containers } from '@/styles/containers';
import BackButton from '@/components/Buttons/BackButton';
import { colors } from '@/styles/colors';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { typography } from '@/styles/typography';
import { buttons } from '@/styles/buttons';
import ListItemButton from '@/components/ListItemButton';
import { useCreateAccountStore } from '@/stores/createAccountStore';
import ErrorMessage from '@/components/ErrorMessage';

const childrenNamesSchema = z.array(z.string().min(1)).min(1, { message: "Please add at least one child" });

export default function ChildrenNamesScreen(): ReactNode {
  const [childrenNames] = useCreateAccountStore((state) => [state.childrenNames, state.setChildrenNames]);
  const [error, setError] = useState<string | null>(null);

  const handleAddChild = ({ index }: { index: number }) => {
    setError(null);
    router.navigate(`add-child?index=${index}`);
  };

  const handleNext = () => {
    try {
      childrenNamesSchema.parse(childrenNames);
      setError(null);
      router.navigate('(auth)/login-details-screen');
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
    }
  };

  return (
    <SafeAreaView style={containers.container}>
      <BackButton onPress={router.back} testID='back-button' />
      <View style={containers.innerContainer}>
        <Text style={typography.headerText}>Add your children</Text>
        {childrenNames.length > 0 ? (
          <FlatList
            style={{ maxHeight: '50%' }}
            data={childrenNames}
            renderItem={({ item, index }) => (
              <ListItemButton onPress={() => handleAddChild({ index: index })}>{item}</ListItemButton>
            )}
            keyExtractor={(item) => item}
          />
        ) : null}
        <Pressable onPress={() => handleAddChild({ index: -1 })} style={[buttons.baseButton, styles.modalTriggerButton]}>
          <FontAwesome6 name="plus" size={18} color={colors.secondary} />
          <Text style={[typography.baseButtonText, styles.modalTriggerButtonText]}>{`Add ${childrenNames.length > 0 ? 'another child' : 'a child'}`}</Text>
        </Pressable>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <PrimaryButton onPress={handleNext} testID='next-button'>
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
