import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import themes from "../../common/theme/themes";
import ContentList from "./ContentList";
import { CONTENT_TYPE_QUESTION, CONTENT_TYPE_ARTICLE } from "../../constants/SocialNetworkConstants";
import SocialNetworkUserContentNavigator from '../../navigations/SocialNetworkUserContentNavigator'

const Tab = createMaterialBottomTabNavigator();

const SocialNetworkBottomTabNavigator = () => {
  return (
    <Tab.Navigator activeColor={themes.Colors.primary} barStyle={{ backgroundColor: '#ffffff', height: 70 }} >
      <Tab.Screen
        name="Questions"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              size={25}
              name={focused ? "comment-question" : "comment-question-outline"}
              color={
                focused ? themes.Colors.primary : themes.Colors.secondary
              }
            />
          ),
        }}
      >
        {() => <ContentList contentType={CONTENT_TYPE_QUESTION} />}
      </Tab.Screen>

      <Tab.Screen
        name="Articles"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              size={25}
              name={focused ? "note-text" : "note-text-outline"}
              color={
                focused ? themes.Colors.primary : themes.Colors.secondary
              }
            />
          ),
        }}
      >
        {() => <ContentList contentType={CONTENT_TYPE_ARTICLE} />}
      </Tab.Screen>

      <Tab.Screen
        name="My Content"
        component={SocialNetworkUserContentNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              size={25}
              name={focused ? "post" : "post-outline"}
              color={
                focused ? themes.Colors.primary : themes.Colors.secondary
              }
            />
          ),
        }}
      />
    </Tab.Navigator >
  );
};

export default SocialNetworkBottomTabNavigator;
