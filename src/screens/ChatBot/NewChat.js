import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Card, Divider, TextInput } from "react-native-paper";
import themes from "../../common/theme/themes";
import ChatbotIcon from "../../../assets/chatbotIcon.svg";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import SingleChat from "./SingleChat";
import axios from "axios";
import { getAxiosInstance } from "../../utils/axios";
import { configs } from "../../../configs";

// const RASA_URL = "http://192.168.40.245:5005/webhooks/rest/webhook";
let sender = "userID001";
export default function NewChat() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuPosition = useRef(new Animated.Value(-300)).current;
  const [selectedSingleChat, setSelectedSingleChat] = useState({});
  const [isNewChat, setIsNewChat] = useState(true);
  const [userQuestion, setUserQuestion] = useState("");
  const [chats, setChats] = useState([]);
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  const openMenu = () => {
    Animated.timing(menuPosition, {
      toValue: 0, // Open the menu
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(true);
  };
  //
  const closeMenu = () => {
    Animated.timing(menuPosition, {
      toValue: -300, // Close the menu
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(false);
  };
  //
  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu(); // Close the menu when it's already open
    } else {
      openMenu(); // Open the menu when it's closed
    }
  };
  //
  const submitQuestion = async () => {
    setIsSubmittingQuestion(true);
    const requestBody = {
      sender: sender,
      message: userQuestion,
    };
    //
    await getAxiosInstance()
      .post(configs.CHATBOT_SERVICE + "/predict", requestBody)
      .then((response) => {
        // Handle the response data here
        setChatHistory(response.data);
        setIsSubmittingQuestion(false);
        setReFetch(true);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
        setIsSubmittingQuestion(false);
        setReFetch(false);
      });
  };
  //
  const setChatHistory = async (reply) => {
    const firstFourWords = userQuestion.split(" ").slice(0, 10).join(" ");

    await getAxiosInstance()
      .post(configs.CHATBOT_SERVICE + "/", {
        userId: sender,
        chats: [
          {
            chatName: firstFourWords,
            modifiedAt: "2023-09-03T12:00:00.000Z",
            dialogs: [
              {
                user: userQuestion,
                bot: reply.message,
              },
            ],
          },
        ],
      })
      .then((response) => {
        setIsNewChat(false);
        setSelectedSingleChat(response.data);
        setReFetch(true);
      });
  };
  //
  const handleChatDelete = async (id) => {
    try {
      await getAxiosInstance().delete(
        configs.CHATBOT_SERVICE + `/?userId=${sender}&chatId=${id}`
      );
      setIsNewChat(true);
      setReFetch(true);
      closeMenu();
      // You can handle the success or any other logic here
    } catch (error) {
      console.log("NOTDELETED");
      console.log(error);
    }
  };

  useEffect(() => {
    // Make an HTTP GET request to retrieve the chats
    getAxiosInstance()
      .get(configs.CHATBOT_SERVICE + "/?userId=userID001")
      .then((response) => {
        setChats(response.data); // Assuming your API returns an array of chats
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }, [reFetch]);

  return (
    <>
      {/* Header field  */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Entypo name='menu' size={30} color='#FFFFFF' />
        </TouchableOpacity>
        <View>
          <Text style={{ ...themes.Typography.subHeading, color: "#FFFFFF" }}>
            {selectedSingleChat?._id && !isNewChat
              ? selectedSingleChat?.chats[0]?.chatName &&
                selectedSingleChat?.chats[0]?.chatName
                  .split(" ")
                  .slice(0, 6)
                  .join(" ")
              : "New Chat"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsNewChat(true);
            setSelectedSingleChat({});
            closeMenu();
          }}
        >
          <Entypo name='plus' size={30} color='#FFFFFF' />
        </TouchableOpacity>
      </View>

      {/* Side Menu */}
      <Animated.View style={[styles.sideMenu, { left: menuPosition, top: 49 }]}>
        {/* Menu Content */}
        <View>
          {chats.map((chat, index) => {
            return (
              <View style={styles.sideMenuItemContainer} key={index}>
                <View style={styles.sideMenuItem}>
                  <Ionicons name='chatbox-outline' size={20} color='#FFFFFF' />
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSingleChat(chat);
                      setIsNewChat(false);
                      closeMenu();
                    }}
                  >
                    <Text
                      style={{ ...themes.Typography.title, color: "#FFFFFF" }}
                    >
                      {chat?.chats[0]?.chatName &&
                        chat?.chats[0]?.chatName
                          .split(" ")
                          .slice(0, 5)
                          .join(" ")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{ paddingRight: 2 }}
                  onPress={() => handleChatDelete(chat?._id)}
                >
                  <MaterialIcons
                    name='delete-outline'
                    size={24}
                    color='#FFFFFF'
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </Animated.View>

      {/* New chat field  */}
      {isNewChat ? (
        <View style={styles.container}>
          {isSubmittingQuestion ? (
            <ActivityIndicator
              size='large'
              color={themes.Colors.primary}
              style={{ marginTop: 250, marginBottom: 250 }}
            />
          ) : (
            <ScrollView>
              <View style={styles.iconContainer}>
                <ChatbotIcon width={120} height={120} />
              </View>
              <Text style={styles.title}>Capabilities</Text>

              <View style={styles.cardContainer}>
                <Card style={styles.card} mode='contained'>
                  <Card.Content>
                    <Text style={styles.cardText}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do
                    </Text>
                  </Card.Content>
                </Card>

                <Card style={styles.card} mode='contained'>
                  <Card.Content>
                    <Text style={styles.cardText}>
                      Loremdolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut
                    </Text>
                  </Card.Content>
                </Card>

                <Card style={styles.card} mode='contained'>
                  <Card.Content>
                    <Text style={styles.cardText}>
                      Loremdolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            </ScrollView>
          )}

          <View style={styles.inputContainer}>
            <Divider style={{ marginBottom: 10 }} />
            <View>
              <TextInput
                placeholder='Ask me...'
                // placeholderTextColor='#BDBDBD'
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
        </View>
      ) : (
        selectedSingleChat && (
          <SingleChat chat={selectedSingleChat} setRefetch={setReFetch} />
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    backgroundColor: "#36454F",
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  sideMenu: {
    position: "absolute",
    zIndex: 1,
    right: -300, // Initially off-screen
    width: 300,
    height: "100%",
    backgroundColor: "#343434",
    padding: 5,
  },
  sideMenuItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    marginTop: 10,
  },
  sideMenuItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  },
});
