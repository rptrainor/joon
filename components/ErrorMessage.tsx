import type { FC, PropsWithChildren, ReactNode } from "react";
import { Text, StyleSheet, TextProps } from "react-native";

import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";

const ErrorMessage: FC<TextProps & PropsWithChildren> = (props): ReactNode => {
  return <Text {...props} style={[styles.errorText, props.style]}>{props.children}</Text>;
}

export default ErrorMessage;

const styles = StyleSheet.create({
  errorText: {
    fontSize: spacing.small,
    fontWeight: 'bold',
    color: colors.utility_danger_shade,
    marginTop: -spacing.small,
    paddingTop: 2
  },
});