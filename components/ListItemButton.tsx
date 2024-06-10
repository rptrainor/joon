import { View, Text, Pressable, PressableProps } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { inputs } from '@/styles/inputs';
import { spacing } from '@/styles/spacing';
import { buttons } from '@/styles/buttons';
import { typography } from '@/styles/typography';

const ListItemButton: React.FC<React.PropsWithChildren<PressableProps>> = (props) => {
  return (
    <View style={[inputs.baseInput, { marginBottom: spacing.small, justifyContent: 'space-between', height: 'auto', minHeight: spacing.xlarge }]}>
      <Text style={[inputs.baseButtonText, { textAlign: 'left' }]}>{props.children}</Text>
      <Pressable {...props} style={[buttons.backButton, { padding: 3, borderRadius: 32, height: 32, width: 32, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }]}>
        <FontAwesome6 name="edit" style={[typography.backButtonIcon, { fontSize: 16 }]} />
      </Pressable>
    </View >
  )
};

export default ListItemButton;