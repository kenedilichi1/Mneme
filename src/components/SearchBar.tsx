import { theme } from "@/constant/theme";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

type SearchBarProps = Omit<TextInputProps, "placeholderTextColor" | "style"> & {
  readonly label?: string;
  readonly placeholder?: string;
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
  const [scaleValue] = useState(() => new Animated.Value(1));
  const [opacityValue] = useState(() => new Animated.Value(1));

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
    <View style={styles.outerContainer}>
      {!!label && <Text style={styles.headerText}>{label}</Text>}

      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchWrapper}
      >
        <Animated.View
          style={[
            styles.searchCapsule,
            { transform: [{ scale: scaleValue }], opacity: opacityValue },
          ]}
        >
          {leadingIcon ? (
            <View style={styles.leadingIcon}>{leadingIcon}</View>
          ) : null}
          <TextInput
            {...textInputProps}
            style={styles.placeholderText}
            placeholder={placeholder}
            placeholderTextColor={theme.color.textSecondary}
            returnKeyType="search"
            numberOfLines={1}
          />
          {trailingIcon ? (
            <View style={styles.trailingIcon}>{trailingIcon}</View>
          ) : null}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 32,
    justifyContent: "center",
  },
  headerText: {
    color: theme.color.text,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: -0.4,
    marginBottom: 16,
  },
  touchWrapper: {
    width: "100%",
  },
  searchCapsule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.color.border,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  leadingIcon: {
    marginRight: 14,
  },
  trailingIcon: {
    marginLeft: 14,
  },
  placeholderText: {
    flex: 1,
    color: theme.color.textSecondary,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: -0.2,
  },
});
