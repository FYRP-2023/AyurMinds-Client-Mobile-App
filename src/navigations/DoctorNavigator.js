import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import Doctor from '../screens/Doctor/Doctor';
import Doctors from '../screens/Doctor/Doctors';
import Chat from '../components/Messenger/chat';
const DoctorStack = createStackNavigator();
const DoctorNavigator = () => {
  return (
    <DoctorStack.Navigator initialRouteName="Doctors">
      <DoctorStack.Screen
        name="Doctors"
        component={Doctors}
        options={{
          headerShown: false,
        }}
      />
      <DoctorStack.Screen
        name="DoctorDetails"
        component={Doctor}
        options={{
          headerShown: false,
        }}
      />
      <DoctorStack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
    </DoctorStack.Navigator>
  );
}

export default DoctorNavigator