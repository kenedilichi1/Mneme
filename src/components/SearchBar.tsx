import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

import { theme } from "@/constant/theme";
import { usePressScale } from "@/hooks/usePressScale";

type SearchBarProps = Omit<TextInputProps, "placeholderTextColor" | "style"> & {
  readonly label?: string;
  readonly placeholder?: string;
  /**
   * When set, the bar becomes a button that navigates instead of a text field.
   * A `TextInput` nested inside a `Pressable` swallows taps, so the two modes
   * render different trees rather than layering one over the other.
   */
  readonly onPress?: () => void;
  readonly leadingIcon?: ReactNode;
  readonly trailingIcon?: ReactNode;
};

export default function SearchBar({
  label,
  placeholder,
  onPress,
  leadingIcon,
  trailingIcon,
  ...textInputProps
}: SearchBarProps) {
  const press = usePressScale();

  return (
    <View style={styles.outerContainer}>
      {!!label && <Text style={styles.headerText}>{label}</Text>}

      {onPress ? (
        <Pressable
          accessibilityLabel={label ?? placeholder}
          accessibilityRole="button"
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          <Animated.View style={[styles.searchCapsule, press.style]}>
            {leadingIcon ? (
              <View style={styles.leadingIcon}>{leadingIcon}</View>
            ) : null}
            <Text style={styles.prompt} numberOfLines={1}>
              {placeholder}
            </Text>
            {trailingIcon ? (
              <View style={styles.trailingIcon}>{trailingIcon}</View>
            ) : null}
          </Animated.View>
        </Pressable>
      ) : (
        <View style={styles.searchCapsule}>
          {leadingIcon ? (
            <View style={styles.leadingIcon}>{leadingIcon}</View>
          ) : null}
          <TextInput
            {...textInputProps}
            // This is the *typed text* colour. It used to be textSecondary,
            // which rendered everything the user typed in the muted
            // placeholder grey.
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={theme.color.textSecondary}
            returnKeyType="search"
          />
          {trailingIcon ? (
            <View style={styles.trailingIcon}>{trailingIcon}</View>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: theme.spacing.xxl,
    justifyContent: "center",
  },
  headerText: {
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    fontWeight: "600",
    letterSpacing: -0.4,
    marginBottom: theme.spacing.lg,
  },
  searchCapsule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.color.border,
    borderRadius: theme.radius.xl,
    paddingVertical: theme.spacing.xl - 4,
    paddingHorizontal: theme.spacing.xl,
  },
  leadingIcon: {
    marginRight: theme.spacing.md + 2,
  },
  trailingIcon: {
    marginLeft: theme.spacing.md + 2,
  },
  input: {
    flex: 1,
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    fontWeight: "500",
    letterSpacing: -0.2,
  },
  prompt: {
    flex: 1,
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.xl,
    fontWeight: "500",
    letterSpacing: -0.2,
  },
});
