import { useNavigation } from 'expo-router';
import { Text, StyleSheet, SafeAreaView, TextInput, Pressable, View } from 'react-native';
import { useState } from 'react';
import { useSend } from '@/contexts/MachineContext';

export default function AddChildScreen() {
  const { send, state } = useSend();
  const navigation = useNavigation();
  const [childName, setChildName] = useState('');

  const handleAddChild = () => {
    if (childName.length === 0) {
      navigation.goBack();
      return;
    }
    send({ type: 'SAVE_CHILDREN_NAMES', childrenNames: [...state.context.childrenNames, childName] });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Add Child</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter child's name"
          value={childName}
          onChangeText={setChildName}
        />
        <Pressable onPress={handleAddChild} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
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
    backgroundColor: '#E6E6E6',
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
    fontWeight: 'bold',
  },
});
