import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import themes from "./src/common/theme/themes";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={themes.SubHeading}>Welcome to Ayur Minds Appliction</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
