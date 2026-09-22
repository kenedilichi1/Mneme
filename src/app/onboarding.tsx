import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { theme } from "@/constant/theme";
import {
  markOnboardingComplete,
  OnboardingIllustration,
  useOnboarding,
} from "@/modules/onboarding";

export default function OnboardingScreen() {
  const router = useRouter();
  const { currentSlide, slides, isLastSlide, goToNext } = useOnboarding();
  const [navigating, setNavigating] = useState(false);

  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);
  const prevSlideRef = useRef(currentSlide);

  useEffect(() => {
    if (prevSlideRef.current !== currentSlide) {
      titleOpacity.value = 0;
      titleY.value = 20;
      titleOpacity.value = withTiming(1, { duration: 400 });
      titleY.value = withTiming(0, { duration: 400 });
      prevSlideRef.current = currentSlide;
    }
  }, [currentSlide, titleOpacity, titleY]);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const finishOnboarding = useCallback(async () => {
    if (navigating) return;
    setNavigating(true);
    await markOnboardingComplete();
    // Onboarding hands off to sign-in, not to the app — going straight to
    // /(tabs) would drop an unauthenticated user into the library.
    router.replace("/(auth)/authentication");
  }, [router, navigating]);

  const handleNext = useCallback(() => {
    if (isLastSlide) {
      finishOnboarding();
    } else {
      goToNext();
    }
  }, [isLastSlide, goToNext, finishOnboarding]);

  const slide = slides[currentSlide];

  return (
    <View style={styles.container}>
      <View style={styles.skipContainer}>
        {!isLastSlide && (
          <Pressable
            accessibilityLabel="Skip onboarding"
            accessibilityRole="button"
            hitSlop={12}
            onPress={finishOnboarding}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.content}>
        <OnboardingIllustration
          key={slide.animationType}
          animationType={slide.animationType}
        />

        <Animated.View style={[styles.textContainer, titleAnimatedStyle]}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <View
          accessibilityLabel={`Step ${currentSlide + 1} of ${slides.length}`}
          accessibilityRole="progressbar"
          style={styles.pagination}
        >
          {slides.map((paginationSlide, index) => (
            <View
              key={paginationSlide.id}
              style={[styles.dot, index === currentSlide && styles.dotActive]}
            />
          ))}
        </View>

        <Pressable
          accessibilityLabel={isLastSlide ? "Get started" : "Next slide"}
          accessibilityRole="button"
          accessibilityState={{ disabled: navigating }}
          disabled={navigating}
          onPress={handleNext}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>
            {isLastSlide ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  pressed: {
    opacity: 0.7,
  },
  skipContainer: {
    alignItems: "flex-end",
    paddingTop: 60,
    paddingHorizontal: theme.spacing.xl,
  },
  skipText: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.lg,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xxl,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    color: theme.color.text,
    fontSize: theme.fontSize.xxxl,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.lg,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: theme.spacing.lg,
  },
  footer: {
    paddingHorizontal: theme.spacing.xxl,
    paddingBottom: 60,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: theme.spacing.xxl,
    gap: theme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.color.border,
  },
  dotActive: {
    backgroundColor: theme.color.brand,
    width: 24,
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.color.brand,
    borderRadius: theme.radius.xxxl,
    paddingVertical: theme.spacing.lg + 2,
  },
  buttonText: {
    // Dark label on amber — white would fail contrast.
    color: theme.color.onBrand,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
});
