import { View, StyleSheet, Image } from "react-native";
import themes from "../common/theme/themes";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";


const Splash = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    const delay = 1000; // 1 seconds in milliseconds
    const timeout = setTimeout(() => {
      const checkLogin = async () => {
        const isLogin = await AsyncStorage.getItem("isLogin");
        if (isLogin) {
          dispatch(authActions.login());
          navigate.navigate("AppNavigator");
        } else {
          navigate.navigate("Welcome");
        }
      };
      checkLogin();
      setInitialLoad(false);
    }, delay);
    return () => clearTimeout(timeout);
  }, [initialLoad]);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/LogoGreen.svg")}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 2,
    fontFamily: "Urbanist-Bold",
  },
  subTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 2,
    color: themes.Colors.primary,
    fontFamily: "Urbanist-Semi-Bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Urbanist-Semi-Bold",
  },
  secondaryButtonText: {
    color: "#17CE92",
    fontSize: 16,
    fontFamily: "Urbanist-Semi-Bold",
  },
  btnGroup: {
    width: "100%",
    marginTop: 100,
  },
  textGroup: { alignItems: "center", justifyContent: "center", gap: 5 },
  logo: {
    width: 210,
    height: 192,
    marginBottom: 50,
  },
});
