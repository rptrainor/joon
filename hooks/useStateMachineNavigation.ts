import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { router } from 'expo-router';

import { useSend } from '@/contexts/MachineContext';

export type RootStackParamList = {
  NameScreen: undefined;
  GenderScreen: undefined;
  ChildrenNamesScreen: undefined;
  LoginDetailsScreen: undefined;
  // HomeScreen: undefined;
  // ErrorScreen: undefined;
};

export const useStateMachineNavigation = () => {
  const { state } = useSend();
  const navigation = useNavigation();

  useEffect(() => {
    switch (state.value) {
      // case 'NAME_SCREEN':
      //   router.navigate('index');
      //   break;
      case 'GENDER_SCREEN':
        router.navigate('gender-screen');
        break;
      case 'CHILDREN_NAMES_SCREEN':
        router.navigate('children-names-screen');
        break;
      case 'LOGIN_DETAILS_SCREEN':
        router.navigate('login-details-screen');
        break;
      // case 'HOME_SCREEN':
      //   navigation.navigate('HomeScreen');
      //   break;
      // case 'ERROR_SCREEN':
      //   navigation.navigate('ErrorScreen');
      //   break;
      default:
        break;
    }
  }, [state.value, navigation]);
};
