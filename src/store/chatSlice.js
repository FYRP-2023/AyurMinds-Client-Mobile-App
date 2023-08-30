import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    typing: false,
    newMessage: "",
    istyping: false,
    selectedChat:null,
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setNewMessage(state, action) {
      state.newMessage = action.payload;
    },
    setTyping(state, action) {
      state.typing = action.payload;
    },
    setIsTyping(state, action) {
      state.istyping = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
