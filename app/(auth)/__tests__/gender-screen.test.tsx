import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import GenderScreen, { GENDER_OPTIONS } from '@/app/(auth)/gender-screen';
import { useCreateAccountStore } from '@/stores/createAccountStore';
import { router } from 'expo-router';

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
    back: jest.fn(),
  },
}));

jest.mock('@/components/Buttons/BackButton', () => 'BackButton');
jest.mock('@/components/Buttons/PrimaryButton', () => 'PrimaryButton');

describe('GenderScreen Component', () => {
  beforeEach(() => {
    // Mock the initial state of the Zustand store
    useCreateAccountStore.setState({
      gender: undefined,
      setGender: (gender) => useCreateAccountStore.setState({ gender }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial state values', () => {
    render(<GenderScreen />);
    expect(screen.getByText('What is your gender?')).toBeTruthy();
    GENDER_OPTIONS.forEach(genderOption => {
      expect(screen.getByText(genderOption)).toBeTruthy();
    });
  });

  test('updates the gender state when a gender option is selected', () => {
    render(<GenderScreen />);
    const maleButton = screen.getByText('male');
    
    fireEvent.press(maleButton);
    
    const state = useCreateAccountStore.getState();
    expect(state.gender).toBe('male');
  });

  test('handles the next button press action', () => {
    useCreateAccountStore.setState({ gender: 'male' });
    render(<GenderScreen />);
    
    const nextButton = screen.getByTestId('next-button');
    fireEvent.press(nextButton);
    
    expect(router.navigate).toHaveBeenCalledWith('(auth)/children-names-screen');
  });

  test('disables the next button when no gender is selected', () => {
    render(<GenderScreen />);
    
    const nextButton = screen.getByTestId('next-button');
    expect(nextButton.props.disabled).toBeTruthy();
  });

  test('enables the next button when a gender is selected', () => {
    useCreateAccountStore.setState({ gender: 'male' });
    render(<GenderScreen />);
    
    const nextButton = screen.getByTestId('next-button');
    expect(nextButton.props.disabled).toBeFalsy();
  });

  test('handles the back button press action', () => {
    render(<GenderScreen />);
    
    const backButton = screen.getByTestId('back-button');
    fireEvent.press(backButton);
    
    expect(router.back).toHaveBeenCalled();
  });
});
