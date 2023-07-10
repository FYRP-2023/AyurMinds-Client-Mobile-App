import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../screens/Home";
import ChatBot from "../screens/ChatBot";
import Doctor from "../screens/Doctor";
import SocialNetwork from "../screens/SocialNetwork";
import Herb from "../screens/Herb";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import themes from "../common/theme/themes";

const Tab = createMaterialTopTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: themes.Colors.primary },
      }}
    >
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? "home" : "home-outline"}
              color={focused ? themes.Colors.primary : themes.Colors.secondary}
            />
          ),
        }}
        component={Home}
        name='Home'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={25}
              name={focused ? "robot" : "robot-outline"}
              color={focused ? themes.Colors.primary : themes.Colors.secondary}
            />
          ),
        }}
        component={ChatBot}
        name='ChatBot'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={26}
              name={focused ? "doctor" : "doctor"}
              color={focused ? themes.Colors.primary : themes.Colors.secondary}
            />
          ),
        }}
        component={Doctor}
        name='Doctor'
      />

      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              name={focused ? "leaf-sharp" : "leaf-outline"}
              size={25}
              color={focused ? themes.Colors.primary : themes.Colors.secondary}
            />
          ),
        }}
        component={Herb}
        name='Herb'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-group" : "account-group-outline"}
              size={24}
              color={focused ? themes.Colors.primary : themes.Colors.secondary}
            />
          ),
        }}
        component={SocialNetwork}
        name='SocialNetwork'
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
