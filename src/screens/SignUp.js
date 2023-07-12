import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import themes from "../common/theme/themes";
import { Ionicons } from "@expo/vector-icons";
import { Button, Divider, TextInput } from "react-native-paper";
import SocialMediaContainer from "../components/SocialMediaContainer";
import { Checkbox } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(false);

  const navigate = useNavigation();

  const handleSignup = () => {
    console.log("Signup", email, password);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Ionicons
          name='arrow-back-sharp'
          size={30}
          color='black'
          style={{ margin: 5 }}
        />
        <Text style={themes.Typography.heading}>Hello there👋</Text>
        <Text style={themes.Typography.subHeading}>
          Please enter your email & password to create an account
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text style={themes.Typography.title}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='imasha@example.com'
            onChangeText={(text) => setEmail(text)}
            value={email}
            right={<AntDesign name='eyeo' size={24} color='red' />}
          />

          <Text style={themes.Typography.title}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder='password'
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            right={<AntDesign name='eyeo' size={24} color='red' />}
          />

          <View style={styles.agreement}>
            <Checkbox
              onPress={() => {
                setChecked(!checked);
              }}
              color={themes.Colors.primary}
              status={checked ? "checked" : "unchecked"}
            />

            <Text style={themes.Typography.body2}>
              I agree to AyurMind{" "}
              <span style={{ color: themes.Colors.primary }}>
                Public Agreement, Terms & Privacy Policy
              </span>
            </Text>
          </View>

          <View style={{ alignItems: "center", marginTop: 55 }}>
            <Text style={themes.Typography.body}>
              Already have an account?{" "}
              <span
                onClick={() => navigate.navigate("Login")}
                style={{ color: themes.Colors.primary }}
              >
                Log in
              </span>
            </Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <SocialMediaContainer />
          </View>

          <Divider style={styles.divider} />

          <Button style={themes.PrimaryBtnLarge} onPress={handleSignup}>
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 15,
  },
  input: {
    height: 40,
    width: "100%",
    borderBottomColor: themes.Colors.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
    placeholderTextColor: themes.Colors.secondary,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Urbanist-Semi-Bold",
  },
  agreement: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  divider: {
    marginTop: 25,
    marginBottom: 25,
    color: themes.Colors.secondary,
  },
});
