// __mocks__/MachineContext.tsx
import React from 'react';
import { SendContext } from '@/contexts/MachineContext';

const mockSend = jest.fn();
const mockState = { context: { childrenNames: ['Alice'] } };
const mockHandleBackButtonPress = jest.fn();
const mockHandlePressNext = jest.fn();

const MachineContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const value = {
    send: mockSend,
    state: mockState,
    handleBackButtonPress: mockHandleBackButtonPress,
    handlePressNext: mockHandlePressNext,
  };

  return <SendContext.Provider value={value}>{children}</SendContext.Provider>;
};

export { MachineContextProvider, mockSend, mockState, mockHandleBackButtonPress, mockHandlePressNext };
