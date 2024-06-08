import { Text, StyleSheet, SafeAreaView, Pressable, View, FlatList } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { useSend } from '@/contexts/MachineContext';

const Item = ({ name }: { name: string }) => (
  <View style={styles.nameContainer}>
    <Text style={styles.nameText}>{name}</Text>
  </View>
);

export default function ChildrenNamesScreen() {
  const { send, state } = useSend();

  const handleBackButtonPress = () => {
    send({ type: 'BACK_SCREEN' });
  };

  const handlePressNext = () => {
    send({ type: 'NEXT_SCREEN' });
  };

  const handleAddChild = () => {
    router.navigate('add-child');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBackButtonPress} style={styles.backButton}>
        <FontAwesome6 name="chevron-left" style={styles.backButtonIcon} />
      </Pressable>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Add your children</Text>
        {state.context.childrenNames && state.context.childrenNames.length > 0 ? (
          <FlatList
            style={styles.list}
            data={state.context.childrenNames}
            renderItem={({ item }) => <Item name={item} />}
            keyExtractor={(item) => item}
          />
        ) : null}
        <Pressable onPress={handleAddChild} style={[styles.baseButton, styles.modalTriggerButton]}>
          <FontAwesome6 name="plus" size={18} color="#7E37D5" />
          <Text style={[styles.baseButtonText, styles.modalTriggerButtonText]}>Add Child</Text>
        </Pressable>
      </View>
      <Pressable onPress={handlePressNext} style={[styles.baseButton, styles.button]}>
        <Text style={[styles.baseButtonText, styles.buttonText]}>Done</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    height: 64,
    margin: 12,
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  baseButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  nameContainer: {
    backgroundColor: '#E6E6E6',
    height: 64,
    margin: 12,
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  nameText: {
    color: '#333333',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
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
  },
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
    paddingHorizontal: 16,
  },
  backButton: {
    margin: 16,
    backgroundColor: '#7E37D5',
    borderRadius: 16,
    width: 40,
    padding: 8,
  },
  backButtonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0a7ea4',
  },
  buttonText: {
    color: 'white',
  },
});
