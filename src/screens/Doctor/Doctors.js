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
import themes from "../../common/theme/themes";
import ChatbotIcon from "../../../assets/chatbotIcon.svg";
import { AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

const doctors = [
  {
    doctor: {
      contactNo: "0776659628",
      isVerified: false,
      specializedIn: [
        {
          name: "disease 01",
          _id: 1,
        },
        {
          name: "disease 02",
          _id: 2,
        },
        {
          name: "disease 03",
          _id: 3,
        },
        {
          name: "disease 04",
          _id: 4,
        },
        {
          name: "disease 05",
          _id: 5,
        },
      ],
      verificationDocs: [],
      ratings: [
        {
          user: {
            _id: 1,
          },
          rate: 4,
        },
        {
          user: {
            _id: 2,
          },
          rate: 2,
        },
        {
          user: {
            _id: 3,
          },
          rate: 4,
        },
      ],
      reviews: [],
      availablePlaces: [
        {
          cordinate: "6.732954, 79.921078",
          timeSlots: [
            {
              from: "3.00.PM",
              to: "6.00.PM",
              isAvailable: true,
            },
            {
              from: "8.00.AM",
              to: "1.00.PM",
              isAvailable: true,
            },
          ],
        },
        {
          cordinate: "6.732954, 79.921078",
          timeSlots: [
            {
              from: "3.00.PM",
              to: "6.00.PM",
              isAvailable: true,
            },
            {
              from: "8.00.AM",
              to: "1.00.PM",
              isAvailable: true,
            },
          ],
        },
      ],
      bio: "kalkas asjdklajsd akjsdklasjd klajsdkljasd kajsdklajsd aksjdklasj daskjdapospd aoskdaskdll;as daopskdlaksd;a poaksod;lkas;dkapos dasokdlaksdlakspodk oaksd;olkas;do opaksdoakl;kal;d sasokdposakdaskdpo opkasodpkasop opaskdosakdopas poaksdpokasopdkpo oaksdopaskdopkaspd0awd oklaksdolaks daoskdoasda[psokdaskd kal;scas;dka sdkok",
    },
    pharmacist: {
      isVerified: false,
      verificationDocs: [],
      ratings: [
        {
          user: {
            _id: 1,
          },
          rate: 4,
        },
        {
          user: {
            _id: 2,
          },
          rate: 2,
        },
        {
          user: {
            _id: 3,
          },
          rate: 4,
        },
      ],
      reviews: [],
    },
    _id: "64e8d047b61479919c13c21b",
    firstName: "super",
    lastName: "admin",
    email: "ayurminds.cosmosighttech@gmail.com",
    role: "super_admin",
    avatar:
      "https://res.cloudinary.com/dzhhvabny/image/upload/v1689611678/default_avatar/default-avatar.jpg",
    languageId: "1",
    isDoctor: false,
    isPharmacist: false,
    createdAt: "2023-08-25T16:01:11.753Z",
    updatedAt: "2023-08-25T16:01:11.753Z",
    __v: 0,
  },
];

export default function Doctors({ navigation }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuPosition = useRef(new Animated.Value(-300)).current;
  const navigate = useNavigation()

  const showDocDetails =(data)=>{
    navigate.navigate("DoctorDetails", { doctor: data });
  }

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
          <View style={styles.sideMenuItemContainer}>
            <View style={styles.sideMenuItem}>
              <Ionicons name="chatbox-outline" size={20} color="#FFFFFF" />
              <TouchableOpacity>
                <Text style={{ ...themes.Typography.title, color: "#FFFFFF" }}>
                  hi
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ paddingRight: 2 }}>
              <MaterialIcons name="delete-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.doctorList}>
          {doctors.map((doctor) => (
            <TouchableOpacity
              key={doctor._id}
              style={styles.doctorItem}
              onPress={() => {
                showDocDetails(doctor);
              }}
            >
              <View style={styles.card}>
                <Image source={{ uri: doctor.avatar }} style={styles.avatar} />
                <Text style={styles.doctorName}>
                  {doctor.firstName} {doctor.lastName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    gap:10,
    marginBottom: 10,
    flex: 1,
    flexDirection: "row",
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
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  doctorList: {
    alignItems: "center",
  },
  doctorItem: {
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
  },
  doctorName: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Urbanist-Regular",
  },
});
