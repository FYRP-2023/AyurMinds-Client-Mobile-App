import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { style } from './Messenger.styles';
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from 'react-native';
import { Text, Card, Image } from "react-native";
import { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { Feather } from "@expo/vector-icons";

const Chats = () => {
  
    const [listData, setListData] = useState(
      Array(20)
        .fill("")
        .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    );

     const closeRow = (rowMap, rowKey) => {
       if (rowMap[rowKey]) {
         rowMap[rowKey].closeRow();
       }
     };

     const deleteRow = (rowMap, rowKey) => {
       console.log("🚀 ~ file: Chats.js:23 ~ deleteRow ~ rowKey:", rowKey)
       console.log("🚀 ~ file: Chats.js:23 ~ deleteRow ~ rowMap:", rowMap)
       closeRow(rowMap, rowKey);
     };

     const onRowDidOpen = (rowKey) => {
       console.log("This row opened", rowKey);
     };

     const renderItem = (data) => (
       <TouchableHighlight
         onPress={() => console.log("You touched me")}
         style={style.rowFront}
         underlayColor={"#AAA"}
       >
         <View style={style.chatContainer}>
           <Image source={""} style={style.avatar} />
           <View style={style.textContainer}>
             <Text style={style.imageName}>Name</Text>
             <Text style={style.latestMessage}>Message</Text>
           </View>
         </View>
       </TouchableHighlight>
     );

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
       <SafeAreaView>
         <View style={style.container}>
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
       </SafeAreaView>
     );
}

export default Chats