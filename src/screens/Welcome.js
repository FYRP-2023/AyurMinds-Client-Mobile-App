import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import themes from "../common/theme/themes";
import { useNavigation } from "@react-navigation/native";
import SocialMediaContainer from "../components/SocialMediaContainer";

const Welcome = () => {
  const navigate = useNavigation();
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
        <Button
          mode='contained'
          style={themes.PrimaryBtnLarge}
          onPress={() => navigate.navigate("Login")}
        >
          <Text style={styles.primaryButtonText}>Log in</Text>
        </Button>
        <Button
          mode='contained'
          style={themes.SecondaryBtnLarge}
          onPress={() => navigate.navigate("SignUp")}
        >
          <Text style={styles.secondaryButtonText}>Sign up</Text>
        </Button>
      </View>

      <SocialMediaContainer />
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
    fontFamily: "Urbanist-Semi-Bold",
  },
  secondaryButtonText: {
    color: "#17CE92",
    fontSize: 16,
    fontFamily: "Urbanist-Semi-Bold",
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
});
