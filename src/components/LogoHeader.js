import { View, StyleSheet, Image, StatusBar, Text } from "react-native";
import React from "react";
import themes from "../common/theme/themes";

const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>AYURMIND</Text>
      {/* <Image source={require("../../assets/logo.png")} style={styles.logo} /> */}
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,

    justifyContent: "center",
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
