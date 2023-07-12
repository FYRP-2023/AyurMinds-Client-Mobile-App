import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import themes from "../common/theme/themes";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/logo2.png")} style={styles.logo} />
      </View>

      <View style={styles.textGroup}>
        <Text style={styles.title}>Welcome to </Text>
        <Text style={styles.subTitle}>Ayur Mind 👋</Text>
      </View>

      <View style={styles.btnGroup}>
        <Button mode='contained' style={themes.PrimaryBtnLarge}>
          <Text style={styles.primaryButtonText}>Log in</Text>
        </Button>
        <Button mode='contained' style={themes.SecondaryBtnLarge}>
          <Text style={styles.secondaryButtonText}>Sign up</Text>
        </Button>
      </View>

      <View style={styles.line}>
        <Text
          style={{
            color: themes.Colors.secondary,
            textAlign: "center",
            paddingHorizontal: 8,
            marginBottom: 2,
          }}
        >
          or continue with
        </Text>
      </View>

      <View style={styles.socialMediaContainer}>
        <TouchableOpacity style={styles.socialMediaArea}>
          <Image
            source={require("../../assets/facebook.svg")}
            style={styles.socialMediaIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaArea}>
          <Image
            source={require("../../assets/apple.svg")}
            style={styles.socialMediaIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaArea}>
          <Image
            source={require("../../assets/google.svg")}
            style={styles.socialMediaIcon}
          />
        </TouchableOpacity>
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
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 2,
    color: "#17CE92",
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
    marginTop: 100,
  },
  textGroup: { alignItems: "center", justifyContent: "center", gap: 5 },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  line: {
    borderBottomColor: "#9BA1A6",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    marginTop: 50,
  },
  socialMediaContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  socialMediaIcon: {
    width: 35,
    height: 35,
  },
  socialMediaArea: {
    border: "1px solid #9BA1A6",
    borderRadius: 10,
    padding: 8,
  },
});
