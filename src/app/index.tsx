import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { theme } from "@/constant/theme";
import { useAuthStore } from "@/modules/auth";
import { hasCompletedOnboarding } from "@/modules/onboarding/services/onboardingStorage";

export default function SplashScreen() {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const hasNavigated = useRef(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.quad),
    });
    scale.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.back(1.2)),
    });
  }, [opacity, scale]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const handleAnimationFinish = useCallback(() => {
    setAnimationDone(true);
  }, []);

  useEffect(() => {
    // Waiting on `hasHydrated` is what keeps a signed-in user out of the login
    // screen: the token is read from SecureStore asynchronously, so before
    // hydration `isAuthenticated` is always false.
    if (!animationDone || !hasHydrated || hasNavigated.current) return;
    hasNavigated.current = true;

    (async () => {
      if (!(await hasCompletedOnboarding())) {
        router.replace("/onboarding");
      } else if (!isAuthenticated) {
        router.replace("/(auth)/authentication");
      } else {
        router.replace("/(tabs)");
      }
    })();
  }, [animationDone, hasHydrated, isAuthenticated, router]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, containerStyle]}>
        <LottieView
          source={require("@/assets/animations/student.json")}
          autoPlay
          loop={false}
          onAnimationFinish={handleAnimationFinish}
          style={styles.animation}
        />

        <View style={styles.brand}>
          <Text style={styles.title}>Mneme</Text>
          <Text style={styles.subtitle}>Your knowledge library</Text>
        </View>
      </Animated.View>
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
  },
  animation: {
    width: 380,
    height: 380,
  },
  brand: {
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  title: {
    color: theme.color.text,
    fontSize: theme.fontSize.display,
    fontWeight: "800",
    letterSpacing: -1,
  },
  subtitle: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.lg,
    marginTop: theme.spacing.sm,
  },
});
