import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Card, Divider, TextInput } from "react-native-paper";
import themes from "../common/theme/themes";
import ChatbotIcon from "../../assets/chatbotIcon.svg";
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const dummyChats = [
 
];

export default function Doctor() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuPosition = useRef(new Animated.Value(-300)).current;

  const openMenu = () => {
    Animated.timing(menuPosition, {
      toValue: 0, // Open the menu
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(true);
  };

  const closeMenu = () => {
    Animated.timing(menuPosition, {
      toValue: -300, // Close the menu
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu(); // Close the menu when it's already open
    } else {
      openMenu(); // Open the menu when it's closed
    }
  };

  return (
    <>
      <View style={styles.header}>
        {isMenuOpen ? (
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialCommunityIcons
              name="filter-off-outline"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleMenu}>
            <AntDesign name="filter" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        <View>
          <Text style={{ ...themes.Typography.subHeading, color: "#FFFFFF" }}>
            Doctors
          </Text>
        </View>
        <View></View>
      </View>

      {/* Side Menu */}
      <Animated.View style={[styles.sideMenu, { left: menuPosition, top: 49 }]}>
        {/* Menu Content */}
        <View>
          {dummyChats.map((chat) => {
            return (
              <View style={styles.sideMenuItemContainer}>
                <View style={styles.sideMenuItem}>
                  <Ionicons name="chatbox-outline" size={20} color="#FFFFFF" />
                  <TouchableOpacity>
                    <Text
                      style={{ ...themes.Typography.title, color: "#FFFFFF" }}
                    >
                      {chat.chatName}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ paddingRight: 2 }}>
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </Animated.View>

      <View style={styles.container}>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    height: "100%",
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    backgroundColor: "#36454F",
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  sideMenu: {
    position: "absolute",
    zIndex: 1,
    right: -300, // Initially off-screen
    width: 300,
    height: "100%",
    backgroundColor: "#343434",
    padding: 5,
  },
  sideMenuItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    marginTop: 10,
  },
  sideMenuItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 120,
    height: 120,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    margin: 15,
    fontFamily: "Urbanist-Bold",
    color: "#BDBDBD",
    textAlign: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  card: {
    backgroundColor: "#F1F1F1",
    border: "none",
  },
  cardText: {
    fontSize: 18,
    padding: 5,
    fontFamily: "Urbanist-Regular",
    color: "#BDBDBD",
    textAlign: "center",
  },
  inputContainer: {
    paddingTop: 10,
    margin: 10,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
  },
});
