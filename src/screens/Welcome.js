import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import themes from "../common/theme/themes";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Text style={themes.Typography.heading}>Welcome to </Text>
      <Text style={themes.Typography.heading}>Ayur Mind </Text>
      <View style={styles.btnGroup}>
        <Button mode='contained' style={themes.PrimaryBtnLarge}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </Button>
        <Button mode='contained' style={themes.SecondaryBtnLarge}>
          <Text style={styles.secondaryButtonText}>Sign up</Text>
        </Button>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#17CE92",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnGroup: {
    width: "100%",
  },
});
