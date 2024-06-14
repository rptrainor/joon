import { FC, PropsWithChildren } from "react";
import { Pressable, PressableProps, Text } from "react-native";

import { buttons } from "@/styles/buttons";
import { typography } from "@/styles/typography";

const PrimaryButton: FC<PressableProps & PropsWithChildren> = (props) => {
  return (
    <Pressable {...props} style={[buttons.baseButton, buttons.primaryButton, { opacity: props.disabled ? 0.4 : 1 }]}>
      <Text style={[typography.baseButtonText, typography.buttonText]}>
        {props.children}
      </Text>
    </Pressable>
  );
}

export default PrimaryButton;
