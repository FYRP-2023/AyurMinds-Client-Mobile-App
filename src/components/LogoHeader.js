import { View, StyleSheet, StatusBar, Text } from "react-native";
import React from "react";
import themes from "../common/theme/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { access, info, logout } from "../actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { configs } from "../../configs";
import { authActions } from "../store/authSlice";
import { fetchChats } from "../actions/chatActions";
import { useState } from "react";
import { chatActions } from "../store/chatSlice";

const LogoHeader = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const token = useSelector((state) => state.auth.token);
  // const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigation();
  // let timeout;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const newMessage = useSelector((state) => state.chat.newMessage);
  const token = useSelector((state) => state.auth.token);
  const isSocketConnect = useSelector((state) => state.auth.isSocketConnect);
  const wsSocket = useSelector((state) => state.auth.socket);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  let timeout;
  const SOCKET_URL = configs.API_GATWAY_URL;
  const [isChat, setIsChat]=useState(true)

  const fetchData = async () => {
    const isLocalLogin = await AsyncStorage.getItem("isLogin") === "true" ? true : false;
    if (isLocalLogin && isLoggedIn) {
      await dispatch(access(navigate));
    }
    timeout = setTimeout(fetchData, 2 * 60 * 1000);
  };

  const fetchData2 = async () => {
    if (token && !user) {
      await dispatch(info(token, navigate));
    }
  };

  const fetchChat = async () => {
    if (token && user) {
      await dispatch(fetchChats(user, token));
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    fetchData2();
    fetchChat();
  }, [token, user, dispatch]);

   useEffect(() => {
     if (!isSocketConnect) {
       const socket = io(SOCKET_URL);
       dispatch(authActions.socketConnect(socket));
     }
   }, [isSocketConnect]);

   useEffect(() => {
     if (isSocketConnect && user && token && wsSocket) {
       wsSocket.emit("setup", {
         user: user,
         headers: {
           authorization: token,
         },
       });
     }
   }, [wsSocket, user]);

   useEffect(() => {
     if (wsSocket !== null) {
       if (user && isChat) {
         wsSocket.on("connected", (data) => {
           console.log(
             "🚀 ~ file: LogoHeader.js:71 ~ wsSocket.on ~ data:",
             data
           );
           wsSocket.emit("chat_service", {
             emit_message: "chat_setup",
             user: user,
           });
         });
         setIsChat(false);
       }
     }
   }, [user, isChat]);

   useEffect(() => {
     if (wsSocket !== null) {
       if (user && !isChat) {
          wsSocket.on("message_recieved", (data) => {
            dispatch(chatActions.setNewMessage(data));
          });
         wsSocket.on("error", (data) => {
           console.log(
             "🚀 ~ file: LogoHeader.js:72 ~ wsSocket.on ~ data err:",
             data
           );
           setIsChat(true);
           dispatch(authActions.socketDisconnect());
         });
         wsSocket.on("chat_service", (data) => {
           console.log(
             "🚀 ~ file: LogoHeader.js:114 ~ wsSocket.on ~ data:",
             data
           );
         });
         wsSocket.on("notification_service", (data) => {
           console.log(
             "🚀 ~ file: notification_service ~ wsSocket.on ~ data:",
             data
           );
         });
         wsSocket.on("chat_connected", (data) => {
           if (!data) {
             dispatch(authActions.socketDisconnect());
           }
         });
       }
     }
   }, [wsSocket,isChat]);

   useEffect(() => {
   
   }, [wsSocket]);
   

   

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>AYURMINDS</Text>
      <MaterialCommunityIcons
        size={28}
        name="chat"
        color={themes.Colors.primary}
        onPress={() => navigate.navigate("Messenger")}
      />
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 13,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    fontSize: 22,
    color: themes.Colors.text,
    padding: 15,
    fontWeight: "bold",
    // letterSpacing: 3,
  },
});
