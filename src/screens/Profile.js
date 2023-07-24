import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { access, info, logout } from "../actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  let timeout;

      const fetchData = async () => {
        const isLocalLogin = await AsyncStorage.getItem("isLogin");
        if (isLocalLogin && isLoggedIn && !token) {
          await dispatch(access(navigate));
        }

        if (isLocalLogin && isLoggedIn && token && !user) {
          console.log("🚀 ~ file: Home.js:23 ~ fetchData ~ user:", user)
          await dispatch(info(token, navigate));
        }
        // Set the timeout and store the timer ID in the ref
        timeout = setTimeout(fetchData, 2 * 60 * 1000);
      };

  useEffect(() => {
    fetchData();
    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoggedIn, token, dispatch]);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
