import { View, StyleSheet, StatusBar, Text } from "react-native";
import React, { useRef } from "react";
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
import * as Permissions from "expo-permissions";
import { addNotificationReceivedListener, addNotificationResponseReceivedListener, registerForPushNotificationsAsync, removeNotificationSubscription, sendNotification } from "../utils/Notifications";


const LogoHeader = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const token = useSelector((state) => state.auth.token);
  // const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigation();
  // let timeout;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isUserUpdate = useSelector((state) => state.auth.isUserUpdate);
  const newMessage = useSelector((state) => state.chat.newMessage);
  const token = useSelector((state) => state.auth.token);
  const isSocketConnect = useSelector((state) => state.auth.isSocketConnect);
  const wsSocket = useSelector((state) => state.auth.socket);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  let timeout;
  const MESSAGE_SOCKET = configs.MESSAGE_SOCKET;
  const [isChat, setIsChat] = useState(true);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

    // useEffect(() => {
    //   registerForPushNotificationsAsync().then((token) =>
    //     setExpoPushToken(token)
    //   );

    //   notificationListener.current =
    //     addNotificationReceivedListener((notification) => {
    //       setNotification(notification);
    //     });

    //   responseListener.current =
    //     addNotificationResponseReceivedListener((response) => {
    //       console.log(response);
    //     });

    //   return () => {
    //    removeNotificationSubscription(
    //       notificationListener.current
    //     );
    //    removeNotificationSubscription(responseListener.current);
    //   };
    // }, []);



  const fetchData = async () => {
    const isLocalLogin =
      (await AsyncStorage.getItem("isLogin")) === "true" ? true : false;
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
    isUserUpdate && fetchData2();
    fetchChat();
  }, [token, user, isUserUpdate, dispatch]);

  //messeage socket
  useEffect(() => {
    if (!isSocketConnect) {
      const socket = io(MESSAGE_SOCKET);
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
        wsSocket.on("connected", (data) => {});
        setIsChat(false);
      }
    }
  }, [user, isChat]);

  useEffect(() => {
    if (wsSocket !== null) {

        wsSocket.on("message recieved", (data) => {
          dispatch(chatActions.setNewMessage(data));
          // sendNotification({
          //   title: data.sender.firstName + " " + data.sender.lastName,
          //   message: data.content,
          //   notificationId: data.chat._id,
          // });
        });

        wsSocket.on("error", (data) => {
          console.error(
            "🚀 ~ file: LogoHeader.js:72 ~ wsSocket.on ~ data err:",
            data
          );
          setIsChat(true);
          dispatch(authActions.socketDisconnect());
        });
      
    }
  }, [wsSocket, isChat]);

  useEffect(() => {}, [wsSocket]);

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
