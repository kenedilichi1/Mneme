import { theme } from "@/constant/theme";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { OnboardingSlide } from "../types/onboarding.type";

type OnboardingIllustrationProps = {
  readonly animationType: OnboardingSlide["animationType"];
};

export function OnboardingIllustration({
  animationType,
}: OnboardingIllustrationProps) {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(0);
  const pulse = useSharedValue(1);
  const hasAnimated = useRef(false);

  useEffect(() => {
    scale.value = 0;
    scale.value = withDelay(
      200,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) }),
    );
  }, [animationType, scale]);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    rotate.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
    );

    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
    );
  }, [pulse, rotate]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  // Scales the glyph as one group so its parts stay locked together.
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * pulse.value }],
  }));

  const renderIcon = () => {
    switch (animationType) {
      case "search":
        return (
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <View style={styles.magnifierHandle} />
            <View style={styles.magnifierLens} />
            <View style={styles.magnifierGlint} />
          </Animated.View>
        );
      case "organize":
        return (
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <View style={styles.folderSheet} />
            <View style={styles.folderTab} />
            <View style={styles.folderBody} />
            <View style={styles.folderSeam} />
          </Animated.View>
        );
      case "learn":
        return (
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <View style={styles.bookPageLeft} />
            <View style={styles.bookPageRight} />
            <View style={styles.bookSpine} />
          </Animated.View>
        );
    }
  };

  return (
    <View
      style={styles.illustrationWrapper}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.bgGlow} />
      <Animated.View style={[styles.bgRing, ringStyle]} />
      <View style={styles.iconPlate}>{renderIcon()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  illustrationWrapper: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  bgGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: theme.color.brand,
    opacity: 0.08,
  },
  // Two-tone ring so the 20s rotation actually reads on screen.
  bgRing: {
    position: "absolute",
    width: 176,
    height: 176,
    borderRadius: 88,
    borderWidth: 2,
    borderTopColor: theme.color.brand,
    borderRightColor: theme.color.brand,
    borderBottomColor: theme.color.border,
    borderLeftColor: theme.color.border,
    opacity: 0.45,
  },
  // Mirrors the library icon box (surfaceElevated, radius = 1/4 of the side).
  iconPlate: {
    width: 112,
    height: 112,
    borderRadius: 28,
    backgroundColor: theme.color.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.color.border,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 100,
    height: 100,
  },

  magnifierLens: {
    position: "absolute",
    left: 14,
    top: 14,
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 6,
    borderColor: theme.color.brand,
  },
  magnifierHandle: {
    position: "absolute",
    left: 71,
    top: 59,
    width: 6,
    height: 30,
    borderRadius: 3,
    backgroundColor: theme.color.brand,
    transform: [{ rotate: "45deg" }],
  },
  magnifierGlint: {
    position: "absolute",
    left: 22,
    top: 28,
    width: 16,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.color.brand,
    opacity: 0.5,
    transform: [{ rotate: "-45deg" }],
  },

  folderSheet: {
    position: "absolute",
    left: 46,
    top: 18,
    width: 32,
    height: 24,
    borderRadius: 5,
    backgroundColor: theme.color.brand,
    opacity: 0.25,
  },
  folderTab: {
    position: "absolute",
    left: 12,
    top: 28,
    width: 32,
    height: 14,
    borderWidth: 3,
    borderColor: theme.color.brand,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  folderBody: {
    position: "absolute",
    left: 12,
    top: 40,
    width: 76,
    height: 44,
    borderWidth: 3,
    borderColor: theme.color.brand,
    // Square top-left so the left edge runs straight up into the tab.
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  // Hides the tab/body stroke overlap so the folder reads as one outline.
  folderSeam: {
    position: "absolute",
    left: 15,
    top: 38,
    width: 26,
    height: 6,
    backgroundColor: theme.color.surfaceElevated,
  },

  bookPageLeft: {
    position: "absolute",
    left: 10,
    top: 25,
    width: 38,
    height: 50,
    borderWidth: 3,
    borderColor: theme.color.brand,
    borderRadius: 5,
    transform: [{ rotate: "-7deg" }],
  },
  bookPageRight: {
    position: "absolute",
    left: 52,
    top: 25,
    width: 38,
    height: 50,
    borderWidth: 3,
    borderColor: theme.color.brand,
    borderRadius: 5,
    transform: [{ rotate: "7deg" }],
  },
  bookSpine: {
    position: "absolute",
    left: 47,
    top: 22,
    width: 6,
    height: 56,
    borderRadius: 3,
    backgroundColor: theme.color.brand,
  },
});
