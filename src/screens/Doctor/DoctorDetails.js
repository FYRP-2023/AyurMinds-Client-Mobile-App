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
import {
  Button,
  Card,
  Chip,
  Divider,
  Modal,
  TextInput,
} from "react-native-paper";
import themes from "../../common/theme/themes";
import ChatbotIcon from "../../../assets/chatbotIcon.svg";
import MultiSelect from "react-native-multiple-select";
import * as Location from "expo-location";
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
import MapView, { Marker } from "react-native-maps";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

let ITEMS = [];

const DayTypes = ["EveryDay", "Weekdays", "Weekends"];




export default function DoctorDetails({ navigation }) {
  //   DateTimePickerAndroid.open({params: AndroidNativeProps})
  // DateTimePickerAndroid.dismiss({mode: AndroidNativeProps['mode']})
  // Example usage:
  const minNumber = 1;
  const maxNumber = 100000000;
  const [selectedItems, setselectedItems] = useState([]);
  const multiSelectRef = useRef(null);
  const [allDiseases, setallDiseases] = useState([]);
  const [availablePlacesData, setavailablePlacesData] = useState([]);
  const [callback, setCallBack] = useState(true);
  const [locationName, setLocationName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
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
  const [availablePlaces, setAvailablePlaces] = useState([
    ...doctor.doctor.availablePlaces,
  ]);
 
  const [availablePlace, setAvailablePlace] = useState({
    id: 0,
    name: "",
    cordinate: {},
    timeSlots: [
      {
        id: 0,
        daysType: "",
        from: "",
        to: "",
        isAvailable: false,
      },
    ],
  });
    const [specializedIn, setcspecializedIn] = useState(
    doctor.doctor.specializedIn
  );

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [addNewLoaction, setAddnNewLocation] = useState(false);
  const [placeaddress, setPlaceaddress] = useState(null);
  const [addressInput, setAddressInput] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [isUpdateButtonDisable, setIsUpdateButtonDisable] = useState(false);
  const [showMap, setShowMap] = useState(false);
  let usedNumbers =[];

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  // Function to generate a unique random number
  const generateUniqueRandomNumber=(min, max)=> {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (usedNumbers.includes(randomNumber));

    usedNumbers.push(randomNumber); // Add the generated number to the used numbers array

    return randomNumber;
  }

  function getTimeFromTimestamp(timestamp) {
    // Create a Date object from the timestamp string
    const date = new Date(timestamp);

    // Get the individual time components
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // Return the time as a string
    return `${hours}:${minutes}:${seconds}`;
  }

  const handleConfirm = (date, data, type) => {
      let timeSlot = availablePlace.timeSlots.map((s) => {
        if(s.id === data.id ){
          return {
            id: s.id,
            daysType: s.daysType,
            from: type === "from" ? getTimeFromTimestamp(date): s.from,
            to:type === "to" ? getTimeFromTimestamp(date): s.to,
            isAvailable: s.isAvailable,
          };
        }
        return s
      });
      setAvailablePlace({ ...availablePlace, timeSlots: timeSlot });

    hideDatePicker();
    hideDatePicker1();
  };

  const handleMapPress = (latitude, longitude) => {
    setSelectedCoordinates({ latitude, longitude });
    setShowMap(true);
  };

  const handleAddressInput = async () => {
    try {
      const res = await fetchCoordinatesByAddress(addressInput);
      if (res && res.latitude && res.longitude) {
        setSelectedCoordinates({
          latitude: res.latitude,
          longitude: res.longitude,
        });
        setPlaceaddress(res.formatted_address);
        setShowMap(true);
      }
    } catch (error) {
      console.log("Error fetching coordinates by address:", error);
    }
  };

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
      if(availablePlace && availablePlace.timeSlots.length > 0){
          let avp = [];
          avp = availablePlace.timeSlots.map(ss=>{
            return {
              ...ss,
              id:generateUniqueRandomNumber(minNumber, maxNumber)
            }
          })
          setAvailablePlace({...availablePlace, timeSlots:avp})
      }
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
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const handleupdate = async () => {
    try {
      let newAvailblePlaces = [];
      newAvailblePlaces = availablePlaces.map((ap) => {
        let timeSlotes = [];
        timeSlotes = ap.timeSlots.map((ts) => {
          return {
            daysType: ts.daysType,
            from:ts.from,
            to: ts.to,
            isAvailable: true,
          };
        });

        return {
          name: ap.name,
          cordinate: ap.cordinate,
          timeSlots: timeSlotes,
        };
      });
      const res = await getAxiosInstance().patch(
        AyurMindsApi.doctor_service.updateDoctorDetails,
        {
          bio,
          contactNo,
          userId: doctor._id,
          specializedIn: selectedItems,
          availablePlaces: newAvailblePlaces,
        },
        {
          withCredentials: true,
        }
      );
      // setCallBack(true);
      await dispatch(info(token, navigate));
      setIsEditMode(false);
      setSelectedItemDataCall(true);
    } catch (error) {
      console.log(
        "🚀 ~ file: DoctorDetails.js:138 ~ handleupdate ~ error:",
        error
      );
    }
  };

  const handleAddLocation = () => {
    let docPlaces = availablePlacesData;
    
    const data = {
      id: generateUniqueRandomNumber(minNumber,maxNumber),
      name: availablePlace.name,
      cordinate: selectedCoordinates,
      timeSlots: availablePlace.timeSlots
    };

   
    docPlaces.push(data);
    setAvailablePlaces(docPlaces);
    setLocationName("");
    setAddnNewLocation(false);
    setSelectedCoordinates(null);
    setIsUpdateButtonDisable(false);
    setShowOptionsModal(false);
    setAvailablePlace({
      id: 0,
      name: "",
      cordinate: {},
      timeSlots: [
        {
          id: 0,
          daysType: "",
          from: "",
          to: "",
          isAvailable: false,
        },
      ],
    });
  };

  const getLiveLocation = async () => {
    try {
      // Check if location services are enabled
      const isEnabled = await Location.hasServicesEnabledAsync();
      if (isEnabled) {
        // Request permission to access the device's location
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          // Get the current location
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setSelectedCoordinates({ latitude, longitude });
          setInitLoad(false);
        } else {
          // Handle the case when location permission is not granted
          setLocationEnabled(false);
        }
      } else {
        // Handle the case when location services are disabled
        setLocationEnabled(false);
      }
    } catch (error) {
      console.log("🚀 ~ file: Map.js:20 ~ error:", error);
    }
  };

  const [initLoad, setInitLoad] = useState(true);
  useEffect(() => {
    getLiveLocation();
  }, [initLoad, isEditMode]);

  const handleDayTypeChange = (item, data)=>{
     let timeSlot = availablePlace.timeSlots.map((s) => {
       if (s.id === data.id) {
         return {
           id: s.id,
           daysType: item,
           from: s.from,
           to: s.to,
           isAvailable: s.isAvailable,
         };
       }
       return s;
     });
     setAvailablePlace({ ...availablePlace, timeSlots: timeSlot });

  }



  return (
    <>
      <View key={doctor._id} style={{ ...styles.header }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginLeft: 10, marginRight: 10 }}
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
            setAddnNewLocation(false);
            setShowOptionsModal(false);
            setIsUpdateButtonDisable(false);
          }}
          style={{ marginLeft: 10, marginRight: 10 }}
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
                  availablePlaces.length === 0 ? (
                    !showOptionsModal ? (
                      <>
                        <View style={{ alignItems: "center" }}>
                          <Button
                            style={themes.SecondaryBtnLarge2}
                            onPress={() => {
                              setShowOptionsModal(!showOptionsModal);
                            }}
                          >
                            <Text
                              style={{
                                color: "#FFF",
                                fontSize: 16,
                                fontFamily: "Urbanist-Semi-Bold",
                              }}
                            >
                              Add New Work Place
                            </Text>
                          </Button>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={{ padding: 20, gap: 10 }}>
                          <Text style={themes.Typography.title}>Name</Text>
                          <TextInput
                            style={{
                              height: 40,
                              width: "100%",
                              borderBottomColor: themes.Colors.primary,
                              borderBottomWidth: 1,
                              marginBottom: 10,
                              placeholderTextColor: themes.Colors.secondary,
                              backgroundColor: "#ffff",
                            }}
                            placeholder="Name of the Place"
                            onChangeText={(text) =>
                              setAvailablePlace({
                                ...availablePlace,
                                name: text,
                              })
                            }
                            value={availablePlace.name}
                            // right={<AntDesign name='eyeo' size={24} color='red' />}
                          />
                          <Text style={themes.Typography.title}>Location</Text>
                          <Text style={themes.Typography.title2}>
                            Choose from Map
                          </Text>

                          {selectedCoordinates ? (
                            <MapView
                              style={styles.map}
                              region={region}
                              onPress={(e) =>
                                handleMapPress(
                                  e.nativeEvent.coordinate.latitude,
                                  e.nativeEvent.coordinate.longitude
                                )
                              }
                            >
                              <Marker
                                coordinate={selectedCoordinates}
                                title="Selected Location"
                              />
                            </MapView>
                          ) : (
                            <View style={styles.locationDisabledContainer}>
                              <Text style={styles.locationDisabledText}>
                                Location services are disabled. Please enable
                                them to use this feature.
                              </Text>
                              <TouchableOpacity
                                style={styles.enableLocationButton}
                                onPress={() => getLiveLocation()}
                              >
                                <Text style={styles.enableLocationButtonText}>
                                  Enable Location Services
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                          <View></View>
                          {availablePlace.timeSlots.map((p) => (
                            <View
                              key={p.id}
                              style={{
                                borderWidth: 2,
                                borderColor: "#4F645D",
                                padding: 10,
                                borderRadius: 50,
                              }}
                            >
                              <Text
                                style={{
                                  ...themes.Typography.title,
                                  marginTop: 10,
                                }}
                              >
                                Time Slot
                              </Text>
                              <View
                                style={{
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <View>
                                  <SelectDropdown
                                    defaultButtonText="Select Day Type"
                                    buttonTextStyle={{
                                      ...themes.Typography.title2,
                                      textAlign: "left",
                                    }}
                                    buttonStyle={{
                                      backgroundColor: "white",
                                      width: "100%",
                                      borderBottomWidth: 2,
                                      borderBottomColor: "#17CE92",
                                      marginBottom: 5,
                                    }}
                                    data={DayTypes}
                                    onSelect={(selectedItem, index) => {
                                      handleDayTypeChange(selectedItem, p);
                                    }}
                                    buttonTextAfterSelection={(
                                      selectedItem,
                                      index
                                    ) => {
                                      // text represented after item is selected
                                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                                      return p.daysType;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                      // text represented for each item in dropdown
                                      // if data array is an array of objects then return item.property to represent item in dropdown
                                      return item;
                                    }}
                                  />
                                </View>
                                <View
                                  style={{
                                    display: "flex",
                                    gap: 5,
                                  }}
                                >
                                  <View>
                                    <Button
                                      key={"btnfrom" + p.id}
                                      id={"btnfrom" + p.id}
                                      title="Show Date Picker"
                                      onPress={() => showDatePicker()}
                                      style={{
                                        borderColor: "#4F645D",
                                        borderWidth: 2,
                                        alignItems: "center",
                                        alignContent: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <MaterialCommunityIcons
                                        name="clock-outline"
                                        size={24}
                                        color="#4F645D"
                                        style={{
                                          padding: 10,
                                          marginLeft: 5,
                                          marginRight: 5,
                                        }}
                                      />{" "}
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          marginLeft: 5,
                                        }}
                                      >
                                        From: {" " + p.from}
                                      </Text>
                                    </Button>
                                    <DateTimePickerModal
                                      key={"from" + p.id}
                                      id={"from" + p.id}
                                      isVisible={isDatePickerVisible}
                                      mode="time"
                                      onConfirm={(date) =>
                                        handleConfirm(date, p, "from")
                                      }
                                      onCancel={() => hideDatePicker()}
                                    />
                                  </View>
                                  <View>
                                    <Button
                                      key={"btnto" + p.id}
                                      id={"btnto" + p.id}
                                      title="Show Date Picker"
                                      onPress={() => showDatePicker1()}
                                      style={{
                                        borderColor: "#4F645D",
                                        borderWidth: 2,
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      <MaterialCommunityIcons
                                        name="clock-outline"
                                        size={24}
                                        color="#4F645D"
                                        style={{
                                          padding: 5,
                                          padding: 10,
                                          marginLeft: 5,
                                          marginRight: 5,
                                        }}
                                      />{" "}
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          marginLeft: 5,
                                        }}
                                      >
                                        To: {" " + p.to}
                                      </Text>
                                    </Button>
                                    <DateTimePickerModal
                                      key={"to" + p.id}
                                      id={"to" + p.id}
                                      isVisible={isDatePickerVisible1}
                                      mode="time"
                                      onConfirm={(date) =>
                                        handleConfirm(date, p, "to")
                                      }
                                      onCancel={() => hideDatePicker1()}
                                    />
                                  </View>
                                </View>
                              </View>
                            </View>
                          ))}
                          <Button
                            onPress={() => {
                              let exTimeSlots = availablePlace.timeSlots;
                              const newTimeSlot = {
                                id: generateUniqueRandomNumber(
                                  minNumber,
                                  maxNumber
                                ),
                                daysType: "",
                                from: "",
                                to: "",
                                isAvailable: "",
                              };
                              exTimeSlots.push(newTimeSlot);
                              setAvailablePlace({
                                ...availablePlace,
                                timeSlots: exTimeSlots,
                              });
                            }}
                          >
                            Add Another New Time Slots
                          </Button>
                          <View style={{ alignItems: "center" }}>
                            <Button
                              style={themes.SecondaryBtnLarge2}
                              onPress={() => {
                                handleAddLocation();
                              }}
                            >
                              <Text
                                style={{
                                  color: "#FFF",
                                  fontSize: 16,
                                  fontFamily: "Urbanist-Semi-Bold",
                                }}
                              >
                                Add
                              </Text>
                            </Button>
                          </View>
                        </View>
                      </>
                    )
                  ) : (
                    <>
                      {showOptionsModal ? (
                        <View style={{ padding: 20, gap: 10 }}>
                          <Text style={themes.Typography.title}>Name</Text>
                          <TextInput
                            style={{
                              height: 40,
                              width: "100%",
                              borderBottomColor: themes.Colors.primary,
                              borderBottomWidth: 1,
                              marginBottom: 10,
                              placeholderTextColor: themes.Colors.secondary,
                              backgroundColor: "#ffff",
                            }}
                            placeholder="Name of the Place"
                            onChangeText={(text) =>
                              setAvailablePlace({
                                ...availablePlace,
                                name: text,
                              })
                            }
                            value={availablePlace.name}
                            // right={<AntDesign name='eyeo' size={24} color='red' />}
                          />
                          <Text style={themes.Typography.title}>Location</Text>
                          <Text style={themes.Typography.title2}>
                            Choose from Map
                          </Text>

                          {selectedCoordinates ? (
                            <MapView
                              style={styles.map}
                              region={region}
                              onPress={(e) =>
                                handleMapPress(
                                  e.nativeEvent.coordinate.latitude,
                                  e.nativeEvent.coordinate.longitude
                                )
                              }
                            >
                              <Marker
                                coordinate={selectedCoordinates}
                                title="Selected Location"
                              />
                            </MapView>
                          ) : (
                            <View style={styles.locationDisabledContainer}>
                              <Text style={styles.locationDisabledText}>
                                Location services are disabled. Please enable
                                them to use this feature.
                              </Text>
                              <TouchableOpacity
                                style={styles.enableLocationButton}
                                onPress={() => getLiveLocation()}
                              >
                                <Text style={styles.enableLocationButtonText}>
                                  Enable Location Services
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                          <View></View>
                          {availablePlace.timeSlots.map((p) => (
                            <View
                              key={p.id}
                              style={{
                                borderWidth: 2,
                                borderColor: "#4F645D",
                                padding: 10,
                                borderRadius: 50,
                              }}
                            >
                              <Text
                                style={{
                                  ...themes.Typography.title,
                                  marginTop: 10,
                                }}
                              >
                                Time Slot
                              </Text>
                              <View
                                style={{
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <View>
                                  <SelectDropdown
                                    defaultButtonText="Select Day Type"
                                    buttonTextStyle={{
                                      ...themes.Typography.title2,
                                      textAlign: "left",
                                    }}
                                    buttonStyle={{
                                      backgroundColor: "white",
                                      width: "100%",
                                      borderBottomWidth: 2,
                                      borderBottomColor: "#17CE92",
                                      marginBottom: 5,
                                    }}
                                    data={DayTypes}
                                    onSelect={(selectedItem, index) => {
                                      handleDayTypeChange(selectedItem, p);
                                    }}
                                    buttonTextAfterSelection={(
                                      selectedItem,
                                      index
                                    ) => {
                                      // text represented after item is selected
                                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                                      return p.daysType;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                      // text represented for each item in dropdown
                                      // if data array is an array of objects then return item.property to represent item in dropdown
                                      return item;
                                    }}
                                  />
                                </View>
                                <View
                                  style={{
                                    display: "flex",
                                    gap: 5,
                                  }}
                                >
                                  <View>
                                    <Button
                                      key={"btnfrom" + p.id}
                                      id={"btnfrom" + p.id}
                                      title="Show Date Picker"
                                      onPress={() => showDatePicker()}
                                      style={{
                                        borderColor: "#4F645D",
                                        borderWidth: 2,
                                        alignItems: "center",
                                        alignContent: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <MaterialCommunityIcons
                                        name="clock-outline"
                                        size={24}
                                        color="#4F645D"
                                        style={{
                                          padding: 10,
                                          marginLeft: 5,
                                          marginRight: 5,
                                        }}
                                      />{" "}
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          marginLeft: 5,
                                        }}
                                      >
                                        From: {" " + p.from}
                                      </Text>
                                    </Button>
                                    <DateTimePickerModal
                                      key={"from" + p.id}
                                      id={"from" + p.id}
                                      isVisible={isDatePickerVisible}
                                      mode="time"
                                      onConfirm={(date) =>
                                        handleConfirm(date, p, "from")
                                      }
                                      onCancel={() => hideDatePicker()}
                                    />
                                  </View>
                                  <View>
                                    <Button
                                      key={"btnto" + p.id}
                                      id={"btnto" + p.id}
                                      title="Show Date Picker"
                                      onPress={() => showDatePicker1()}
                                      style={{
                                        borderColor: "#4F645D",
                                        borderWidth: 2,
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      <MaterialCommunityIcons
                                        name="clock-outline"
                                        size={24}
                                        color="#4F645D"
                                        style={{
                                          padding: 5,
                                          padding: 10,
                                          marginLeft: 5,
                                          marginRight: 5,
                                        }}
                                      />{" "}
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          marginLeft: 5,
                                        }}
                                      >
                                        To: {" " + p.to}
                                      </Text>
                                    </Button>
                                    <DateTimePickerModal
                                      key={"to" + p.id}
                                      id={"to" + p.id}
                                      isVisible={isDatePickerVisible1}
                                      mode="time"
                                      onConfirm={(date) =>
                                        handleConfirm(date, p, "to")
                                      }
                                      onCancel={() => hideDatePicker1()}
                                    />
                                  </View>
                                </View>
                              </View>
                            </View>
                          ))}
                          <Button
                            onPress={() => {
                              let exTimeSlots = availablePlace.timeSlots;
                              const newTimeSlot = {
                                id: generateUniqueRandomNumber(
                                  minNumber,
                                  maxNumber
                                ),
                                daysType: "",
                                from: "",
                                to: "",
                                isAvailable: "",
                              };
                              exTimeSlots.push(newTimeSlot);
                              setAvailablePlace({
                                ...availablePlace,
                                timeSlots: exTimeSlots,
                              });
                            }}
                          >
                            Add Another New Time Slots
                          </Button>
                          <View style={{ alignItems: "center" }}>
                            <Button
                              style={themes.SecondaryBtnLarge2}
                              onPress={() => {
                                handleAddLocation();
                              }}
                            >
                              <Text
                                style={{
                                  color: "#FFF",
                                  fontSize: 16,
                                  fontFamily: "Urbanist-Semi-Bold",
                                }}
                              >
                                Add
                              </Text>
                            </Button>
                          </View>
                        </View>
                      ) : (
                        <>
                          {availablePlaces.map((ap) => (
                            <View
                              key={ap.id}
                              style={{
                                borderWidth: 2,
                                borderColor: "#4F645D",
                                padding: 20,
                                borderRadius: 50,
                              }}
                            >
                              <Text>{"Place Name: " + ap.name}</Text>
                              <Text>Location:</Text>
                              <MapView style={styles.map} region={ap.cordinate}>
                                <Marker
                                  coordinate={ap.cordinate}
                                  title="Your Location"
                                />
                              </MapView>
                              {ap.timeSlots && ap.timeSlots.length > 0 ? (
                                <>
                                  {ap.timeSlots.map((ts) => (
                                    <View
                                      key={ts.from + ts.to}
                                      style={{
                                        borderWidth: 2,
                                        borderColor: "#C9FAEA",
                                        padding: 20,
                                        borderRadius: 50,
                                      }}
                                    >
                                      <Text>Day Time: {" " + ts.daysType}</Text>
                                      <Text>From: {" " + ts.from}</Text>
                                      <Text>To: {" " + ts.to}</Text>
                                    </View>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <Text>No Time Slotes Availble</Text>
                                </>
                              )}
                            </View>
                          ))}
                          <View style={{ alignItems: "center" }}>
                            <Button
                              style={themes.SecondaryBtnLarge2}
                              onPress={() => {
                                setShowOptionsModal(!showOptionsModal);
                              }}
                            >
                              <Text
                                style={{
                                  color: "#FFF",
                                  fontSize: 16,
                                  fontFamily: "Urbanist-Semi-Bold",
                                }}
                              >
                                Add New Work Place
                              </Text>
                            </Button>
                          </View>
                        </>
                      )}
                    </>
                  )
                ) : (
                  <>
                    {doctor.doctor.availablePlaces.length > 0 ? (
                      <View style={{ flex: 1, marginBottom: 5 }}>
                        {availablePlaces.map((ap) => (
                          <View
                            key={ap.id}
                            style={{
                              borderWidth: 2,
                              borderColor: "#4F645D",
                              padding: 20,
                              borderRadius: 50,
                            }}
                          >
                            <Text>{"Place Name: " + ap.name}</Text>
                            <Text>Location:</Text>
                            <MapView style={styles.map} region={ap.cordinate}>
                              <Marker
                                coordinate={ap.cordinate}
                                title="Your Location"
                              />
                            </MapView>
                            {ap.timeSlots && ap.timeSlots.length > 0 ? (
                              <>
                                {ap.timeSlots.map((ts) => (
                                  <View
                                    key={ts.from + ts.to}
                                    style={{
                                      borderWidth: 2,
                                      borderColor: "#C9FAEA",
                                      padding: 20,
                                      borderRadius: 50,
                                    }}
                                  >
                                    <Text>Day Time: {" " + ts.daysType}</Text>
                                    <Text>From: {" " + ts.from}</Text>
                                    <Text>To: {" " + ts.to}</Text>
                                  </View>
                                ))}
                              </>
                            ) : (
                              <>
                                <Text>No Time Slotes Availble</Text>
                              </>
                            )}
                          </View>
                        ))}
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
      {isEditMode && (
        <View>
          <View style={{ alignItems: "center", marginBottom: 5 }}>
            <Button
              style={themes.PrimaryBtnSmall}
              onPress={handleupdate}
              disabled={isUpdateButtonDisable}
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
        </View>
      )}
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
  map: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  locationDisabledContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationDisabledText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  enableLocationButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  enableLocationButtonText: {
    color: "white",
    fontSize: 16,
  },
});
