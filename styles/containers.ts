import { StyleSheet } from 'react-native';
import { spacing } from './spacing';

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
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '20%',
    paddingHorizontal: spacing.medium,
    gap: spacing.medium,
  },
});
