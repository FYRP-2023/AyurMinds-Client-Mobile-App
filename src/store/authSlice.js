import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    user: '',
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
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = {};
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
