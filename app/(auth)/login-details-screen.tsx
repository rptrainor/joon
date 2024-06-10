import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, View, Pressable, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import CryptoJS from 'crypto-js';
import z from 'zod';

import { useSend } from '@/contexts/MachineContext';
import { BackButton } from '@/components/Buttons/BackButton';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { useDebounce } from '@/hooks/useDebounce';
import { spacing } from '@/styles/spacing';
import { colors } from '@/styles/colors';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export default function LoginDetailsScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { send, handleBackButtonPress, handlePressNext } = useSend();

  const validateEmail = (text: string) => {
    try {
      loginSchema.parse({ email: text, password });
      setErrors(prevErrors => ({ ...prevErrors, email: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const emailError = error.errors.find(err => err.path.includes('email'))?.message;
        setErrors(prevErrors => ({ ...prevErrors, email: emailError }));
        return false;
      }
    }
  };

  const validatePassword = (text: string) => {
    try {
      loginSchema.parse({ email, password: text });
      setErrors(prevErrors => ({ ...prevErrors, password: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const passwordError = error.errors.find(err => err.path.includes('password'))?.message;
        setErrors(prevErrors => ({ ...prevErrors, password: passwordError }));
        return false;
      }
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text)
    debouncedSendEmail(text)
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text)
    const hashedPassword = CryptoJS.SHA256(text).toString();
    debouncedSendPassword(hashedPassword);
  };

  const debouncedSendEmail = useDebounce((email: string) => {
    send({ type: 'SAVE_EMAIL', email });
  }, 300);

  const debouncedSendPassword = useDebounce((hashedPassword: string) => {
    send({ type: 'SAVE_PASSWORD', password: hashedPassword });
  }, 300);

  const isNextButtonDisabled = !email || !password || !!errors.email || !!errors.password;

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
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

        <Pressable onPress={handlePressNext} style={[styles.submitButton, isNextButtonDisabled && styles.disabledButton]}>
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
  errorText: {
    color: colors.error,
    marginTop: spacing.small,
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
