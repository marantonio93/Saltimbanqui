import * as React from "react";
import api from './app/api';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, GestureResponderEvent } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from "expo-font";
import { HeaderBackButton } from '@react-navigation/elements';
import Home from "./app/home";
import HomeSwitzerland from "./app/home_Switzerland";
import InvitationCode from "./app/invitation_code";
//import RegisterEmpty from "./app/register_empty";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import Login from "./app/login";
import FilterPage from "./app/filter";
import EventDetail from "./app/event_detail";
import { Color } from "./GlobalStyles";

/* import PhoneNumberEmpty from "./screens/PhoneNumberEmpty";
import LoginEmpty from "./screens/LoginEmpty";
import ForgetPasswordEmpty from "./screens/ForgetPasswordEmpty";
import VerifyEmtpy from "./screens/VerifyEmtpy";
import VerificationEmpty from "./screens/VerificationEmpty"; */

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  const [fontsLoaded, error] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
  });

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 2000);
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
    <SafeAreaProvider>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="homeswitzerland"
              component={HomeSwitzerland}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="event_detail"
              component={EventDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="filter"
              component={FilterPage}
              options={{ headerShown: false }}
            />
{/*             <Stack.Screen
              name="invitation_code"
              component={InvitationCode}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="register_empty"
              component={RegisterEmpty}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="login"
              component={Login}
              options={{ headerShown: false }}
            /> */}
            
          </Stack.Navigator>
        ) : (
          <ActivityIndicator size="large" color="#0000ff"/>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
    </>
  );
};
export default App;