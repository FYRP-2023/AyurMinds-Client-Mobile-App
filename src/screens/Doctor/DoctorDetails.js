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
import { Button, Card, Chip, Divider, TextInput } from "react-native-paper";
import themes from "../../common/theme/themes";
import ChatbotIcon from "../../../assets/chatbotIcon.svg";
import MultiSelect from "react-native-multiple-select";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import AyurMindsApi from "../../api/apiService";
import { getAxiosInstance } from "../../utils/axios";
import { AirbnbRating } from "react-native-ratings";
import { useEffect } from "react";
import Map from "../../components/Map";
import { authActions } from "../../store/authSlice";
import { info } from "../../actions/authActions";
let ITEMS = [];
export default function DoctorDetails({ navigation }) {
  const [selectedItems, setselectedItems] = useState([]);
  const multiSelectRef = useRef(null);
  const [allDiseases, setallDiseases] = useState([]);
  const [availablePlacesData, setavailablePlacesData] = useState([]);
  const [callback, setCallBack] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDoctorDetailsOpen, setDoctorDetailsOpen] = useState(true);
  const [isDoctorPlacesOpen, setDoctorPlacesOpen] = useState(true);
  const [isDoctorPlaceOpen, setDoctorPlaceOpen] = useState(false);
  const [isDoctorDetailsRatingsOpen, setDoctorDetailsRatingsOpen] =
    useState(true);
  const menuPosition = useRef(new Animated.Value(-300)).current;
  const navigate = useNavigation();
  const doctor = useSelector((state) => state.auth.user);
  const [bio, setBio] = useState(doctor.doctor.bio);
  const [contactNo, setcontactNo] = useState(doctor.doctor.contactNo);
  const [specializedIn, setcspecializedIn] = useState(
    doctor.doctor.specializedIn
  );
  const calculateOverallRating = () => {
    if (doctor.doctor.ratings.length === 0) return 0;

    const totalRating = doctor.doctor.ratings.reduce(
      (acc, rating) => acc + rating.rate,
      0
    );
    return totalRating / doctor.doctor.ratings.length;
  };
  const overallRating = calculateOverallRating();

  useEffect(() => {
    const getDiseases = async () => {
      if (doctor) {
        try {
          const res = await getAxiosInstance().get(
            AyurMindsApi.doctor_service.getDiseases,
            {
              withCredentials: true,
            }
          );
          setCallBack(false);
          setallDiseases(res.data);
        } catch (error) {
          console.log(
            "🚀 ~ file: DoctorDetails.js:68 ~ getDiseases ~ error:",
            error
          );
        }
      }
    };
    if (isEditMode && callback) getDiseases();
  }, [callback, doctor, ITEMS, isEditMode]);

  const [selectedItemData, setSelectedItemData] = useState([]);
  console.log(
    "🚀 ~ file: DoctorDetails.js:87 ~ DoctorDetails ~ selectedItemData:",
    selectedItemData
  );
  const [selectedItemDataCall, setSelectedItemDataCall] = useState(true);



  const onSelectedItemsChange = (selectedItems) => {
    setselectedItems(selectedItems);
      setSelectedItemDataCall(true);
  };

  useEffect(() => {
    if (isEditMode) {
      let sItems = [];
      for (const selDises of doctor.doctor.specializedIn) {
        sItems.push(selDises._id);
      }
      setselectedItems(sItems);
      setSelectedItemDataCall(true);
    }
  }, [isEditMode]);

    useEffect(() => {
      if (
        selectedItemDataCall &&
        allDiseases.length > 0 &&
        selectedItems.length > 0
      ) {
        let sid = [];
        for (const d of selectedItems) {
          for (const de of allDiseases) {
            if (d == de._id) {
              sid.push({
                _id: de._id,
                name: de.name,
              });
            }
          }
        }
        setSelectedItemData(sid);
        setSelectedItemDataCall(false);
      }
    }, [selectedItemDataCall, allDiseases, selectedItems]);

  const handleRemoveItems = (id) => {
    const data = selectedItems.filter((i) => {
      return i != id;
    });
    setselectedItems(data);
      setSelectedItemDataCall(true);
  };
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token);
  const handleupdate = async () => {
    try {
        const res = await getAxiosInstance().patch(
          AyurMindsApi.doctor_service.updateDoctorDetails,
          {
            bio,
            contactNo,
            userId: doctor._id,
            specializedIn: selectedItems,
            availablePlaces: availablePlacesData,
          },
          {
            withCredentials: true,
          }
        );
        // setCallBack(true);
        await dispatch(info(token, navigate));
        setIsEditMode(false)
          setSelectedItemDataCall(true);
    } catch (error) {
        console.log("🚀 ~ file: DoctorDetails.js:138 ~ handleupdate ~ error:", error)
        
    }
  };

  return (
    <>
      <View key={doctor._id} style={styles.header}>
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
        <TouchableOpacity
          onPress={() => {
            setIsEditMode(!isEditMode);
          }}
        >
          {isEditMode ? (
            <MaterialIcons name="edit-off" size={24} color="#FF0000" />
          ) : (
            <Feather name="edit" size={24} color="#FFFFFF" />
          )}
        </TouchableOpacity>
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
              {isEditMode ? (
                <>
                  <View>
                    <Text style={themes.Typography.title}>Description</Text>
                    <TextInput
                      multiline
                      style={{
                        height: 40,
                        width: "100%",
                        borderBottomColor: themes.Colors.primary,
                        borderBottomWidth: 1,
                        marginBottom: 10,
                        backgroundColor: "#FFFF",
                      }}
                      placeholder="Describe your self here..."
                      onChangeText={(text) => setBio(text)}
                      value={bio}
                      // right={<AntDesign name='eyeo' size={24} color='red' />}
                    />
                  </View>
                  <View>
                    <Text style={themes.Typography.title}>Contact No</Text>
                    <TextInput
                      style={{
                        height: 40,
                        width: "100%",
                        borderBottomColor: themes.Colors.primary,
                        borderBottomWidth: 1,
                        marginBottom: 10,
                        backgroundColor: "#FFFF",
                      }}
                      placeholder="0776669965"
                      onChangeText={(text) => setcontactNo(text)}
                      value={contactNo}
                      // right={<AntDesign name='eyeo' size={24} color='red' />}
                    />
                  </View>
                  <View>
                    <Text style={themes.Typography.title}>
                      Specialized Diseases
                    </Text>
                    <View style={{}}>
                      <MultiSelect
                        hideTags
                        items={allDiseases}
                        uniqueKey="_id"
                        ref={multiSelectRef}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Pick what you specialized"
                        searchInputPlaceholderText="Search diseases..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily="Urbanist-Semi-Bold"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor={themes.Colors.primary}
                        tagTextColor="#000"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{
                          height: 40,
                          width: "100%",
                          borderBottomColor: themes.Colors.primary,
                          borderBottomWidth: 1,
                          marginBottom: 10,
                          backgroundColor: "#FFFF",
                        }}
                        submitButtonColor="#CCC"
                        submitButtonText="Done"
                      />
                    </View>
                    <View
                      style={{
                        marginBottom: 5,
                        gap: 5,
                        justifyContent: "space-between",
                      }}
                    >
                      {selectedItemData.map((i) => {
                        return (
                          <Chip
                            key={i._id}
                            onClose={() => handleRemoveItems(i._id)}
                          >
                            {i.name}
                          </Chip>
                        );
                      })}
                    </View>
                  </View>
                  <View style={{ alignItems: "center", marginBottom: 5 }}>
                    <Button
                      style={themes.PrimaryBtnSmall}
                      onPress={handleupdate}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          fontSize: 16,
                          fontFamily: "Urbanist-Semi-Bold",
                        }}
                      >
                        Update
                      </Text>
                    </Button>
                  </View>
                </>
              ) : (
                <>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ ...themes.Typography.body }}>
                      Full Name :
                    </Text>
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
                    <Text style={{ ...themes.Typography.body }}>
                      Contact No :
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ ...themes.Typography.title2 }}>
                        {doctor.doctor.contactNo}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ ...themes.Typography.body }}>
                      Description :
                    </Text>
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
                    <Text style={{ ...themes.Typography.body }}>
                      Verified :
                    </Text>
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
                </>
              )}
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
                {isEditMode ? (
                  doctor.doctor.availablePlaces.length > 0 ? (
                    <>
                      <View>
                        <Button
                          style={themes.PrimaryBtnSmall}
                          onPress={handleupdate}
                        >
                          <Text
                            style={{
                              color: "#FFF",
                              fontSize: 16,
                              fontFamily: "Urbanist-Semi-Bold",
                            }}
                          >
                            Add Your Work Place
                          </Text>
                        </Button>
                      </View>
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <>
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
                            <Text style={{ ...themes.Typography.body }}>
                              Place
                            </Text>
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
                  </>
                )}
              </View>
            )}
          </View>
          {!isEditMode ? (
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
                  <View
                    style={{ flex: 1, alignItems: "center", marginTop: 30 }}
                  >
                    <View style={{ flex: 1, flexDirection: "row", gap: 20 }}>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Entypo name="emoji-happy" size={40} color="green" />
                        <Text style={{ marginTop: 2 }}>60%</Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Entypo name="emoji-neutral" size={40} color="blue" />
                        <Text style={{ marginTop: 2 }}>25%</Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Entypo name="emoji-sad" size={40} color="red" />
                        <Text style={{ marginTop: 2 }}>15%</Text>
                      </View>
                    </View>
                    <Text style={{}}>
                      {doctor.doctor.reviews.length + " of users reviwed"}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
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
    marginTop: 20,
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
