import { Button } from "react-native";
import * as Notifications from "expo-notifications";


export const handleNotification = (title, body) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: null, // Send immediately
  });
};

