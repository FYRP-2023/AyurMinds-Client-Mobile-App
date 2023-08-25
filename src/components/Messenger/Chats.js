import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { style } from './Messenger.styles';
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { useState } from 'react';
import { TouchableHighlight } from 'react-native';

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
         <View>
           <Text>I am {data.item.text} in a SwipeListView</Text>
         </View>
       </TouchableHighlight>
     );

     const renderHiddenItem = (data, rowMap) => (
       <View style={style.rowBack}>
         <Text>Left</Text>
         <TouchableOpacity
           style={[style.backRightBtn, style.backRightBtnRight]}
           onPress={() => deleteRow(rowMap, data.item.key)}
         >
           <Text style={style.backTextWhite}>Delete</Text>
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
             leftOpenValue={75}
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