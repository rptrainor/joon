import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, View, Pressable, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useSend } from '@/contexts/MachineContext';
import { BackButton } from '@/components/Buttons/BackButton';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { useDebounce } from '@/hooks/useDebounce';
import { spacing } from '@/styles/spacing';
import { colors } from '@/styles/colors';

export default function LoginDetailsScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
          <View style={styles.inputWithIcon}>
            <Foundation name="mail" style={styles.inputIcon} color={colors.darkGray} />
            <TextInput
              aria-label='email'
              keyboardAppearance='light'
              enablesReturnKeyAutomatically
              style={styles.textInput}
              onChangeText={handleEmailChange}
              value={email}
              placeholder='email@example.com'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputGroupContainer}>
          <Text style={typography.baseButtonText}>Password</Text>
          <View style={styles.inputWithIcon}>
            <Foundation name="unlock" style={styles.inputIcon} color={colors.darkGray} />
            <TextInput
              aria-label='password'
              enablesReturnKeyAutomatically
              style={styles.textInput}
              onChangeText={handlePasswordChange}
              value={password}
              placeholder='Password'
              secureTextEntry={!showPassword}
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome6 name={showPassword ? 'eye-slash' : 'eye'} style={styles.inputIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <Pressable onPress={handlePressNext} style={[styles.submitButton, (!state.context.email.length || !state.context.password.length) && styles.disabledButton]}>
          <Text style={[typography.baseButtonText, typography.buttonText, styles.submitButtonText]}>
            Sign up
          </Text>
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
    marginBottom: spacing.medium,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: spacing.small,
    paddingLeft: spacing.small,
  },
  inputIcon: {
    fontSize: spacing.medium,
    color: colors.darkGray,
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
  },
  textInput: {
    flex: 1,
    height: spacing.xlarge,
    paddingHorizontal: spacing.small,
    fontSize: spacing.medium,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: spacing.large,
    height: spacing.xlarge,
    marginTop: spacing.large,
  },
  disabledButton: {
    opacity: 0.4,
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
  },
});

