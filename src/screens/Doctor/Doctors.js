import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Card, Chip, Divider, TextInput } from "react-native-paper";
import themes from "../../common/theme/themes";
import ChatbotIcon from "../../../assets/chatbotIcon.svg";
import { AntDesign, Entypo, Feather, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { getAxiosInstance } from "../../utils/axios";
import AyurMindsApi from "../../api/apiService";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import MultiSelect from "react-native-multiple-select";
// const doctors = [
//   {
//     doctor: {
//       contactNo: "0776659628",
//       isVerified: false,
//       specializedIn: [
//         {
//           name: "disease 01",
//           _id: 1,
//         },
//         {
//           name: "disease 02",
//           _id: 2,
//         },
//         {
//           name: "disease 03",
//           _id: 3,
//         },
//         {
//           name: "disease 04",
//           _id: 4,
//         },
//         {
//           name: "disease 05",
//           _id: 5,
//         },
//       ],
//       verificationDocs: [],
//       ratings: [
//         {
//           user: {
//             _id: 1,
//           },
//           rate: 4,
//         },
//         {
//           user: {
//             _id: 2,
//           },
//           rate: 2,
//         },
//         {
//           user: {
//             _id: 3,
//           },
//           rate: 4,
//         },
//       ],
//       reviews: [],
//       availablePlaces: [
//         {
//           cordinate: "6.732954, 79.921078",
//           timeSlots: [
//             {
//               from: "3.00.PM",
//               to: "6.00.PM",
//               isAvailable: true,
//             },
//             {
//               from: "8.00.AM",
//               to: "1.00.PM",
//               isAvailable: true,
//             },
//           ],
//         },
//         {
//           cordinate: "6.732954, 79.921078",
//           timeSlots: [
//             {
//               from: "3.00.PM",
//               to: "6.00.PM",
//               isAvailable: true,
//             },
//             {
//               from: "8.00.AM",
//               to: "1.00.PM",
//               isAvailable: true,
//             },
//           ],
//         },
//       ],
//       bio: "kalkas asjdklajsd akjsdklasjd klajsdkljasd kajsdklajsd aksjdklasj daskjdapospd aoskdaskdll;as daopskdlaksd;a poaksod;lkas;dkapos dasokdlaksdlakspodk oaksd;olkas;do opaksdoakl;kal;d sasokdposakdaskdpo opkasodpkasop opaskdosakdopas poaksdpokasopdkpo oaksdopaskdopkaspd0awd oklaksdolaks daoskdoasda[psokdaskd kal;scas;dka sdkok",
//     },
//     pharmacist: {
//       isVerified: false,
//       verificationDocs: [],
//       ratings: [
//         {
//           user: {
//             _id: 1,
//           },
//           rate: 4,
//         },
//         {
//           user: {
//             _id: 2,
//           },
//           rate: 2,
//         },
//         {
//           user: {
//             _id: 3,
//           },
//           rate: 4,
//         },
//       ],
//       reviews: [],
//     },
//     _id: "64e8d047b61479919c13c21b",
//     firstName: "super",
//     lastName: "admin",
//     email: "ayurminds.cosmosighttech@gmail.com",
//     role: "super_admin",
//     avatar:
//       "https://res.cloudinary.com/dzhhvabny/image/upload/v1689611678/default_avatar/default-avatar.jpg",
//     languageId: "1",
//     isDoctor: false,
//     isPharmacist: false,
//     createdAt: "2023-08-25T16:01:11.753Z",
//     updatedAt: "2023-08-25T16:01:11.753Z",
//     __v: 0,
//   },
// ];

export default function Doctors({ route,navigation }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  console.log("🚀 ~ file: Doctors.js:151 ~ Doctors ~ selectedCoordinates:", selectedCoordinates)
  const menuPosition = useRef(new Animated.Value(-300)).current;
  const navigate = useNavigation()
  const [doctors, setDoctors]=useState([])
  const [disease, setDiseases] = useState([]);
  const [diseaseCB, setDiseasesCB] = useState(true);
  const [cordinatesCallBack, setCordinatesCallBack] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const showDocDetails =(data)=>{
    navigate.navigate("DoctorDetails", { doctor: data });
  } 

  const chatbotDeseases = route.params?.diseases;
   const multiSelectRef = useRef(null);
    const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

      const [selectedItems, setselectedItems] = useState([]);
      console.log("🚀 ~ file: Doctors.js:170 ~ Doctors ~ selectedItems:", selectedItems)
  const [selectedItemDataCall, setSelectedItemDataCall] = useState(true);
    const [selectedItemData, setSelectedItemData] = useState([]);
   

    useEffect(() => {
      const getDoctors = async () => {
        try {
          const res = await getAxiosInstance().post(
            AyurMindsApi.doctor_service.getDoctors,
            {
              cordinates: selectedCoordinates,
              deseases: selectedItems,
            },
            {
              withCredentials: true,
            }
          );
          // setCallBack(false);
          let docs = []
          if (res.data && res.data.length > 0){
            docs = res.data.filter(d=>{
              return user._id != d._id
            })
          } 
          setDoctors(docs);
        } catch (error) {
          console.log(
            "🚀 ~ file: DoctorDetails.js:68 ~ getDiseases ~ error:",
            error
          );
        }
      };
      getDoctors();
    }, [selectedItemData, selectedCoordinates]);

     const getDiseases = async () => {
       try {
         const res = await getAxiosInstance().get(
           AyurMindsApi.doctor_service.getDiseases,
           {
             withCredentials: true,
           }
         );
         // setCallBack(false);
         setDiseases(res.data);
       } catch (error) {
         console.log(
           "🚀 ~ file: DoctorDetails.js:68 ~ getDiseases ~ error:",
           error
         );
       }
     };

       const handleMapPress = (latitude, longitude) => {
         setSelectedCoordinates({ latitude, longitude });
       };

       const getLiveLocation = async () => {
         try {
           // Check if location services are enabled
           const isEnabled = await Location.hasServicesEnabledAsync();
           if (isEnabled) {
             // Request permission to access the device's location
             const { status } =
               await Location.requestForegroundPermissionsAsync();

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

     useEffect(() => {
       diseaseCB && getDiseases();
       diseaseCB && setDiseasesCB(false);
     }, [diseaseCB]);

     useEffect(() => {
       cordinatesCallBack && getLiveLocation();
       cordinatesCallBack && setCordinatesCallBack(false);
     }, [cordinatesCallBack]);

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

  function toCamelCase(inputString) {
   const words = inputString.split(" ");
   const capitalizedWords = words.map((word) => {
     if (word.length > 0) {
       return word.charAt(0).toUpperCase() + word.slice(1);
     }
     return word;
   });
   return capitalizedWords.join(" ");
  }

    const onSelectedItemsChange = (selectedItems) => {
      setselectedItems(selectedItems);
      setSelectedItemDataCall(true);
    };

      const handleRemoveItems = (id) => {
        const data = selectedItems.filter((i) => {
          return i != id;
        });
        setselectedItems(data);
        setSelectedItemDataCall(true);
      };

          useEffect(() => {
            if (
              selectedItemDataCall &&
              disease.length > 0 &&
              selectedItems.length > 0
            ) {
              let sid = [];
              for (const d of selectedItems) {
                for (const de of disease) {
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
          }, [selectedItemDataCall, disease, selectedItems]);

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
          <ScrollView style={{ padding: 10 }}>
            <View>
              <View style={styles.sideMenuItem}>
                <Entypo name="location" size={24} color="#FFFFFF" />
                <Text style={{ ...themes.Typography.title, color: "#FFFFFF" }}>
                  My Location
                </Text>
              </View>
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
                    Location services are disabled. Please enable them to use
                    this feature.
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
            </View>
            <View>
              <View style={styles.sideMenuItem}>
                <MaterialCommunityIcons
                  name="hospital-box-outline"
                  size={24}
                  color="#FFFFFF"
                />

                <Text style={{ ...themes.Typography.title, color: "#FFFFFF" }}>
                  My Deseases
                </Text>
              </View>
              <View>
                <View style={{}}>
                  <MultiSelect
                    hideTags
                    items={disease}
                    uniqueKey="_id"
                    ref={multiSelectRef}
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Pick your deseases"
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
                      padding: 10,
                      height: 40,
                      width: "100%",
                      borderBottomColor: themes.Colors.primary,
                      borderBottomWidth: 1,
                      marginBottom: 10,
                      backgroundColor: "#FFFF",
                    }}
                    styleDropdownMenuSubsection={{
                      borderRadius: 10,
                      backgroundColor: "#FFFF",
                      borderBottomColor: themes.Colors.primary,
                    }}
                    styleTextDropdownSelected={{
                      marginLeft: 10,
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
            </View>
          </ScrollView>
        </View>
      </Animated.View>

      <View style={styles.container}>
        {doctors.length > 0 ? (
          <ScrollView contentContainerStyle={styles.doctorList}>
            {doctors.map(
              (doctor) =>
                doctor._id != user._id && (
                  <TouchableOpacity
                    key={doctor._id}
                    style={styles.doctorItem}
                    onPress={() => {
                      showDocDetails(doctor);
                    }}
                  >
                    <View style={styles.card}>
                      <Image
                        source={{ uri: doctor.avatar }}
                        style={styles.avatar}
                      />
                      <View>
                        <Text style={styles.doctorName}>
                          {toCamelCase(
                            doctor.firstName + " " + doctor.lastName
                          )}
                        </Text>
                        <View style={styles.doctorSpecsCon}>
                          {doctor.doctor.specializedIn.map((sp) => (
                            <Text style={styles.doctorSpecs} key={sp._id}>
                              {sp.name}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            )}
          </ScrollView>
        ) : (
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              height: "100%",
              margin: "auto",
            }}
          >
            <Text>No Any Doctors</Text>
            <Image
              source={require("../../../assets/nodata.svg")}
              style={{
                width: 210,
                height: 192,
                marginBottom: 50,
              }}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    flex: 1,
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
    gap: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: "row",
    // width: "100%",
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
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
  },
  doctorName: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Urbanist-Semi-Bold",
  },
  doctorSpecs: {
    fontSize: 12,
    padding: 5,
    borderRadius: 50,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: "#8BFFEA",
    fontFamily: "Urbanist-Regular",
  },
  doctorSpecsCon: {
    marginLeft: 10,
    marginRight: 50,
    marginTop: 10,
    gap: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
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
