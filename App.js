import AppNavigator from "./src/navigations/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, SignUp, Welcome } from "./src/screens";
import { useFonts } from "expo-font";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Urbanist: require("./assets/fonts/Urbanist-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
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
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
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
      <Stack.Screen name='AppNavigator' component={AppNavigator} />
    </Stack.Navigator>
  );
}
