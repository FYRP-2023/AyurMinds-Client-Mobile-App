import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    user: {},
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    login(state, action) {
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
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
