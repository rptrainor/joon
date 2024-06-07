import { useNavigation } from 'expo-router';
import {  Text, View } from 'react-native';
import { useEffect } from 'react';

// import { useSend } from '@/contexts/MachineContext';

export default function Home() {
  const navigation = useNavigation();
  // const { send, state } = useSend();


  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>app/index.tsx</Text>
    </View>
  );
}
