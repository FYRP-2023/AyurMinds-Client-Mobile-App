import { StyleSheet, Text, View } from "react-native";
import themes from "./src/common/theme/themes";
import AppNavigator from "./src/navigations/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
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
