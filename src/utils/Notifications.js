import * as Device from "expo-device";
import * as Notifications from "expo-notifications";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Function to send a notification
export const sendNotification = async ({ title, message, notificationId }) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
    },
    trigger: null,
  });
};

// Replace 'notificationId' with the actual identifier of the notification you want to clear.
export const clearNotification = async (notificationId) => {
  await Notifications.dismissNotificationAsync(notificationId);
};

// Clear all notifications
export const clearAllNotifications = async () => {
  await Notifications.dismissAllNotificationsAsync();
};


export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#C9FFEE",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "your-project-id",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}


 export const addNotificationReceivedListener = () => {
   Notifications.addNotificationReceivedListener((notification) => {
     return notification;
   });
 }; 

 export const addNotificationResponseReceivedListener = () => {
    Notifications.addNotificationResponseReceivedListener((response) => {
     console.log(response);
   });
 }; 

 export const removeNotificationSubscription = (data) => {
   Notifications.removeNotificationSubscription(data);
 }; 

