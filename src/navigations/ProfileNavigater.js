import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import DoctorDetails from "../screens/Doctor/DoctorDetails";
const ProfileStack = createStackNavigator();
const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileSettings">
      <ProfileStack.Screen
        name="ProfileSettings"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="DoctorDetailsSettings"
        component={DoctorDetails}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
