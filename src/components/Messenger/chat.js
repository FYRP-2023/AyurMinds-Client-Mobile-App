import React from "react";
import { Modal, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native";
import { style } from "./Messenger.styles";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native";
import { Text, Card, Image } from "react-native";
import { useState } from "react";
import { TouchableHighlight } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { allMessages } from "../../actions/chatActions";
import moment from "moment";
import themes from "../../common/theme/themes";
import * as DocumentPicker from "expo-document-picker";
// import * as EmojiPicker from "react-native-emoji-picker";
import * as ImagePicker from "expo-image-picker";

const Chat = ({ route, navigation }) => {
  const reciver = route.params.reciver;
  const sender = route.params.sender;
  const chat = route.params.chat;
  const [isLoading, setIsLoading] = useState(false);
  const [callback, setCallback] = useState(true);
  const [messages, setMesseges] = useState([]);
  const [inputText, setInputText] = useState("");
  console.log("🚀 ~ file: chat.js:22 ~ Chat ~ messages:", messages);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const toggleOptionsModal = () => {
    setShowOptionsModal(!showOptionsModal);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await allMessages(chat);
        setMesseges(res);
      } catch (error) {
        console.log("🚀 ~ file: chat.js:26 ~ fetchMessages ~ error:", error);
      }
      setIsLoading(false);
    };
    if (callback) fetchMessages();
  }, [callback]);

  // Simulate fetching user data based on the user ID
  useEffect(() => {
    // Customize the header
    navigation.setOptions({
      headerTitle: reciver.firstName + " " + reciver.lastName,
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: "none",
        fontFamily: "Urbanist-Black",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        color: "white", // Customize the font size
      },
      headerStyle: {
        height: 50, // Customize the header height
        backgroundColor: "#17CE92",
        padding: 20, // Customize the background color
      },
      headerLeft: () => (
        // Customize the back button to close
        <TouchableOpacity
          style={{
            marginLeft: 5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [reciver, navigation]);

  const sendMessage = () => {
    if (inputText.trim() === "") return;
    console.log("🚀 ~ file: chat.js:77 ~ sendMessage ~ inputText:", inputText);
  };

const handleFileUpload = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/*", // Example: you can specify a MIME type here
    });
    console.log("🚀 ~ file: chat.js:94 ~ handleFileUpload ~ result:", result)
    if (result.cancelled) {
      // User canceled the file picker
    } else {
      // Handle the selected file (e.g., send it in the chat)
    }
  } catch (error) {
    // Handle other errors
    console.error(error);
  }
};

  const handleEmojiSelection = (emoji) => {
    setInputText(inputText + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleTakePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        // Handle the selected image (e.g., send it in the chat)
        console.log(result.uri);
      }
    } catch (error) {
      // Handle other errors
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
      {messages.length > 0 ? (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                alignSelf:
                  item.sender._id === sender._id ? "flex-end" : "flex-start",
                backgroundColor:
                  item.sender._id === sender._id ? "blue" : "green",
                borderRadius: 10,
                padding: 10,
                margin: 5,
                maxWidth: "70%",
                backgroundColor: "#ffff",
              }}
            >
              <Text style={{ color: "white" }}>{item.text}</Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {moment(item.timestamp).fromNow()}
              </Text>
            </View>
          )}
          onContentSizeChange={() => flatListRef.scrollToEnd()}
          onLayout={() => flatListRef.scrollToEnd()}
          ref={(ref) => {
            flatListRef = ref;
          }}
        />
      ) : null}

      {/* Input Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: "#A0A0A0",
        }}
      >
        {/* Button to toggle the options modal */}
        <TouchableOpacity onPress={toggleOptionsModal}>
          <Feather name="plus-circle" size={24} color="#17CE92" />
        </TouchableOpacity>

        <TextInput
          style={{
            height: 40,
            width: "100%",
            borderBottomColor: themes.Colors.primary,
            borderBottomWidth: 1,
            marginBottom: 10,
            placeholderTextColor: themes.Colors.secondary,
            marginLeft: 5,
            marginRight: 5,
          }}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />

        <TouchableOpacity onPress={sendMessage}>
          <Feather name="send" size={24} color="#17CE92" />
        </TouchableOpacity>
      </View>

      {/* Options Modal */}
      <Modal
        visible={showOptionsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {/* Buttons for file upload, emojis, and taking pictures */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* Button for file upload */}
              <TouchableOpacity onPress={handleFileUpload}>
                <Feather name="upload" size={24} color="#17CE92" />
              </TouchableOpacity>

              {/* Button for emojis */}
              <TouchableOpacity onPress={toggleEmojiPicker}>
                <Feather name="smile" size={24} color="#17CE92" />
              </TouchableOpacity>

              {/* Button for taking pictures */}
              <TouchableOpacity onPress={handleTakePicture}>
                <Feather name="camera" size={24} color="#17CE92" />
              </TouchableOpacity>
            </View>

            {/* Button to close the options modal */}
            <TouchableOpacity onPress={toggleOptionsModal}>
              <Text
                style={{ textAlign: "center", marginTop: 16, color: "#CE1717" }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Emoji Picker */}
      {/* {showEmojiPicker && (
        // <EmojiPicker onEmojiSelected={(emoji) => handleEmojiSelection(emoji)} />
      )} */}
    </SafeAreaView>
  );
};

export default Chat;
