import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Card, Divider, TextInput } from "react-native-paper";
import themes from "../../common/theme/themes";
import ChatbotIcon from "../../../assets/chatbotIcon.svg";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import AyurMindsApi from "../../api/apiService";
import { getAxiosInstance } from "../../utils/axios";
import { AirbnbRating } from "react-native-ratings";
import { useEffect } from "react";
import Map from "../../components/Map";

export default function Doctor({ route, navigation }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDoctorDetailsOpen, setDoctorDetailsOpen] = useState(true);
  const [isDoctorPlacesOpen, setDoctorPlacesOpen] = useState(true);
  const [isDoctorPlaceOpen, setDoctorPlaceOpen] = useState(false);
  const [isDoctorDetailsRatingsOpen, setDoctorDetailsRatingsOpen] =
    useState(true);
  const menuPosition = useRef(new Animated.Value(-300)).current;
  const doctor = route.params.doctor;
  const navigate = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const goChat = async () => {
    try {
      const res = await getAxiosInstance().post(
        AyurMindsApi.message_service.accessChat + "?id=" + user._id,
        {
          userId: doctor._id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        let sender;
        let reciver;

        for (const u of res.data.users) {
          if (u._id === user._id) {
            sender = u;
          } else {
            reciver = u;
          }
        }
        navigate.navigate("Chat", { sender, reciver, chat: res.data });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: chat.js:137 ~ handleSend ~ error:",
        error.response.data
      );
    }
  };

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

  console.log(
    "🚀 ~ file: Doctor.js:97 ~ Doctor ~ overallRating:",
    doctor.doctor.ratings
  );

    const calculateOverallRating = () => {
      if (doctor.doctor.ratings.length === 0) return 0;

      const totalRating = doctor.doctor.ratings.reduce(
        (acc, rating) => acc + rating.rate,
        0
      );
      return totalRating / doctor.doctor.ratings.length;
    };
 const overallRating =    calculateOverallRating();


  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View>
          <Text style={{ ...themes.Typography.subHeading, color: "#FFFFFF" }}>
            {doctor.firstName + " " + doctor.lastName}
          </Text>
        </View>
        <View></View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.doctorAvatar}>
            <Image source={{ uri: doctor.avatar }} style={styles.avatar} />
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#B7B9BB",
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
                borderRadius: 50,
                marginBottom: 5,
              }}
              onPress={() => {
                setDoctorDetailsOpen(!isDoctorDetailsOpen);
              }}
            >
              <Text style={{ ...themes.Typography.title }}>Doctor Details</Text>
              {isDoctorDetailsOpen ? (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color="#616161"
                />
              ) : (
                <MaterialIcons name="arrow-right" size={24} color="#616161" />
              )}
            </TouchableOpacity>
          </View>
          {isDoctorDetailsOpen && (
            <View style={styles.doctorDetails}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...themes.Typography.body }}>Full Name :</Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...themes.Typography.title2,
                    }}
                  >
                    {doctor.firstName + " " + doctor.lastName}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...themes.Typography.body }}>Contact No :</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ ...themes.Typography.title2 }}>
                    {doctor.doctor.contactNo}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...themes.Typography.body }}>Description :</Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...themes.Typography.title2,
                    }}
                  >
                    {doctor.doctor.bio}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...themes.Typography.body }}>Verified :</Text>
                <Text style={{ ...themes.Typography.title2 }}>
                  {doctor.doctor.isVerified ? "Yes" : "No"}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...themes.Typography.body }}>
                  Specialized Diseases :
                </Text>
                <View>
                  {doctor.doctor.specializedIn.map((data) => {
                    return (
                      <View key={data._id} style={{ flex: 1 }}>
                        <Text style={{ ...themes.Typography.title2 }}>
                          {data.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          )}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#B7B9BB",
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
                borderRadius: 50,
                marginBottom: 5,
              }}
              onPress={() => {
                setDoctorPlacesOpen(!isDoctorPlacesOpen);
              }}
            >
              <Text style={{ ...themes.Typography.title }}>
                Available Places
              </Text>
              {isDoctorPlacesOpen ? (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color="#616161"
                />
              ) : (
                <MaterialIcons name="arrow-right" size={24} color="#616161" />
              )}
            </TouchableOpacity>
            {isDoctorPlacesOpen && (
              <View>
                {doctor.doctor.availablePlaces.length > 0 ? (
                  <View style={{ flex: 1, marginBottom: 5 }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        gap: 5,
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: "#D1D1D1",
                          width: "30%",
                        }}
                      >
                        <Text style={{ ...themes.Typography.body }}>Place</Text>
                      </View>
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: "#D1D1D1",
                          width: "30%",
                        }}
                      >
                        <Text style={{ ...themes.Typography.body }}>
                          Distence
                        </Text>
                      </View>
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: "#D1D1D1",
                          width: "35%",
                        }}
                      >
                        <Text style={{ ...themes.Typography.body }}>
                          Location
                        </Text>
                      </View>
                    </View>
                    {doctor.doctor.availablePlaces.map((data, index) => {
                      return <Map key={index} data={data} />;
                    })}
                  </View>
                ) : (
                  <View style={{ flex: 1 }}>
                    <Text style={{ ...themes.Typography.body_light }}>
                      No any available places
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#B7B9BB",
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
                borderRadius: 50,
                marginBottom: 5,
              }}
              onPress={() => {
                setDoctorDetailsRatingsOpen(!isDoctorDetailsRatingsOpen);
              }}
            >
              <Text style={{ ...themes.Typography.title }}>
                Ratings and Reviews
              </Text>
              {isDoctorDetailsRatingsOpen ? (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color="#616161"
                />
              ) : (
                <MaterialIcons name="arrow-right" size={24} color="#616161" />
              )}
            </TouchableOpacity>
            {isDoctorDetailsRatingsOpen && (
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ ...styles.rating }}>
                    {overallRating ? overallRating.toFixed(1) + "/5" : "N/A"}
                  </Text>
                  <AirbnbRating
                    count={5}
                    defaultRating={overallRating}
                    size={30}
                    showRating={false}
                    isDisabled={true} // Disable user interaction
                    starContainerStyle={styles.starContainer}
                  />
                  <Text style={{}}>
                    {doctor.doctor.ratings.length + " of users rated"}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
                  <View style={{ flex: 1, flexDirection: "row", gap: 20 }}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Entypo name="emoji-happy" size={40} color="green" />
                      <Text style={{ marginTop: 2 }}>60%</Text>
                    </View>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Entypo name="emoji-neutral" size={40} color="blue" />
                      <Text style={{ marginTop: 2 }}>25%</Text>
                    </View>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Entypo name="emoji-sad" size={40} color="red" />
                      <Text style={{ marginTop: 2 }}>15%</Text>
                    </View>
                  </View>
                  <Text style={{}}>
                    {doctor.doctor.reviews.length + " of users reviwed"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#616161",
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    borderRadius: 25,
                    marginTop: 20,
                    width: 200,
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#FFFFFF",
                      padding: 6,
                      fontFamily: "Urbanist-Bold",
                    }}
                  >
                    Rate & Review Me 🤩
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fixedButton}>
        <MaterialCommunityIcons
          size={28}
          name="chat"
          color="white"
          onPress={() => goChat()}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  starContainer: {
    marginTop: 10,
  },
  rating: {
    fontSize: 32,
    marginTop:20
  },
  // Fixed button styles
  fixedButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: themes.Colors.primary, // Change the background color as needed
    padding: 10,
    borderRadius: 100,
    elevation: 2,
  },
  fixedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    height: "100%",
    width: "100%",
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
    width: 150,
    height: 150,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  doctorList: {
    // justifyContent: "space-between",
  },
  doctorAvatar: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  doctorItem: {
    marginBottom: 10,
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  doctorName: {
    fontSize: 18,
    fontFamily: "Urbanist-Regular",
  },
  doctorDetails: {},
});
