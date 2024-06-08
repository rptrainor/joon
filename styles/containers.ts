import { StyleSheet } from 'react-native';
import { spacing } from './spacing';
import { colors } from './colors';

export const containers = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
  },
  headerContainer: {
    height: spacing.xlarge,
    paddingHorizontal: spacing.medium,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '30%',
    paddingHorizontal: spacing.medium,
    gap: spacing.medium,
  },
});
