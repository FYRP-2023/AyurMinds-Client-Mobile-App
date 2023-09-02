import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";
import notificationSlice from "./notificationSlice";

//With the Redux Persist library, can save the Redux store in persistent storage,
//for example, the local storage. Therefore, even after refreshing the browser, the site state will still be preserved

const reducers = combineReducers({
  auth: authSlice.reducer,
  chat: chatSlice.reducer,
  notification: notificationSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  //It allows writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.
  middleware: [thunk],
});

export default store;
