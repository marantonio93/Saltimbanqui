import * as React from "react";
import api from './app/api';
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from "expo-font";
import Home from "./app/home";
import InvitationCode from "./app/invitation_code";
import RegisterEmpty from "./app/register_empty";
/* import PhoneNumberEmpty from "./screens/PhoneNumberEmpty";
import LoginEmpty from "./screens/LoginEmpty";
import ForgetPasswordEmpty from "./screens/ForgetPasswordEmpty";
import VerifyEmtpy from "./screens/VerifyEmtpy";
import VerificationEmpty from "./screens/VerificationEmpty"; */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Login from "./app/login";
import FilterPage from "./app/filter";

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  const [fontsLoaded, error] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-BlackItalic": require("./assets/fonts/Inter-BlackItalic.otf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.otf"),
    "Inter-BoldItalic": require("./assets/fonts/Inter-BoldItalic.otf"),
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
              name="filter"
              component={FilterPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
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
            />
            <Stack.Screen 
              name="home"
              component={Home}
              options={{ headerShown: false }}
            />
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