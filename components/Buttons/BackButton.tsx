import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, PressableProps, View } from "react-native";

import { buttons } from "@/styles/buttons";
import { containers } from "@/styles/containers";
import { typography } from "@/styles/typography";

function BackButton(props: PressableProps) {
  return (
    <View style={containers.headerContainer}>
      <Pressable {...props} style={buttons.backButton}>
        <FontAwesome6 name="chevron-left" style={typography.backButtonIcon} />
      </Pressable>
    </View>
  );
}

export default BackButton;