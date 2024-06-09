import React, { useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, View, Pressable } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

import { useSend } from '@/contexts/MachineContext';
import { BackButton } from '@/components/Buttons/BackButton';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { inputs } from '@/styles/inputs';
import { useDebounce } from '@/hooks/useDebounce';
import { spacing } from '@/styles/spacing';
import { colors } from '@/styles/colors';
import { buttons } from '@/styles/buttons';

export default function LoginDetailsScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { send, state, handleBackButtonPress, handlePressNext } = useSend();

  const handleEmailChange = (text: string) => {
    setEmail(text);
    debouncedSendEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    debouncedSendPassword(text);
  };

  const debouncedSendEmail = useDebounce((text: string) => {
    send({ type: 'SAVE_EMAIL', email: text });
  }, 300);

  const debouncedSendPassword = useDebounce((text: string) => {
    send({ type: 'SAVE_PASSWORD', password: text });
  }, 300);

  useEffect(() => {
    console.log(state.context.email, state.context.password);
  }, [state.context.email, state.context.password]);

  return (
    <SafeAreaView style={[containers.container]}>
      <BackButton onPress={handleBackButtonPress} />
      <View style={containers.innerContainer}>
        <Text style={typography.headerText}>Create your account</Text>

        <View style={styles.inputGroupContainer}>
          <Text style={typography.baseButtonText}>Email</Text>
          <View style={inputs.baseInput}>
            <Foundation name="mail" style={styles.inputIcon} color={colors.darkGray} />
            <TextInput
              aria-label='email'
              keyboardAppearance='light'
              enablesReturnKeyAutomatically
              style={inputs.baseInput}
              onChangeText={handleEmailChange}
              value={email}

              placeholder='email@example.com'
            />
          </View>
        </View>


        <View style={styles.inputGroupContainer}>
          <Text style={typography.baseButtonText}>Password</Text>
          <View style={inputs.baseInput}>
            <Foundation name="unlock" style={styles.inputIcon} color={colors.darkGray} />
            <TextInput
              aria-label='password'
              enablesReturnKeyAutomatically
              style={inputs.baseInput}
              onChangeText={handlePasswordChange}
              value={password}
              placeholder='email@example.com'
            />
          </View>
        </View>

        <Pressable onPress={handlePressNext} style={{ borderRadius: spacing.large, opacity: !state.context.email.length || !state.context.password.length ? 0.4 : 1 }}>
          <View style={styles.submitButton}>
            <Text style={[typography.baseButtonText, typography.buttonText, styles.submitButtonText]}>
              Sign up
            </Text>
          </View>
          <View style={styles.submitButtonIcon}>
            <FontAwesome6 name="play" size={24} style={[typography.baseButtonText, typography.buttonText]} />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: spacing.small,
  },
  inputIcon: {
    fontSize: spacing.medium,
    color: colors.darkGray,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: spacing.small,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: spacing.large,
    height: spacing.xlarge,
  },
  submitButtonText: {
    flexGrow: 1,
  },
  submitButtonIcon: {
    backgroundColor: colors.secondaryDark,
    minHeight: spacing.xlarge,
    minWidth: spacing.xlarge,
    borderRadius: spacing.xlarge,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 0,
    position: 'absolute',
    right: 0,
  }
});
