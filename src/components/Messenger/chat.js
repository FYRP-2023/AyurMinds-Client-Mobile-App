import React, { useRef } from "react";
import { FlatList, Modal, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native";
import { style } from "./Messenger.styles";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native";
import { Text, Card, Image } from "react-native";
import { useState } from "react";
import { TouchableHighlight } from "react-native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { allMessages } from "../../actions/chatActions";
import moment from "moment";
import themes from "../../common/theme/themes";
import { Divider, TextInput } from "react-native-paper";
import AyurMindsApi from "../../api/apiService";
import { getAxiosInstance } from "../../utils/axios";
// import * as DocumentPicker from "expo-document-picker";
// // import * as EmojiPicker from "react-native-emoji-picker";
// import * as ImagePicker from "expo-image-picker";

const Chat = ({ route, navigation }) => {
  const wsSocket = useSelector((state) => state.auth.socket);
  const newMessage = useSelector((state) => state.chat.newMessage);
  console.log("🚀 ~ file: chat.js:26 ~ Chat ~ newMessage:", newMessage.content)
  const reciver = route.params.reciver;
  const sender = route.params.sender;
  const chat = route.params.chat;
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [callback, setCallback] = useState(true);
  const [messages, setMesseges] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [messegeText, setMessegeText] = useState("");


  const toggleOptionsModal = () => {
    setShowOptionsModal(!showOptionsModal);
  };

  useEffect(() => {
      wsSocket.emit("join chat", chat._id);    
  }, []);

  useEffect(() => {

      setCallback(true)

  }, [newMessage]);
  

  useEffect(() => {
    const fetchMessages = async () => {
      console.log("🚀 ~ file: chat.js:65 ~ fetchMessages ~ callback:", callback)
      setIsLoading(true);
      try {
        const res = await allMessages(chat);
        setMesseges(res);
      } catch (error) {
        console.log("🚀 ~ file: chat.js:26 ~ fetchMessages ~ error:", error.response);
      }
      setIsLoading(false);
      setCallback(false)
    };
    if (callback) fetchMessages();
  }, [callback]);

  // // Simulate fetching user data based on the user ID
  // useEffect(() => {
  //   // Customize the header
  //   navigation.setOptions({
  //     headerTitle: reciver.firstName + " " + reciver.lastName,
  //     headerTitleStyle: {
  //       fontSize: 18,
  //       color: "#071421",
  //       letterSpacing: 2,
  //       fontFamily: "Urbanist-ExtraBold",
  //       color: "#FFFFFF",
  //       textAlign:"center"
  //     },
  //     headerStyle: {
  //       backgroundColor: "#36454F",
  //     },
  //     headerLeft: () => (
  //       // Customize the back button to close
  //       <TouchableOpacity
  //         style={{
  //           marginLeft: 10,
  //         }}
  //         onPress={() => navigation.goBack()}
  //       >
  //         <Feather name="x" size={20} color="white" />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [reciver, navigation]);

const handleFileUpload = async () => {
  // try {
  //   const result = await DocumentPicker.getDocumentAsync({
  //     type: "application/*", // Example: you can specify a MIME type here
  //   });
  //   console.log("🚀 ~ file: chat.js:94 ~ handleFileUpload ~ result:", result)
  //   if (result.cancelled) {
  //     // User canceled the file picker
  //   } else {
  //     // Handle the selected file (e.g., send it in the chat)
  //   }
  // } catch (error) {
  //   // Handle other errors
  //   console.error(error);
  // }
};

const handleChangeText=(e)=>{
  setMessegeText(e);
}

  const handleEmojiSelection = (emoji) => {
    setInputText(inputText + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleTakePicture = async () => {
    // try {
    //   const result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1,
    //   });

    //   if (!result.cancelled) {
    //     // Handle the selected image (e.g., send it in the chat)
    //     console.log(result.uri);
    //   }
    // } catch (error) {
    //   // Handle other errors
    //   console.error(error);
    // }
  };

  const handleSend =async(e)=>{
    e.preventDefault();
    if(messegeText){
        try {
          const res = await getAxiosInstance().post(
            AyurMindsApi.message_service.sendMessage + "?id=" + user._id,
            {
              content: messegeText,
              chatId: chat._id,
              type: "text",
            },
            {
              withCredentials: true,
            }
          );
          setMessegeText("")
          console.log(res.data);
          wsSocket.emit("new message", {
            chat: res.data.chat,
            sender: {...user},
          });
          setCallback(true);
        } catch (error) {
          console.log(
            "🚀 ~ file: chat.js:137 ~ handleSend ~ error:",
            error.response.data
          );
          
        }
    }
  }
  const flatListRef = useRef();

  return (
    <View
      style={{
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#36454F",
          width: "100%",
          height: 50,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View>
          <Text style={{ ...themes.Typography.subHeading, color: "#FFFFFF" }}>
            {reciver.firstName + " " + reciver.lastName}
          </Text>
        </View>
        <View></View>
      </View>
      {messages.length > 0 ? (
        <ScrollView
          style={{ paddingLeft: 10, paddingRight: 10 }}
          ref={flatListRef}
          onContentSizeChange={() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          }}
        >
          {messages.map((item) => (
            <View
              key={item._id}
              style={{
                flexDirection:
                  item.sender._id === sender._id ? "row-reverse" : "row",
              }}
            >
              <View
                style={{
                  backgroundColor:
                    item.sender._id === sender._id ? "#303849" : "#17CE92",
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  margin: 4,
                  maxWidth: "70%", // Adjust the max width as per your design
                  alignSelf:
                    item.sender._id === sender._id ? "flex-end" : "flex-start",
                }}
              >
                <Text
                  style={{
                    color: "white" ,
                  }}
                >
                  {item.content}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View></View>
      )}
      <View
        style={{
          paddingTop: 10,
          margin: 10,
        }}
      >
        <Divider style={{ marginBottom: 10 }} />
        <View>
          <TextInput
            placeholder="Send a message..."
            placeholderTextColor="#BDBDBD"
            style={{ borderRadius: 10, backgroundColor: "#F1F1F1" }}
            multiline
            underlineColor="none"
            activeUnderlineColor="none"
            right={
              <TextInput.Icon
                icon="send"
                color={themes.Colors.primary}
                onPress={handleSend}
              />
            }
            left={
              <TextInput.Icon
                icon="plus"
                color={themes.Colors.primary}
                onPress={toggleOptionsModal}
              />
            }
            onChangeText={(e) => {
              handleChangeText(e);
            }}
            value={messegeText}
          />
        </View>
      </View>

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={handleFileUpload}>
                <Entypo name="attachment" size={24} color="#17CE92" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleTakePicture}>
                <Feather name="camera" size={24} color="#17CE92" />
              </TouchableOpacity>
            </View>

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
    </View>
  );
};

export default Chat;
