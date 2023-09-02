import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import themes from "../common/theme/themes";
import { useNavigation } from "@react-navigation/native";
import SocialMediaContainer from "../components/SocialMediaContainer";
import { SafeAreaView } from "react-native";
// import LogoSvg from "../../assets/LogoGreen.svg";

const Welcome = () => {
  const navigate = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Image
            source={require("../../assets/LogoGreen.svg")}
            style={styles.logo}
          />
        </View>

        <View style={styles.textGroup}>
          <Text style={styles.title}>Welcome to </Text>
          <Text style={styles.title}>Future of </Text>
          <Text style={styles.subTitle}>Ayurvedha</Text>
        </View>

        <View style={styles.btnGroup}>
          <Button
            mode="contained"
            style={themes.PrimaryBtnLarge}
            onPress={() => navigate.navigate("Login")}
          >
            <Text style={styles.primaryButtonText}>Log in</Text>
          </Button>
          <Button
            mode="contained"
            style={themes.SecondaryBtnLarge}
            onPress={() => navigate.navigate("SignUp")}
          >
            <Text style={styles.secondaryButtonText}>Sign up</Text>
          </Button>
        </View>

        <SocialMediaContainer />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
    fontFamily: "Urbanist-Bold",
  },
  subTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 2,
    color: themes.Colors.primary,
    fontFamily: "Urbanist-Semi-Bold",
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
    marginTop: 50,
  },
  textGroup: { alignItems: "center", justifyContent: "center", gap: 5 },
  logo: {
    marginBottom: 50,
    marginTop: 50,
  },
});
