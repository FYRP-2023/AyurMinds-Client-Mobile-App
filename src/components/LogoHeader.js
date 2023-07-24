import { View, StyleSheet, StatusBar, Text } from "react-native";
import React from "react";
import themes from "../common/theme/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { access, info, logout } from "../actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LogoHeader = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  let timeout;

  const fetchData = async () => {
    const isLocalLogin = await AsyncStorage.getItem("isLogin");
    if (isLocalLogin && isLoggedIn) {
      await dispatch(access(navigate));
    }
    timeout = setTimeout(fetchData, 2*60*1000);
  };

  const fetchData2 = async () => {
    if (token && !user) {
      await dispatch(info(token, navigate));
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    fetchData2();
  }, [token, user, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>AYURMINDS</Text>
      <MaterialCommunityIcons
        size={28}
        name="chat"
        color={themes.Colors.primary}
        onPress={() => navigate.navigate("DocChat")}
      />
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 13,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    fontSize: 24,
    color: themes.Colors.primary,
    padding: 8,
    fontWeight: "bold",
    letterSpacing: 3,
  },
});
