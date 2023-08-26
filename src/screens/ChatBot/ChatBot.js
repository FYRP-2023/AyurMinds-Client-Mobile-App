import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import themes from "../../common/theme/themes";
import { useNavigation } from "@react-navigation/native";
import ChatbotIcon from "../../../assets/chatbotIcon.svg";

const ChatBot = () => {
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <ChatbotIcon width={210} height={192} />
      </View>

      <View style={styles.textGroup}>
        <Text style={styles.title1}>Welcome to </Text>
        <Text style={styles.title2}>Ayur Chat</Text>
        <View style={styles.subTitle2}>
          <Text style={themes.Typography.body_light}>
            Start chatting with Ayur Chat now. You can ask me anything
          </Text>
        </View>
      </View>

      <View style={styles.btnGroup}>
        <Button
          mode='contained'
          style={themes.PrimaryBtnLarge}
          onPress={() => navigate.navigate("NewChat")}
        >
          <Text style={styles.primaryButtonText}>Start Chat</Text>
        </Button>
      </View>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 10,
  },
  title1: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 2,
    fontFamily: "Urbanist-Bold",
  },
  title2: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 2,
    fontFamily: "Urbanist-Bold",
    color: themes.Colors.primary,
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
    marginTop: 100,
  },
  textGroup: { alignItems: "center", justifyContent: "center", gap: 5 },
  logo: {
    width: 210,
    height: 192,
    marginBottom: 50,
  },
  subTitle2: {
    paddingTop: 20,
  },
});
