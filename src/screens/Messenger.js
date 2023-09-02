import { Text, View } from "react-native";
import React, { Component, useState } from "react";
import AppNavigator from "../navigations/AppNavigator";
import { style } from "../components/Messenger/Messenger.styles";
import { SafeAreaView } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import themes from "../common/theme/themes";
import Chats from "../components/Messenger/Chats";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

const Messenger = () => {
const [searchText,setSearchText]=useState("")

  const handleSearch =(e) => {
    setSearchText(e)
  }

  return (
    // <SafeAreaView>
    <View style={style.container}>
      <View style={style.search_view}>
        <TextInput
          style={{
            height: 40,
            width: "100%",
            borderBottomColor: themes.Colors.primary,
            borderBottomWidth: 1,
            marginBottom: 10,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
          placeholder="Search..."
          left={<TextInput.Icon icon="magnify" color={themes.Colors.primary} />}
          onChangeText={(e) => handleSearch(e)}
        />
      </View>
      <View style={style.chat_container}>
        <Chats searchText={searchText} />
      </View>
    </View>
    // </SafeAreaView>
  );
};

export default Messenger;
