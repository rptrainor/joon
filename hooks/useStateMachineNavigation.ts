import { useEffect } from 'react';
import { router } from 'expo-router';

import { useSend } from '@/contexts/MachineContext';

export type RootStackParamList = {
  NameScreen: undefined;
  GenderScreen: undefined;
  ChildrenNamesScreen: undefined;
  LoginDetailsScreen: undefined;
};

export const useStateMachineNavigation = () => {
  const { state } = useSend();

  useEffect(() => {
    const navigateOnMount = () => {
      switch (state.value) {
        case 'NAME_SCREEN':
          router.navigate('(auth)');
          break;
        case 'GENDER_SCREEN':
          router.navigate('(auth)/gender-screen');
          break;
        case 'CHILDREN_NAMES_SCREEN':
          router.navigate('(auth)/children-names-screen');
          break;
        case 'LOGIN_DETAILS_SCREEN':
          router.navigate('(auth)/login-details-screen');
          break;
        default:
          break;
      }
    };

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(navigateOnMount);
    }
  }, [state.value]);
};
