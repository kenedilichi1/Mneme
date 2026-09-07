import { theme } from "@/constant/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet } from "react-native";

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
      <Ionicons name="add" size={28} color={theme.color.warning} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 28,
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
    bottom: 24,
    position: "absolute",
    right: 4,
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
