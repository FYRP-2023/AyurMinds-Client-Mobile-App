import { View, StyleSheet, StatusBar, Text } from "react-native";
import React from "react";
import themes from "../common/theme/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LogoHeader = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>AYURMINDS</Text>
      <MaterialCommunityIcons
        size={28}
        name='chat'
        color={themes.Colors.primary}
        onPress={() => navigate.navigate("DocChat")}
      />
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 13,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    fontSize: 24,
    color: themes.Colors.primary,
    padding: 8,
    fontWeight: "bold",
    letterSpacing: 3,
  },
});
