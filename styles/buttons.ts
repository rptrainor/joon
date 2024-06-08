import { StyleSheet } from 'react-native';
import { spacing } from './spacing';
import { colors } from './colors';

export const buttons = StyleSheet.create({
  baseButton: {
    height: spacing.xlarge,
    borderRadius: spacing.large,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: spacing.medium,
    padding: spacing.small,
  },
  baseButtonText: {
    fontSize: spacing.medium,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  primaryButtonText: {
    color: colors.white,
  },
  backButton: {
    marginHorizontal: 16,
    backgroundColor: '#7E37D5',
    borderRadius: 16,
    width: 40,
    padding: 8,
    top: 0,
    left: 0,
  },
});
