import AppNavigator from "./src/navigations/AppNavigator";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { Login, SignUp, Welcome } from "./src/screens";
import * as Font from "expo-font";
import store from "./src/store/store";
import Splash from "./src/screens/Splash";
import Messenger from "./src/screens/Messenger";
import { Text } from "react-native";
import MessengerHeader from "./src/components/Messenger/MessengerHeader";
import { StyleSheet } from "react-native";
import themes from "./src/common/theme/themes";

const Stack = createNativeStackNavigator();

const App = () => {
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
            name="Main"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

  const styles = StyleSheet.create({
    logoText: {
      fontSize: 16,
      color: themes.Colors.primary,
      padding: 8,
      fontWeight: "bold",
      letterSpacing: 3,
      alignItems:"center",
      textAlign:"center"
    },
  });

const MainNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Messenger"
        component={Messenger}
        options={{
          headerTitle: () => <Text style={styles.logoText}>AYURMINDS CHAT</Text>, // Customize the screen title
          headerTitleAlign: "center", // Align title at the center
          headerLeft: () => <MessengerHeader navigation={navigation} />,
          headerStyle: { backgroundColor: themes.Typography.subHeading }, // Use the custom header component
        }}
      />
    </Stack.Navigator>
  );
  
  
};
export default App;

