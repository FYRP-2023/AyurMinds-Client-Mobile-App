import AsyncStorage from "@react-native-async-storage/async-storage";
import AyurMindsApi from "../api/apiService";
import { authActions } from "../store/authSlice";
import { getAxiosInstance } from "../utils/axios";

export const fetchMessages = async(selectedChat, token, navigate) => {
    try {
      const res = await getAxiosInstance().get(
        AyurMindsApi.message_service.fetch + "?id=" + selectedChat._id,
        null,
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      return res.data
    } catch (err) {
      console.log("🚀 ~ file: authActions.js:14 ~ return ~ err:", err);
    }
};

export const fetchChats = (userId, token) => {
  return async (dispatch) => {
    try {
      const res = await getAxiosInstance().get(
        AyurMindsApi.authentication_service.signIn,
        { email, password },
        {
          withCredentials: true,
        }
      );
      dispatch(authActions.login());
      await AsyncStorage.setItem("isLogin", true);
      navigate.navigate("AppNavigator");
    } catch (err) {
      console.log("🚀 ~ file: authActions.js:14 ~ return ~ err:", err);
    }
  };
};

// router.route("/:chatId").get(allMessages);
// router.route("/").post(sendMessage);
// router.post("/", accessChat);
// router.get("/", fetchChats);
// router.post("/group", createGroupChat);
// router.put("/rename", renameGroup);
// router.put("/groupremove", removeFromGroup);
// router.put("/groupadd", addToGroup);
