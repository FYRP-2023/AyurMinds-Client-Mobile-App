import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider, TextInput } from "react-native-paper";
import themes from "../common/theme/themes";
import { logout } from "../actions/authActions";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Feather, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
 const navigate = useNavigation()
 const dispatch = useDispatch();
  const logoutHandler=()=>{
    dispatch(logout(navigate));
  }

  return (
    <View
      style={{
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <ScrollView>
        <View
          style={{
            padding: 15,
            justifyContent: "space-around",
            backgroundColor: "#F1F1F1",
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            // onPress={logoutHandler}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color="black"
            />
            <Text style={{ ...themes.Typography.subHeading }}>Profile</Text>
          </TouchableOpacity>
        </View>
        {user.isDoctor && (
          <View
            style={{
              padding: 15,
              justifyContent: "space-around",
              backgroundColor: "#F1F1F1",
              marginBottom: 2,
            }}
          >
            <TouchableOpacity
              onPress={()=>{
                navigate.navigate("DoctorDetailsSettings");
              }}
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Fontisto name="doctor" size={24} color="black" />
              <Text style={{ ...themes.Typography.subHeading }}>Doctor</Text>
            </TouchableOpacity>
          </View>
        )}
        {user.isPharmacist && (
        <View
          style={{
            padding: 15,
            justifyContent: "space-around",
            backgroundColor: "#F1F1F1",
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            // onPress={logoutHandler}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="doctor" size={24} color="black" />
            <Text style={{ ...themes.Typography.subHeading }}>Pharmacist</Text>
          </TouchableOpacity>
        </View>
        )}
        <View
          style={{
            padding: 15,
            justifyContent: "space-around",
            backgroundColor: "#F1F1F1",
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            // onPress={logoutHandler}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Ionicons name="notifications" size={24} color="black" />
            <Text style={{ ...themes.Typography.subHeading }}>
              Notifications
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 15,
            justifyContent: "space-around",
            backgroundColor: "#F1F1F1",
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            // onPress={logoutHandler}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Feather name="settings" size={24} color="black" />
            <Text style={{ ...themes.Typography.subHeading }}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 15,
            justifyContent: "space-around",
            backgroundColor: "#F1F1F1",
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            // onPress={logoutHandler}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Feather name="unlock" size={24} color="black" />
            <Text style={{ ...themes.Typography.subHeading }}>
              Tearms & Conditions
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 15,
            justifyContent: "space-around",
            backgroundColor: "#F1F1F1",
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            // onPress={logoutHandler}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Ionicons name="help-circle-outline" size={24} color="black" />
            <Text style={{ ...themes.Typography.subHeading }}>Help</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 15,
            justifyContent: "space-around",
            backgroundColor: "#F1F1F1",
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            // onPress={logoutHandler}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <AntDesign name="team" size={24} color="black" />
            <Text style={{ ...themes.Typography.subHeading }}>About us</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 15,
            justifyContent: "space-around",
            backgroundColor: "#F1F1F1",
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            // onPress={logoutHandler}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="contact-support" size={24} color="black" />
            <Text style={{ ...themes.Typography.subHeading }}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={{
          padding: 15,
          justifyContent: "space-around",
          backgroundColor: "#D8D8D8",
        }}
      >
        <TouchableOpacity
          onPress={logoutHandler}
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <AntDesign name="logout" size={24} color="#B60000" />
          <Text style={{ ...themes.Typography.subHeading2 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
