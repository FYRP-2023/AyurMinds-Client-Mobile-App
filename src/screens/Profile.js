import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider, TextInput } from "react-native-paper";
import themes from "../common/theme/themes";
import { logout } from "../actions/authActions";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";

const Profile = () => {
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
      <View></View>

      <View
        style={{
          padding: 10,
          justifyContent: "center",
          backgroundColor: "#929292",
        }}
      >
        <Divider style={{ marginBottom: 10 }} />
        <TouchableOpacity onPress={logoutHandler}>
          <Text style={{ ...themes.Typography.subHeading2 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
