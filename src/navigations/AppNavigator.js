import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../screens/Home";
import ChatBot from "../screens/ChatBot";
import Doctor from "../screens/Doctor";
import SocialNetwork from "../screens/SocialNetwork";
import Herb from "../screens/Herb";

const Tab = createMaterialTopTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={Home} name='Home' />
      <Tab.Screen component={ChatBot} name='ChatBot' />
      <Tab.Screen component={Doctor} name='Doctor' />
      <Tab.Screen component={SocialNetwork} name='SocialNetwork' />
      <Tab.Screen component={Herb} name='Herb' />
    </Tab.Navigator>
  );
};

export default AppNavigator;
