// app/(auth)/__tests__/add-child.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import AddChildScreen from '@/app/(auth)/add-child';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { MachineContextProvider } from '@/contexts/__mocks__/MachineContextProvider';

// Mock the useNavigation and useLocalSearchParams hooks from 'expo-router'
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
    const { debug } = render(
      <MachineContextProvider>
        <AddChildScreen />
      </MachineContextProvider>
    );
    debug(); // This will print the rendered output to the console
    expect(screen.getByText('Add Child')).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter child's name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter child's name").props.value).toBe('Alice');
  });

  test('updates the input field and verifies state change', async () => {
    render(
      <MachineContextProvider>
        <AddChildScreen />
      </MachineContextProvider>
    );
    const input = screen.getByPlaceholderText("Enter child's name");

    fireEvent.changeText(input, 'Bob');
    expect(input.props.value).toBe('Bob');
  });

  test('handles the cancel action', async () => {
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
