import { useCallback } from "react";
import { theme } from "@/constant/theme";
import { useRequestOtp, type EmailForm } from "@/modules/auth";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { emailSchema } from "@/modules/auth/types/auth.type";

export default function Authentication() {
  const router = useRouter();
  const { mutate: requestOtp, isPending, error } = useRequestOtp();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  const onSubmit = useCallback(
    (data: EmailForm) => {
      if (isPending) return;

      requestOtp(
        { email: data.email.trim() },
        {
          onSuccess: () => {
            router.push({
              pathname: "/(auth)/verifyotp",
              params: { email: data.email.trim() },
            });
          },
        },
      );
    },
    [isPending, requestOtp, router],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.title}>Mneme</Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.heading}>Welcome to Mneme</Text>
          <Text style={styles.subtitle}>
            Enter your email to get started
          </Text>
        </View>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="your@email.com"
                placeholderTextColor={theme.color.textSecondary}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus
                autoComplete="email"
                textContentType="emailAddress"
              />
              {error && <Text style={styles.fieldError}>{error.message}</Text>}
            </View>
          )}
        />

        {error && (
          <Text style={styles.errorText}>{error.message}</Text>
        )}

        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isPending}
          activeOpacity={0.8}
        >
          {isPending ? (
            <ActivityIndicator color={theme.color.onBrand} />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  brand: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    color: theme.color.text,
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -1,
  },
  textBlock: {
    alignItems: "center",
    marginBottom: 40,
  },
  heading: {
    color: theme.color.text,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: theme.color.textSecondary,
    fontSize: 16,
    fontWeight: "400",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: 18,
    borderWidth: 1,
    color: theme.color.text,
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  inputError: {
    borderColor: theme.color.error,
  },
  fieldError: {
    color: theme.color.error,
    fontSize: 13,
    marginTop: 8,
    paddingHorizontal: 24,
  },
  errorText: {
    color: theme.color.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.color.brand,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: theme.color.onBrand,
    fontSize: 18,
    fontWeight: "700",
  },
});
