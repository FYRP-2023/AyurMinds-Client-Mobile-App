import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatBot from "../screens/ChatBot/ChatBot";
import NewChat from "../screens/ChatBot/NewChat";

const ChatBotStack = createStackNavigator();

export default function ChatBotNavigator() {
  return (
    <ChatBotStack.Navigator>
      <ChatBotStack.Screen
        options={{
          title: "ChatBot",
          headerShown: false,
        }}
        component={ChatBot}
        name="ChatBot"
      />
      <ChatBotStack.Screen
        component={NewChat}
        name="NewChat"
        options={{
          title: "ChatBot",
          headerShown: false,
        }}
      />
    </ChatBotStack.Navigator>
  );
}
