import { theme } from "@/constant/theme";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.color.background,
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: theme.color.text,
    fontSize: 24,
    fontWeight: "700",
  },
});
