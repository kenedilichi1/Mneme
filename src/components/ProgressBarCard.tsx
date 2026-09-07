import { theme } from "@/constant/theme";
import { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

interface SectionCardProps {
  readonly title?: string;
  readonly progress?: number;
  readonly onPress?: () => void;
}

export default function PremiumProgressCard({
  title = "Understanding replication",
  progress = 33,
  onPress,
}: SectionCardProps) {
  // Animation drivers
  const [animatedWidth] = useState(() => new Animated.Value(0));
  const [scaleValue] = useState(() => new Animated.Value(1));
  const [opacityValue] = useState(() => new Animated.Value(1));

  // Trigger progress filling animation smoothly on mount
  useEffect(() => {
    // Clamping progress value safely between 0 and 100
    const safeProgress = Math.max(0, Math.min(100, progress));

    Animated.timing(animatedWidth, {
      toValue: safeProgress,
      duration: 650, // Smooth, natural motion timing
      useNativeDriver: false, // Layout properties (width) don't support native driver
    }).start();
  }, [animatedWidth, progress]);

  // Convert animated numbers directly to layouts
  const widthInterpolate = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  // Handle touch physics
  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.touchWrapper}
    >
      <Animated.View
        style={[
          styles.cardContainer,
          { transform: [{ scale: scaleValue }], opacity: opacityValue },
        ]}
      >
        {/* Section Title */}
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>

        {/* Progress Bar Track */}
        <View style={styles.progressBarTrack}>
          {/* Animated Progress Fill */}
          <Animated.View
            style={[styles.progressBarFill, { width: widthInterpolate }]}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touchWrapper: {
    // marginHorizontal: 16,
    marginVertical: 8,
  },
  cardContainer: {
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: 28,
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  titleText: {
    color: theme.color.text,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.3,
    marginBottom: 16,
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
    backgroundColor: theme.color.primary,
    borderRadius: 6,
  },
});
