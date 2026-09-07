import Header from "@/components/Header";
import { StyleSheet, View } from "react-native";
import AddLibraryResourceButton from "./AddLibraryResourceButton";

type LibraryHeaderProps = {
  readonly onAddResource?: () => void;
};

export default function LibraryHeader({ onAddResource }: LibraryHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textHeader}>
        <Header
          primaryText="Library"
          secondaryText="Your Knowledge"
          subText="62 sources · 14 hrs engaged this week"
        />
      </View>
      <AddLibraryResourceButton onPress={onAddResource} variant="header" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  textHeader: {
    flex: 1,
  },
});
