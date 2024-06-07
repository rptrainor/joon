import React, { createContext, useContext, ReactNode } from 'react';
import { useMachine } from '@xstate/react';

import { machine } from '@/machines/create_account_machine';

const SendContext = createContext<{ state: any, send: any } | undefined>(undefined);

interface MachineProviderProps {
  children: ReactNode;
}

export const MachineProvider: React.FC<MachineProviderProps> = ({ children }) => {
  const [state, send] = useMachine(machine);

  return (
    <SendContext.Provider value={{ state, send }}>
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
