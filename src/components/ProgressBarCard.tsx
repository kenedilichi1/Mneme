import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { theme } from "@/constant/theme";
import { usePressScale } from "@/hooks/usePressScale";

type ProgressBarCardProps = {
  readonly title?: string;
  readonly progress?: number;
  readonly onPress?: () => void;
};

export default function ProgressBarCard({
  title = "Understanding replication",
  progress = 33,
  onPress,
}: ProgressBarCardProps) {
  const press = usePressScale();
  const fill = useSharedValue(0);

  const safeProgress = Math.max(0, Math.min(100, progress));

  useEffect(() => {
    fill.value = withTiming(safeProgress, { duration: 650 });
  }, [fill, safeProgress]);

  // Reanimated drives this on the UI thread. The previous legacy `Animated`
  // version used `useNativeDriver: false`, animating layout on the JS thread.
  const fillStyle = useAnimatedStyle(() => ({
    width: `${fill.value}%`,
  }));

  return (
    <Pressable
      accessibilityRole={onPress ? "button" : undefined}
      onPress={onPress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      style={styles.touchWrapper}
    >
      <Animated.View style={[styles.cardContainer, press.style]}>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>

        <View
          accessibilityRole="progressbar"
          accessibilityValue={{
            min: 0,
            max: 100,
            now: safeProgress,
            text: `${safeProgress}% complete`,
          }}
          style={styles.progressBarTrack}
        >
          <Animated.View style={[styles.progressBarFill, fillStyle]} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touchWrapper: {
    marginVertical: theme.spacing.sm,
  },
  cardContainer: {
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: theme.radius.xxxl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl + 4,
    paddingHorizontal: theme.spacing.xl,
    justifyContent: "center",
  },
  titleText: {
    color: theme.color.text,
    fontSize: theme.fontSize.xxl,
    fontWeight: "700",
    letterSpacing: -0.3,
    marginBottom: theme.spacing.lg,
  },
  progressBarTrack: {
    height: 12,
    width: "100%",
    backgroundColor: theme.color.surface,
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: theme.color.brand,
    borderRadius: 6,
  },
});
