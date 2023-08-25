import { Text, View } from "react-native";
import React, { Component } from "react";
import AppNavigator from "../navigations/AppNavigator";
import { style } from "../components/Messenger/Messenger.styles";
import { SafeAreaView } from "react-native";
import { TextInput } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import themes from "../common/theme/themes";
import Chats from "../components/Messenger/Chats";

const Messenger = () => {
  const myChatList = [];
  return (
    <SafeAreaView>
      <View style={style.container}>
        <SafeAreaView style={style.view_container}>
          <View style={style.search_view}>
            <TextInput
              style={style.input}
              placeholder="Search..."
              right={
                <Ionicons
                  name="search"
                  size={24}
                  color={themes.Colors.secondary}
                />
              }
            />
          </View>
        </SafeAreaView>
        <SafeAreaView>
          <Chats/>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default Messenger;
