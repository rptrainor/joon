import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';

export const typography = StyleSheet.create({
  baseButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  nameText: {
    color: colors.text,
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: spacing.medium,
    textAlign: 'center',
  },
  backButtonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
