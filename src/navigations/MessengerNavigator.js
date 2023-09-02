import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Chats from '../components/Messenger/Chats';
import Chat from '../components/Messenger/chat';
const Stack = createStackNavigator();
const MessengerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Chats">
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export default MessengerNavigator