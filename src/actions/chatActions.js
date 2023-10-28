import AsyncStorage from "@react-native-async-storage/async-storage";
import AyurMindsApi from "../api/apiService";
import { authActions } from "../store/authSlice";
import { getAxiosInstance } from "../utils/axios";
import { chatActions } from "../store/chatSlice";

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
      console.log("fetchChat ~ return ~ err:", err);
    }
};

export const fetchChats = (user, token) => {
  return async (dispatch) => {
    try {
      const res = await getAxiosInstance().get(
        AyurMindsApi.message_service.fetchChats + "?id=" + user._id,
        null,
        {
          withCredentials: true,
        }
      );
      dispatch(chatActions.setMessages(res.data));
    } catch (err) {
      console.log("fetchChats ~ return ~ err:", err);
    }
  };
};

export const accessChat = (user, toUser, token) => {
  return async (dispatch) => {
    try {
      const res = await getAxiosInstance().get(
        AyurMindsApi.message_service.accessChat + "?id=" + user._id,
        {
          userId: toUser._id
        },
        {
          withCredentials: true,
        }
      );
      dispatch(chatActions.setMessages());
    } catch (err) {
      console.log("access chat ~ return ~ err:", err);
    }
  };
};
export const allMessages = async (chat) => {
  try {
    const res = await getAxiosInstance().get(
      AyurMindsApi.message_service.allMessages + "?chatId=" + chat._id,
      null,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.log("~ allMessages ~ err:", err)
    throw new Error(err)
  }
};

// router.route("/:chatId").get(allMessages);
// router.route("/").post(sendMessage);
// router.post("/", accessChat);
// router.get("/", fetchChats);
// router.post("/group", createGroupChat);
// router.put("/rename", renameGroup);
// router.put("/groupremove", removeFromGroup);
// router.put("/groupadd", addToGroup);
