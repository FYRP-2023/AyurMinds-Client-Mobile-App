import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Card, Divider, TextInput } from "react-native-paper";
import themes from "../../common/theme/themes";
import ChatbotIcon from "../../../assets/chatbotIcon.svg";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import SingleChat from "./SingleChat";

const dummyChats = [
  {
    chatName: "Lorem ipsum Chat one",
    modifiedAt: new Date(),
    dialogs: [
      {
        user: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo Lorem ipsum dolor sit amet, consectetur adipiscing  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lelit, sed do eiusmod tempor incididunt ut labo",
        bot: {
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
          herbs: ["herb 1", "herb 2"],
          symptoms: ["symptoms 1", "symptoms2"],
        },
      },
      {
        user: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
        bot: {
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
          herbs: ["herb 1", "herb 2"],
          symptoms: ["symptoms 1", "symptoms2"],
        },
      },
    ],
  },
  {
    chatName: "Lorem ipsum Chat two",
    modifiedAt: new Date(),
    dialogs: [
      {
        user: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
        bot: {
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
          herbs: ["herb 1", "herb 2"],
          symptoms: ["symptoms 1", "symptoms2"],
        },
      },
    ],
  },
  {
    chatName: "Lorem ipsum Chat three",
    modifiedAt: new Date(),
    dialogs: [
      {
        user: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
        bot: {
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
          herbs: ["herb 1", "herb 2"],
          symptoms: ["symptoms 1", "symptoms2"],
        },
      },
    ],
  },
  {
    chatName: "Lorem ipsum Chat four",
    modifiedAt: new Date(),
    dialogs: [
      {
        user: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
        bot: {
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
          herbs: ["herb 1", "herb 2"],
          symptoms: ["symptoms 1", "symptoms2"],
        },
      },
    ],
  },
];

export default function NewChat() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuPosition = useRef(new Animated.Value(-300)).current;
  const [selectedSingleChat, setSelectedSingleChat] = useState({});
  const [isNewChat, setIsNewChat] = useState(true);

  const openMenu = () => {
    Animated.timing(menuPosition, {
      toValue: 0, // Open the menu
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(true);
  };

  const closeMenu = () => {
    Animated.timing(menuPosition, {
      toValue: -300, // Close the menu
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu(); // Close the menu when it's already open
    } else {
      openMenu(); // Open the menu when it's closed
    }
  };

  return (
    <>
      {/* Header field  */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Entypo name='menu' size={30} color='#FFFFFF' />
        </TouchableOpacity>
        <View>
          <Text style={{ ...themes.Typography.subHeading, color: "#FFFFFF" }}>
            {selectedSingleChat?.chatName
              ? selectedSingleChat?.chatName
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
          {dummyChats.map((chat) => {
            return (
              <View style={styles.sideMenuItemContainer}>
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
                      {chat.chatName}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ paddingRight: 2 }}>
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
          <ScrollView>
            <View style={styles.iconContainer}>
              <ChatbotIcon width={120} height={120} />
            </View>
            <Text style={styles.title}>Capabilities</Text>

            <View style={styles.cardContainer}>
              <Card style={styles.card} mode='contained'>
                <Card.Content>
                  <Text style={styles.cardText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do
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
                right={
                  <TextInput.Icon icon='send' color={themes.Colors.primary} />
                }
              />
            </View>
          </View>
        </View>
      ) : (
        <SingleChat chat={selectedSingleChat} />
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
