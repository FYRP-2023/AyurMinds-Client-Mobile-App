import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Chats from '../components/Messenger/Chats';
import Chat from '../components/Messenger/chat';
import Messenger from '../screens/Messenger';
const MessengerStack = createStackNavigator();
const MessengerNavigator = () => {
  return (
    <MessengerStack.Navigator initialRouteName="Chats">
      <MessengerStack.Screen
        name="Chats"
        component={Messenger}
        options={{
          headerShown: false,
        }}
      />
      <MessengerStack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
    </MessengerStack.Navigator>
  );
}

export default MessengerNavigator