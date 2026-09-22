import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { theme } from "@/constant/theme";
import { useResendCooldown } from "../hooks/useResendCooldown";
import { useRequestOtp, useVerifyOtp } from "../hooks/useOtp";
import OtpCodeInput from "./OtpCodeInput";

const RESEND_COOLDOWN_SECONDS = 45;

export default function VerifyOtpScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const {
    mutate: verifyOtp,
    isPending: verifying,
    error: verifyError,
  } = useVerifyOtp();
  const { mutate: resendOtp, isPending: resending } = useRequestOtp();
  const { remaining, isCoolingDown, restart } = useResendCooldown(
    RESEND_COOLDOWN_SECONDS,
  );

  const submitCode = useCallback(
    (otp: string) => {
      if (!email || verifying) return;

      verifyOtp(
        { email, otp },
        {
          onSuccess: (data) => {
            if (data.isNewUser) {
              router.replace("/(auth)/complete-profile");
            } else {
              router.replace("/(tabs)");
            }
          },
        },
      );
    },
    [email, verifyOtp, verifying],
  );

  const handleResend = useCallback(() => {
    if (!email || isCoolingDown || resending) return;
    resendOtp({ email }, { onSuccess: restart });
  }, [email, isCoolingDown, resending, resendOtp, restart]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.heading}>Check your email</Text>
          <Text style={styles.subtitle}>
            {"We sent a code to\n"}
            <Text style={styles.email}>{email}</Text>
          </Text>
        </View>

        <OtpCodeInput onComplete={submitCode} />

        {verifyError && (
          <Text style={styles.errorText}>{verifyError.message}</Text>
        )}

        {verifying && (
          <ActivityIndicator
            size="small"
            color={theme.color.brand}
            style={styles.loader}
          />
        )}

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>{"Didn't get it? "}</Text>
          {isCoolingDown ? (
            <Text style={styles.resendTimer}>Resend code ({remaining}s)</Text>
          ) : (
            <TouchableOpacity onPress={handleResend} disabled={resending}>
              <Text style={styles.resendLink}>
                {resending ? "Sending..." : "Resend code"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    color: theme.color.textSecondary,
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
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
    marginBottom: 12,
  },
  subtitle: {
    color: theme.color.textSecondary,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  email: {
    color: theme.color.text,
    fontWeight: "600",
  },
  errorText: {
    color: theme.color.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  loader: {
    marginBottom: 16,
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendText: {
    color: theme.color.textSecondary,
    fontSize: 14,
  },
  resendTimer: {
    color: theme.color.textSecondary,
    fontSize: 14,
    opacity: 0.6,
  },
  resendLink: {
    color: theme.color.brand,
    fontSize: 14,
    fontWeight: "600",
  },
});
