import React, { useEffect } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { style } from './Messenger.styles';
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from 'react-native';
import { Text, Card, Image } from "react-native";
import { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import themes from '../../common/theme/themes';

const Chats = ({ searchText }) => {
  const data = useSelector((state) => state.chat.messages);
  const [listData, setListData] = useState(data);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigation();
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  useEffect(() => {
    let newList = [];
    if (searchText === undefined || searchText === null || searchText === "") {
      setListData(data);
    } else {
      if (listData.length > 0) {
        for (const data of listData) {
          for (let u of data.users) {
            if (u._id != user._id) {
              const fName = u.firstName;
              const lName = u.lastName;
              const fullName = fName + " " + lName;
              if (fullName.toLocaleLowerCase().includes(searchText.toLowerCase())) {
                newList.push(data);
              }
            }
          }
        }
        setListData(newList);
      }
    }

  }, [searchText]);
  

  const deleteRow = (rowMap, rowKey) => {
    console.log("🚀 ~ file: Chats.js:23 ~ deleteRow ~ rowKey:", rowKey);
    console.log("🚀 ~ file: Chats.js:23 ~ deleteRow ~ rowMap:", rowMap);
    closeRow(rowMap, rowKey);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data) => {
    let sender;
    let reciver;

    for (const u of data.item.users) {
      if (u._id === user._id) {
        sender = u;
      } else {
        reciver = u;
      }
    }
    return (
      <TouchableHighlight
        onPress={() => {
          navigate.navigate("Chat", { sender, reciver, chat: data.item });
        }}
        style={style.rowFront}
        underlayColor={"#AAA"}
      >
        <View style={style.chatContainer}>
          <Image
            source={{
              uri: reciver.avatar,
            }}
            style={style.avatar}
          />
          <View style={style.textContainer}>
            <Text style={themes.Typography.body}>
              {reciver.firstName + " " + reciver.lastName}
            </Text>
            {data.item.latestMessage && (
              <Text style={style.latestMessage}>
                {data.item.latestMessage.content}
              </Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={style.rowBack}>
      <TouchableOpacity
        style={[style.backRightBtn, style.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Feather name="trash-2" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-50}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
};

export default Chats