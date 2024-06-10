import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import NameScreen from '@/app/(auth)/index';
import { useSend } from '@/contexts/MachineContext';

// Mock the MachineContext
jest.mock('@/contexts/MachineContext', () => ({
  useSend: jest.fn(),
}));

jest.mock('@/components/Buttons/PrimaryButton', () => 'PrimaryButton');

// Mock the useDebounce hook
jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: jest.fn((fn) => fn),
}));

jest.useFakeTimers();

describe('NameScreen Component', () => {
  let mockSend: jest.Mock;
  let mockState: { context: { name: string } };
  let mockHandlePressNext: jest.Mock;

  beforeEach(() => {
    mockSend = jest.fn();
    mockHandlePressNext = jest.fn();
    mockState = { context: { name: '' } };

    (useSend as jest.Mock).mockReturnValue({
      send: mockSend,
      state: mockState,
      handlePressNext: mockHandlePressNext,
    });

    (require('@/hooks/useDebounce') as any).useDebounce.mockImplementation((fn) => fn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial state values', () => {
    render(
      <NameScreen />
    );
    expect(screen.getByText('What is your name?')).toBeTruthy();
    expect(screen.getByPlaceholderText('E.g. Kevin')).toBeTruthy();
  });

  test('updates the input field and verifies state change', async () => {
    render(
      <NameScreen />
    );
    const input = screen.getByPlaceholderText('E.g. Kevin');

    fireEvent.changeText(input, 'John Doe');
    expect(input.props.value).toBe('John Doe');
    await waitFor(() => {
      expect(mockSend).toHaveBeenCalledWith({ type: 'SAVE_NAME', name: 'John Doe' });
    });
  });

  test('disables the button when input is empty', () => {
    render(
      <NameScreen />
    );
    const button = screen.getByTestId('next-button');
    expect(button.props.disabled).toBeTruthy();
  });

  test('enables the button when input is not empty', async () => {
    mockState.context.name = 'John Doe';
    render(
      <NameScreen />
    );
    const button =  screen.getByTestId('next-button');
    expect(button.props.disabled).toBeFalsy();
  });

  test('calls handlePressNext function when button is pressed', async () => {
    mockState.context.name = 'John Doe';
    render(
      <NameScreen />
    );
    const button = screen.getByTestId('next-button');

    fireEvent.press(button);

    expect(mockHandlePressNext).toHaveBeenCalled();
  });
});
