import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider, TextInput } from "react-native-paper";
import themes from "../../common/theme/themes";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const SingleChat = (props) => {
  const chat = props.chat;

  return (
    <View style={styles.container}>
      <ScrollView>
        {chat?.chats?.map((chat, index) => {
          console.log(chat?.dialogs, "SINGLE");
          return (
            <View key={index}>
              {chat?.dialogs?.map((dialog) => {
                return (
                  <View>
                    <View style={styles.userQuestion}>
                      <FontAwesome
                        name='user-o'
                        size={28}
                        color={themes.Colors.secondary}
                        style={{ marginTop: 10 }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            ...themes.Typography.body,
                            color: "#36454F",
                          }}
                        >
                          {dialog?.user}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.botAnswerContainer}>
                      <View style={styles.botAnswer}>
                        <MaterialCommunityIcons
                          name='robot-outline'
                          size={30}
                          color={themes.Colors.primary}
                          style={{ marginTop: 10 }}
                        />
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              ...themes.Typography.body,
                              color: "#36454F",
                            }}
                          >
                            {dialog?.bot?.answer}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.botAnswerIcons}>
                        <Ionicons
                          name='leaf'
                          size={24}
                          color={themes.Colors.status.success}
                        />
                        <MaterialCommunityIcons
                          name='doctor'
                          size={24}
                          color={themes.Colors.status.warning}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <Divider style={{ marginBottom: 10 }} />
        <View>
          <TextInput
            placeholder='continue chat...'
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
};

export default SingleChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
  },
  inputContainer: {
    paddingTop: 10,
    margin: 10,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
  },
  userQuestion: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  botAnswerContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    paddingBottom: 10,
  },
  botAnswer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  botAnswerIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-end",
    marginRight: 20,
  },
});
