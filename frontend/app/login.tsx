import * as React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp  } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import api from "./api";

import Input from "../components/fill_in";
import Bluebutton from "../components/button";

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
/*   const handleLogin = async () => {
    console.log("Email enviado:", email);
    console.log("Contraseña enviada:", password);
    try {
      const response = await api.post("/login/", {
        email: email,
        password: password,
      });
      const token = response.data; // Suponiendo que el backend devuelve solo el token
      // Aquí puedes guardar el token en el almacenamiento local o en el contexto de la aplicación
      Alert.alert("Login exitoso");
      // Redireccionar al usuario a la pantalla principal
      navigation.navigate("home");
    } catch (error) {
      Alert.alert("Error", "Credenciales incorrectas");
    }
  }; */

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
            style={styles.confettiIcon}
            contentFit="cover"
            source={require("../assets/confetti.png")}
        />
        <Image
            style={styles.coffeeCirclesIcon}
            contentFit="cover"
            source={require("../assets/coffee_circles.png")}
        />
        <View style={styles.invitationCode}>
            <Text style={styles.wereYouInvited}>Login Your Account</Text>
            <Input iconName={require("../assets/email_icon.png")}
              placeholderText="Enter Your Email"
              password = {false}
              value = {email}
              onChangeText = {setEmail}
              />
            <Input iconName={require("../assets/lock_icon.png")}
              placeholderText="Password"
              password = {true}
              value={password}
              onChangeText={setPassword}
              />
            <Bluebutton title = "Login"
            onPress={() => navigation.navigate("home")}
            />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.bG,
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  scrollContainer:{
    flexGrow: 1,
  },
  coffeeCirclesIcon: {
    top: 1,
    alignSelf: "flex-end",
    width: 211,
    height: 290,
    position: "absolute",
  },
  confettiIcon: {
    alignSelf: "flex-end",
    width: 123,
    height: 123,
    position: "absolute",
  },
  invitationCode:{
    flex: 1,
    alignContent: "center",
    paddingTop: 160,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 140,
  },
  wereYouInvited: {
    fontSize: FontSize.size_19xl,
    letterSpacing: -1.5,
    lineHeight: 48,
    alignSelf: "stretch",
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.interBlack,
    fontWeight: "600",
  },
  registerButton: {
    borderRadius: Border.br_sm,
    paddingHorizontal: 140,
    paddingVertical: 21,
    backgroundColor: Color.colorMediumslateblue_200,
    alignItems: "center",
  },
  next: {
    color: Color.bG,
    textAlign: "left",
    fontSize: FontSize.size_base,
    letterSpacing: -0.3,
    fontWeight: "500",
  },
  lowerLayout: {
    flexDirection: "column-reverse",
    justifyContent: "center",
    paddingBottom: 15,
  },
  lowerTextLayout: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: 'stretch',
  },
  alreadyHaveAn: {
    fontSize: FontSize.size_base,
    letterSpacing: -0.2,
    color: Color.darkGrey,
    fontFamily: FontFamily.interBlack,
    fontWeight: "500",
  },
  signIn1: {
    color: Color.black,
    fontFamily: FontFamily.interBlack,
    fontWeight: "600",
    letterSpacing: -0.3,
    fontSize: FontSize.size_base,
    marginLeft: 20,
  },
});

export default Login;