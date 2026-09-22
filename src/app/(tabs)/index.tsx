import { StyleSheet, View } from "react-native";

import { theme } from "@/constant/theme";
import { HomeScreen } from "@/modules/home";

export default function HomeRoute() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
});
