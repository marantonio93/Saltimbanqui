import * as React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp  } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

import Input from "../components/fill_in";
import Bluebutton from "../components/button";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InvitationCode = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

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
          <Text style={styles.wereYouInvited}>Were you invited?</Text>
          <Input iconName={require("../assets/lock_icon.png")}
          placeholderText="Invitation code!!!!"
          password={false} value={""} onChangeText={function (text: string): void {
            throw new Error("Function not implemented.");
          } }          />
          <Bluebutton title = "Next"
          onPress={() => navigation.navigate("register_empty")}
          />
        </View>
        <View style={styles.lowerLayout}>
          <View style = {styles.lowerTextLayout}>
            <Text style={styles.alreadyHaveAn}>Already have an account?</Text>
            <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => navigation.navigate("LoginEmpty")}
            >
            <Text style={styles.signIn1}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
    position: "relative",
  },
  invitationCode:{
    flex: 1,
    alignContent: "center",
    paddingTop: 150,
    paddingLeft: 20,
    paddingRight: 20,
  },
  wereYouInvited: {
    fontSize: FontSize.size_19xl,
    letterSpacing: -1.5,
    lineHeight: 48,
    alignSelf: "stretch",
    textAlign: "center",
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
    paddingTop: 140,
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

export default InvitationCode;