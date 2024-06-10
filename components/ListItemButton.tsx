import { View, Text, Pressable, PressableProps } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { inputs } from '@/styles/inputs';
import { spacing } from '@/styles/spacing';
import { buttons } from '@/styles/buttons';
import { typography } from '@/styles/typography';

interface ListItemProps extends PressableProps {
  children: React.ReactNode;
};

export const ListItemButton = ({ children, ...rest }: ListItemProps) => {
  return (
    <View style={[inputs.baseInput, { marginBottom: spacing.small, justifyContent: 'space-between', height: 'auto', minHeight: spacing.xlarge }]}>
      <Text style={[inputs.baseButtonText, { textAlign: 'left' }]}>{children}</Text>
      <Pressable {...rest} style={[buttons.backButton, { padding: 3, borderRadius: 32, height: 32, width: 32, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }]}>
        <FontAwesome6 name="edit" style={[typography.backButtonIcon, { fontSize: 16 }]} />
      </Pressable>
    </View >
  )
};
