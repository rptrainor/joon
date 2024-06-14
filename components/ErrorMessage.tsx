import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { FC, PropsWithChildren } from "react";
import { Text, View, StyleSheet } from "react-native";

const ErrorMessage: FC<PropsWithChildren> = (props) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{props.children}</Text>
    </View>
  )
}

export default ErrorMessage;

const styles = StyleSheet.create({
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderWidth: 1,
    borderColor: colors.utility_danger_shade,
    borderRadius: spacing.large,
    backgroundColor: colors.utility_danger_tint,
    width: 'auto',
  },
  errorText: {
    fontSize: spacing.medium,
    fontWeight: 'bold',
    color: colors.utility_danger_shade
  },
});