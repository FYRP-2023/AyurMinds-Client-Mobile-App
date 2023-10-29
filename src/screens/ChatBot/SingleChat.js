import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Divider, TextInput } from "react-native-paper";
import themes from "../../common/theme/themes";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import axios from "axios";

const RASA_URL = "http://192.168.40.245:5005/webhooks/rest/webhook";
let sender = "userID001";

const SingleChat = (props) => {
  const chat = props.chat;
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [imageURL, setImageURL] = useState([]);
  const [userQuestion, setUserQuestion] = useState("");
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);

  const closePopup = () => {
    setImageURL([]);
    setPopupVisibility(false);
  };

  const submitQuestion = async () => {
    setIsSubmittingQuestion(true);
    const requestBody = {
      sender: sender,
      message: userQuestion,
    };
    //
    await axios
      .post(
        "http://192.168.40.245:5000/api/chatbot_service/predict",
        requestBody
      )
      .then((response) => {
        // Handle the response data here
        setChatHistory(response.data);
        setIsSubmittingQuestion(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
        setIsSubmittingQuestion(false);
      });
  };

  const setChatHistory = async (reply) => {
    await axios.put(
      `http://192.168.40.245:5000/api/chatbot_service/?userId=${sender}&chatId=${chat?._id}`,
      {
        user: userQuestion,
        bot: reply?.message,
      }
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {chat?.chats?.map((chat, index) => {
          return (
            <View key={index}>
              {chat?.dialogs?.map((dialog, index) => {
                // console.log(dialog?.bot?.answer);
                return (
                  <View key={index}>
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
                              textAlign: "justify",
                            }}
                          >
                            {dialog?.bot}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.botAnswerIcons}>
                        <TouchableOpacity
                        // onPress={() => openPopup(dialog?.bot?.herbs)}
                        >
                          <Ionicons
                            name='leaf'
                            size={24}
                            color={themes.Colors.status.success}
                          />
                        </TouchableOpacity>
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
      {isSubmittingQuestion ? (
        <ActivityIndicator
          size='large'
          color={themes.Colors.primary}
          style={{ marginTop: 250, marginBottom: 250 }}
        />
      ) : (
        <></>
      )}

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
            selectionColor='#FF0000'
            cursorColor='#FF0000'
            right={
              <TextInput.Icon
                icon='send'
                color={themes.Colors.primary}
                onPress={submitQuestion}
              />
            }
            onChangeText={(text) => setUserQuestion(text)}
          />
        </View>
      </View>

      {/* Popup */}
      <Modal visible={isPopupVisible} transparent>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {imageURL.map((url, index) => (
              <Image key={index} source={{ uri: url }} style={styles.image} />
            ))}
          </ScrollView>
          <TouchableOpacity onPress={closePopup}>
            <MaterialCommunityIcons
              name='close'
              size={30}
              color='white'
              style={styles.closeButton}
            />
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  closeButton: {
    marginBottom: 100,
  },
});
