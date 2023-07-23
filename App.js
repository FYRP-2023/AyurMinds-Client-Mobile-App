import AppNavigator from "./src/navigations/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";
import { Login, SignUp, Welcome } from "./src/screens";
import * as Font from "expo-font";
import store from "./src/store/store";
import DoctorChat from "./src/screens/DoctorChat";

const Stack = createNativeStackNavigator();

export default function App() {
  //loading fonts
  Font.loadAsync({
    "Urbanist-Black": require("./assets/fonts/Urbanist-Black.ttf"),
    "Urbanist-Bold": require("./assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-Semi-Bold": require("./assets/fonts/Urbanist-SemiBold.ttf"),
    "Urbanist-ExtraBold": require("./assets/fonts/Urbanist-ExtraBold.ttf"),
    "Urbanist-Light": require("./assets/fonts/Urbanist-Light.ttf"),
    "Urbanist-Regular": require("./assets/fonts/Urbanist-Regular.ttf"),
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <LogoHeader /> */}
        <Stack.Navigator>
          <Stack.Screen
            name='Main'
            component={MainNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='AppNavigator'>
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AppNavigator'
        component={AppNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='DocChat'
        component={DoctorChat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
