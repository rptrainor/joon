import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

import { buttons } from "@/styles/buttons";
import { typography } from "@/styles/typography";

interface PrimaryButtonProps extends PressableProps {
  children: React.ReactNode;
}

function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <Pressable {...props} style={[buttons.baseButton, buttons.primaryButton, { opacity: props.disabled ? 0.4 : 1 }]}>
      <Text style={[typography.baseButtonText, typography.buttonText]}>
        {props.children}
      </Text>
    </Pressable>
  );
}

export default PrimaryButton;
