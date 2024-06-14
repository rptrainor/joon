import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { FC, PropsWithChildren } from "react";
import { Text, StyleSheet, TextProps } from "react-native";

const ErrorMessage: FC<TextProps & PropsWithChildren> = (props) => {
  return <Text {...props} style={[styles.errorText, props.style]}>{props.children}</Text>;
}

export default ErrorMessage;

const styles = StyleSheet.create({
  errorText: {
    fontSize: spacing.small,
    fontWeight: 'bold',
    color: colors.utility_danger_shade,
    marginTop: -spacing.small,
  },
});