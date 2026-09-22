import { useCallback } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

/**
 * Shared press-down feedback for card-like Pressables.
 *
 * Replaces the byte-identical scale/opacity blocks that `SearchBar` and
 * `ProgressBarCard` each carried using the legacy `Animated` API. Runs on the
 * UI thread via reanimated, which is what the rest of the app already uses.
 *
 * Uses `.get()`/`.set()` rather than `.value` so the React Compiler's
 * immutability rule can verify the access.
 */
export function usePressScale() {
  const pressed = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - pressed.get() * 0.02 }],
    opacity: 1 - pressed.get() * 0.1,
  }));

  const onPressIn = useCallback(() => {
    pressed.set(withTiming(1, { duration: 100 }));
  }, [pressed]);

  const onPressOut = useCallback(() => {
    pressed.set(withTiming(0, { duration: 150 }));
  }, [pressed]);

  return { style, onPressIn, onPressOut };
}
