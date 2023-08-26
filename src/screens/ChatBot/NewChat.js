import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Card, Divider, TextInput } from "react-native-paper";
import themes from "../../common/theme/themes";
import ChatbotIcon from "../../../assets/chatbotIcon.svg";

export default function NewChat() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ChatbotIcon width={120} height={120} />
      </View>
      <Text style={styles.title}>Capabilities</Text>

      <View style={styles.cardContainer}>
        <Card style={styles.card} mode='contained'>
          <Card.Content>
            <Text style={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod utsit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode='contained'>
          <Card.Content>
            <Text style={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode='contained'>
          <Card.Content>
            <Text style={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.inputContainer}>
        <Divider style={{ marginBottom: 10 }} />
        <View>
          <TextInput
            placeholder='Ask me...'
            placeholderTextColor='#BDBDBD'
            style={styles.input}
            multiline
            underlineColor='none'
            activeUnderlineColor='none'
            right={<TextInput.Icon icon='send' color={themes.Colors.primary} />}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    height: "100%",
    flex: 1,

    justifyContent: "space-between",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 120,
    height: 120,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    margin: 15,
    fontFamily: "Urbanist-Bold",
    color: "#BDBDBD",
    textAlign: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  card: {
    backgroundColor: "#F1F1F1",
    border: "none",
  },
  cardText: {
    fontSize: 18,
    padding: 5,
    fontFamily: "Urbanist-Regular",
    color: "#BDBDBD",
    textAlign: "center",
  },
  inputContainer: {
    paddingTop: 10,
    margin: 10,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    color: "black",
  },
});
