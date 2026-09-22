import { useCallback } from "react";
import { theme } from "@/constant/theme";
import { useUpdateProfile, type ProfileForm } from "@/modules/auth";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { profileSchema } from "@/modules/auth/types/auth.type";

export default function CompleteProfile() {
  const router = useRouter();
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: { firstName: "", lastName: "" },
  });

  const onSubmit = useCallback(
    (data: ProfileForm) => {
      if (isPending) return;

      updateProfile(
        {
          name: data.firstName.trim(),
          lastName: data.lastName?.trim() || undefined,
        },
        { onSuccess: () => router.replace("/(tabs)") },
      );
    },
    [isPending, updateProfile, router],
  );

  const handleSkip = useCallback(() => {
    router.replace("/(tabs)");
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.heading}>You{"'"}re verified!</Text>
          <Text style={styles.subtitle}>
            A couple details before you start
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View>
                <TextInput
                  style={[styles.input, error && styles.inputError]}
                  placeholder="First name"
                  placeholderTextColor={theme.color.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  textContentType="givenName"
                />
                {error && <Text style={styles.fieldError}>{error.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View>
                <TextInput
                  style={[styles.input, error && styles.inputError]}
                  placeholder="Last name (optional)"
                  placeholderTextColor={theme.color.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  textContentType="familyName"
                />
                {error && <Text style={styles.fieldError}>{error.message}</Text>}
              </View>
            )}
          />
        </View>

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
            <Text style={styles.buttonText}>Get Started</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    textAlign: "center",
  },
  form: {
    gap: 16,
    marginBottom: 24,
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
  skipButton: {
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 8,
  },
  skipText: {
    color: theme.color.textSecondary,
    fontSize: 16,
    fontWeight: "500",
  },
});
