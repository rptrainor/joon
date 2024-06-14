import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ChildrenNamesScreen from '@/app/(auth)/children-names-screen';
import { router } from 'expo-router';
import { useCreateAccountStore } from '@/stores/createAccountStore';

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
    back: jest.fn(),
  },
}));

jest.mock('@/components/Buttons/BackButton', () => 'BackButton');
jest.mock('@/components/Buttons/PrimaryButton', () => 'PrimaryButton');
jest.mock('@/components/ListItemButton', () => 'ListItemButton');

describe('ChildrenNamesScreen Component', () => {
  beforeEach(() => {
    // Mock the initial state of the Zustand store
    useCreateAccountStore.setState({
      childrenNames: ['Alice'],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial state values', () => {
    render(<ChildrenNamesScreen />);
    expect(screen.getByText('Add your children')).toBeTruthy();
    expect(screen.getByText('Add another child')).toBeTruthy();
  });

  test('handles the add child action', () => {
    render(<ChildrenNamesScreen />);
    const addButton = screen.getByText('Add another child');
    fireEvent.press(addButton);
    expect(router.navigate).toHaveBeenCalledWith('add-child?index=-1');
  });

  test('handles the back button press action', () => {
    render(<ChildrenNamesScreen />);
    const backButton = screen.getByTestId('back-button');
    fireEvent.press(backButton);
    expect(router.back).toHaveBeenCalled();
  });

  test('handles the next button press action', () => {
    render(<ChildrenNamesScreen />);
    const nextButton = screen.getByTestId('next-button');
    fireEvent.press(nextButton);
    expect(router.navigate).toHaveBeenCalledWith('(auth)/login-details-screen');
  });
});
