import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    // setInfo(state, action) {
    //   const { user } = action.payload;
    //   state.user = user;
    // },
    // access(state, action) {
    //   state.token = action.payload;
    // },
    // login(state, action) {
    //   state.isLoggedIn = true;
    // },
    // socketConnect(state, action) {
    //   state.socket = action.payload;
    // },
    // logout(state, action) {
    //   state.isLoggedIn = false;
    //   state.token = null;
    //   state.user = "";
    //   state.socket = null;
    // },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
