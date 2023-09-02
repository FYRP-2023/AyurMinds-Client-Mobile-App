import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    user: "",
    socket: null,
    isSocketConnect: false,
  },
  reducers: {
    setInfo(state, action) {
      const { user } = action.payload;
      state.user = user;
    },
    access(state, action) {
      state.token = action.payload;
    },
    login(state, action) {
      state.isLoggedIn = true;
    },
    socketConnect(state, action) {
      state.socket = action.payload;
      state.isSocketConnect = true;
    },
    socketDisconnect(state, action) {
      state.socket = null;
      state.isSocketConnect = false;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = "";
      state.socket = null;
      state.isSocketConnect = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
