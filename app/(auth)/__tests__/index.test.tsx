import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import NameScreen from '@/app/(auth)/index';
import { useCreateAccountStore } from '@/stores/createAccountStore';
import { router } from 'expo-router';

jest.mock('@/components/Buttons/PrimaryButton', () => 'PrimaryButton');

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

jest.useFakeTimers();

describe('NameScreen Component', () => {
  beforeEach(() => {
    // Mock the Zustand store's initial state and setName function
    useCreateAccountStore.setState({
      name: '',
      setName: (name) => useCreateAccountStore.setState({ name }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial state values', () => {
    render(<NameScreen />);
    expect(screen.getByText('What is your name?')).toBeTruthy();
    expect(screen.getByPlaceholderText('E.g. Kevin')).toBeTruthy();
  });

  test('updates the input field and verifies state change', async () => {
    render(<NameScreen />);
    const input = screen.getByPlaceholderText('E.g. Kevin');

    fireEvent.changeText(input, 'John Doe');
    expect(input.props.value).toBe('John Doe');

    await waitFor(() => {
      const state = useCreateAccountStore.getState();
      expect(state.name).toBe('John Doe');
    });
  });

  test('displays error message when input is invalid', async () => {
    render(<NameScreen />);
    const input = screen.getByPlaceholderText('E.g. Kevin');

    fireEvent.changeText(input, '');
    const button = screen.getByTestId('next-button');
    fireEvent.press(button);

    expect(screen.getByText('Please enter a name')).toBeTruthy();
  });

  test('enables the button when input is valid', async () => {
    useCreateAccountStore.setState({ name: 'John Doe' });
    render(<NameScreen />);
    const button = screen.getByTestId('next-button');
    expect(button.props.disabled).toBeFalsy();
  });

  test('calls router.navigate function when button is pressed', async () => {
    useCreateAccountStore.setState({ name: 'John Doe' });
    render(<NameScreen />);
    const button = screen.getByTestId('next-button');

    fireEvent.press(button);

    expect(router.navigate).toHaveBeenCalledWith('(auth)/gender-screen');
  });
});
