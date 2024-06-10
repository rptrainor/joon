import { StyleSheet } from 'react-native';
import { spacing } from './spacing';
import { colors } from './colors';

export const inputs = StyleSheet.create({
  baseInput: {
    backgroundColor: colors.lightGray,
    color: colors.text,
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
    fontWeight: 'bold',
    width: '100%',
  },
  baseButtonText: {
    fontSize: spacing.medium,
    textAlign: 'center',
    fontWeight: 'bold',
  },

});
