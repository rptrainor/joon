import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, View, Pressable, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import CryptoJS from 'crypto-js';
import z from 'zod';
import { Link, router } from 'expo-router';

import BackButton from '@/components/Buttons/BackButton';
import { containers } from '@/styles/containers';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { colors } from '@/styles/colors';
import { useCreateAccountStore } from '@/stores/createAccountStore';
import ErrorMessage from '@/components/ErrorMessage';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export default function LoginDetailsScreen() {
  const [email, setEmail] = useCreateAccountStore((state) => [state.email, state.setEmail]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = () => {
    //TODO: Implement Create Account
    return
  };

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
    // debouncedSendEmail(text)
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text)
    const hashedPassword = CryptoJS.SHA256(text).toString();
    // debouncedSendPassword(hashedPassword);
  };


  const isNextButtonDisabled = !email || !password || !!errors.email || !!errors.password || !agreeToTerms;

  return (
    <SafeAreaView style={[containers.container]}>
      <BackButton onPress={router.back} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={containers.innerContainer}>
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
              placeholderTextColor={colors.placeholder}
            />
          </View>
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
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
              placeholderTextColor={colors.placeholder}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome6 name={showPassword ? 'eye-slash' : 'eye'} style={styles.inputIcon} />
            </TouchableOpacity>
          </View>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </View>

        <Pressable onPress={handleSubmit} style={[styles.submitButton, isNextButtonDisabled && styles.disabledButton]}>
          <Text style={[typography.baseButtonText, typography.buttonText, styles.submitButtonText]}>
            Sign up
          </Text>
          <View style={styles.submitButtonIcon}>
            <FontAwesome6 name="play" size={12} style={[typography.baseButtonText, typography.buttonText]} />
          </View>
        </Pressable>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: spacing.small }}>
          <TouchableOpacity onPress={() => setAgreeToTerms(!agreeToTerms)} style={[styles.termsButton, agreeToTerms ? styles.checkedTermsIcon : styles.uncheckedTermsIcon]}>
            <FontAwesome6 name="check" style={[styles.termsButtonIconText, agreeToTerms ? styles.checkedTermsIcon : styles.uncheckedTermsIcon]} />
          </TouchableOpacity>
          <View>
            <Text style={styles.termsText}>I've read and accepted</Text>
            <Link href="login-details-screen">
              <Text style={styles.termsLinkText}>Terms of Service and Privacy Policy</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  termsButton: {
    backgroundColor: '#7E37D5',
    borderRadius: spacing.large,
    width: 20,
    padding: 4,
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: colors.secondary
  },
  termsButtonIconText: {
    fontSize: 12,
    textAlign: 'center',
  },
  termsIcon: {
    fontSize: spacing.medium,
    color: colors.white,
    borderRadius: spacing.large,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 0,
    right: 0,
  },
  termsText: {
    fontSize: spacing.small,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  termsLinkText: {
    fontSize: spacing.small,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  checkedTermsIcon: {
    backgroundColor: colors.secondary,
    color: colors.white,

  },
  uncheckedTermsIcon: {
    backgroundColor: colors.background,
    color: colors.text,
  },
  inputGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: spacing.small,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.lightGray,
    borderRadius: spacing.large,
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
    backgroundColor: colors.lightGray,
    borderRadius: spacing.large,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: colors.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: spacing.large,
    height: spacing.xlarge,
    marginTop: spacing.medium,
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
    borderRadius: spacing.large,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 0,
    position: 'absolute',
    right: 0,
  },
});
