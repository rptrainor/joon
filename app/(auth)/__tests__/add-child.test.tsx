import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import AddChildScreen from '@/app/(auth)/add-child';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { MachineContextProvider } from '@/contexts/__mocks__/MachineContextProvider';

jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/components/Buttons/PrimaryButton', () => 'PrimaryButton');

jest.useFakeTimers();

describe('AddChildScreen Component', () => {
  let mockGoBack: jest.Mock;

  beforeEach(() => {
    mockGoBack = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
    });

    (useLocalSearchParams as jest.Mock).mockReturnValue({
      index: '0',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial state values', () => {
    render(
      <MachineContextProvider>
        <AddChildScreen />
      </MachineContextProvider>
    );
    expect(screen.getByText('Add Child')).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter child's name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter child's name").props.value).toBe('Alice');
  });

  test('updates the input field and verifies state change', () => {
    render(
      <MachineContextProvider>
        <AddChildScreen />
      </MachineContextProvider>
    );
    const input = screen.getByPlaceholderText("Enter child's name");

    fireEvent.changeText(input, 'Bob');
    expect(input.props.value).toBe('Bob');
  });

  test('handles the add child action', () => {
    render(
      <MachineContextProvider>
        <AddChildScreen />
      </MachineContextProvider>
    );
    const input = screen.getByPlaceholderText("Enter child's name");
    const button = screen.getByTestId('add-child-button');

    fireEvent.changeText(input, 'Bob');
    fireEvent.press(button);
    expect(input.props.value).toBe('Bob');
  });

  test('handles the cancel action', () => {
    render(
      <MachineContextProvider>
        <AddChildScreen />
      </MachineContextProvider>
    );
    const cancelButton = screen.getByText('Cancel');

    fireEvent.press(cancelButton);
    expect(mockGoBack).toHaveBeenCalled();
  });
});
