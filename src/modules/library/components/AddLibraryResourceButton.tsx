import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet } from "react-native";

import { theme } from "@/constant/theme";

type AddLibraryResourceButtonProps = {
  readonly onPress?: () => void;
  readonly variant?: "floating" | "header";
};

export default function AddLibraryResourceButton({
  onPress,
  variant = "floating",
}: AddLibraryResourceButtonProps) {
  return (
    <Pressable
      accessibilityLabel="Add library resource"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "header" ? styles.headerButton : styles.floatingButton,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name="add" size={28} color={theme.color.brand} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: theme.radius.xxxl,
    elevation: 8,
    height: 56,
    justifyContent: "center",
    shadowColor: theme.color.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: 56,
  },
  floatingButton: {
    bottom: theme.spacing.xl,
    position: "absolute",
    right: theme.spacing.xs,
    zIndex: 10,
  },
  headerButton: {
    height: 44,
    width: 44,
  },
  pressed: {
    opacity: 0.8,
  },
});
