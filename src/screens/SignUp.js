import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import themes from "../common/theme/themes";
import { Ionicons } from "@expo/vector-icons";
import { Button, Divider, RadioButton } from "react-native-paper";
import SocialMediaContainer from "../components/SocialMediaContainer";
import { Checkbox } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { signup } from "../actions/authActions";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [cFpassword, setCfPassword] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [checkedRadio, setCheckedRadio] = React.useState(false);
  const [checkedRadioRole, setCheckedRadioRole] = React.useState("u");
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const handleSignup = () => {
    if (password === cFpassword) {
      let userRole;
      if (checkedRadioRole === "u") {
        userRole = "user";
      } else if (checkedRadioRole == "d") {
        userRole = "doctor";
      } else if (checkedRadioRole == "p") {
        userRole = "pharmacist";
      } else {
        userRole = "user";
      }
      let usergender ;
      if(checkedRadio == "m" ) { usergender = "male"}else if
          (checkedRadio == "f" ) { usergender = "female"} else if
          (checkedRadio == "o" ){ usergender = "other"}else {
            usergender = "male"
          }

      const data = {
        firstName,
        lastName,
        email,
        password,
        role:userRole,
        gender:usergender
      };
      dispatch(signup(data, navigate));
    } else {
      //:TODO
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back-sharp"
        size={30}
        color="#071421"
        style={{ margin: 5 }}
        onPress={() => navigate.goBack()}
      />
      <Text style={themes.Typography.heading}>Hello there👋</Text>
      <Text style={themes.Typography.subHeading}>
        Please enter your details to create an account
      </Text>

      <ScrollView style={{ marginTop: 20 }}>
        <Text style={themes.Typography.title}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="imasha@example.com"
          onChangeText={(text) => setfirstName(text)}
          value={firstName}
          // right={<AntDesign name='eyeo' size={24} color='red' />}
        />
        <Text style={themes.Typography.title}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="imasha@example.com"
          onChangeText={(text) => setlastName(text)}
          value={lastName}
          // right={<AntDesign name='eyeo' size={24} color='red' />}
        />
        <Text style={themes.Typography.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="imasha@example.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
          // right={<AntDesign name='eyeo' size={24} color='red' />}
        />

        <Text style={themes.Typography.title}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          // right={<AntDesign name='eyeo' size={24} color='red' />}
        />
        <Text style={themes.Typography.title}>Conform Password</Text>
        <TextInput
          style={styles.input}
          placeholder="conform password"
          secureTextEntry
          onChangeText={(text) => setCfPassword(text)}
          value={cFpassword}
          // right={<AntDesign name='eyeo' size={24} color='red' />}
        />
        <Text style={themes.Typography.title}>Gender</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onPress={() => {
                setCheckedRadio("m");
              }}
              color={themes.Colors.primary}
              status={checkedRadio === "m" ? "checked" : "unchecked"}
            />

            <Text style={themes.Typography.body2}>Male</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onPress={() => {
                setCheckedRadio("f");
              }}
              color={themes.Colors.primary}
              status={checkedRadio === "f" ? "checked" : "unchecked"}
            />

            <Text style={themes.Typography.body2}>Female</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onPress={() => {
                setCheckedRadio("o");
              }}
              color={themes.Colors.primary}
              status={checkedRadio === "o" ? "checked" : "unchecked"}
            />

            <Text style={themes.Typography.body2}>Other</Text>
          </View>
        </View>
        <Text style={themes.Typography.title}>Role</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onPress={() => {
                setCheckedRadioRole("u");
              }}
              color={themes.Colors.primary}
              status={checkedRadioRole === "u" ? "checked" : "unchecked"}
            />

            <Text style={themes.Typography.body2}>User</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onPress={() => {
                setCheckedRadioRole("d");
              }}
              color={themes.Colors.primary}
              status={checkedRadioRole === "d" ? "checked" : "unchecked"}
            />

            <Text style={themes.Typography.body2}>Doctor</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onPress={() => {
                setCheckedRadioRole("p");
              }}
              color={themes.Colors.primary}
              status={checkedRadioRole === "p" ? "checked" : "unchecked"}
            />

            <Text style={themes.Typography.body2}>Pharmacist</Text>
          </View>
        </View>
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
            <Text style={{ color: themes.Colors.primary }}>
              Public Agreement, Terms & Privacy Policy
            </Text>
          </Text>
        </View>

        <View style={{ alignItems: "center", marginTop: 55 }}>
          <Text style={themes.Typography.body}>
            Already have an account?{" "}
            <Text
              onClick={() => navigate.navigate("Login")}
              style={{ color: themes.Colors.primary }}
            >
              Log in
            </Text>
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <SocialMediaContainer />
        </View>

        <Divider style={styles.divider} />

        <Button style={themes.PrimaryBtnLarge} onPress={handleSignup}>
          <Text style={styles.primaryButtonText}>Sign up</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    paddingRight: 20,
  },
  divider: {
    marginTop: 25,
    marginBottom: 1,
    color: themes.Colors.secondary,
  },
});
