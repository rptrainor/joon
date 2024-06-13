import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ChildrenNamesScreen from '@/app/(auth)/children-names-screen';
import { useSend } from '@/contexts/MachineContext';
import { router } from 'expo-router';

jest.mock('@/contexts/MachineContext', () => ({
  useSend: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

jest.mock('@/components/Buttons/BackButton', () => 'BackButton');
jest.mock('@/components/Buttons/PrimaryButton', () => 'PrimaryButton');
jest.mock('@/components/ListItemButton', () => 'ListItemButton');

describe('ChildrenNamesScreen Component', () => {
  let mockHandleBackButtonPress: jest.Mock;
  let mockHandlePressNext: jest.Mock;
  let mockState: { context: { childrenNames: string[] } };

  beforeEach(() => {
    mockHandleBackButtonPress = jest.fn();
    mockHandlePressNext = jest.fn();
    mockState = { context: { childrenNames: [] } };

    (useSend as jest.Mock).mockReturnValue({
      handleBackButtonPress: mockHandleBackButtonPress,
      handlePressNext: mockHandlePressNext,
      state: mockState,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial state values', () => {
    render(<ChildrenNamesScreen />);
    expect(screen.getByText('Add your children')).toBeTruthy();
    expect(screen.getByText('Add a child')).toBeTruthy();
  });

  test('handles the add child action', () => {
    render(<ChildrenNamesScreen />);
    const addButton = screen.getByText('Add a child');
    fireEvent.press(addButton);
    expect(router.navigate).toHaveBeenCalledWith('add-child?index=-1');
  });

  test('handles the back button press action', () => {
    render(<ChildrenNamesScreen />);
    const backButton = screen.getByTestId('back-button');
    fireEvent.press(backButton);
    expect(mockHandleBackButtonPress).toHaveBeenCalled();
  });

  test('handles the next button press action', () => {
    mockState.context.childrenNames = ['Alice'];
    render(<ChildrenNamesScreen />);
    const nextButton = screen.getByTestId('next-button');
    fireEvent.press(nextButton);
    expect(mockHandlePressNext).toHaveBeenCalled();
  });
});
