import React, { createContext, useContext, ReactNode } from 'react';
import { useMachine } from '@xstate/react';

import { machine } from '@/machines/create_account_machine';

const SendContext = createContext<{ state: any, send: any, handleBackButtonPress: () => void, handlePressNext: () => void } | undefined>(undefined);

interface MachineProviderProps {
  children: ReactNode;
}

export const MachineProvider: React.FC<MachineProviderProps> = ({ children }) => {
  const [state, send] = useMachine(machine);

  const handleBackButtonPress = () => {
    send({ type: 'BACK_SCREEN' });
  };

  const handlePressNext = () => {
    send({ type: 'NEXT_SCREEN' });
  };
  return (
    <SendContext.Provider value={{ state, send, handleBackButtonPress, handlePressNext }}>
      {children}
    </SendContext.Provider>
  );
};

export const useSend = () => {
  const context = useContext(SendContext);
  if (context === undefined) {
    throw new Error('useSend must be used within a SendProvider');
  }
  return context;
};
