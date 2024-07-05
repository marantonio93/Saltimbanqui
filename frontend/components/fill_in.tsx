import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

interface InputProps {
  iconName: ImageSourcePropType;
  placeholderText: string;
  password: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({iconName, placeholderText,password,  ...props }) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={styles.input}>
      <Image
      style={styles.icon}
      contentFit="cover"
      source={iconName}      
      />
      <TextInput
                style={[styles.textInput, styles.textInputTypo]}
                placeholder={placeholderText}
                placeholderTextColor="#c2c3cb"
                secureTextEntry={password && hidePassword}
                {... props}/> 
                {
                  password &&  <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                      <Image
                        style= {styles.iconEye}
                        contentFit="cover"
                        source={hidePassword === false ? require("../assets/eyeicon.png") : require("../assets/eyeoff_icon.png")}
                      />
                    </TouchableOpacity>
                } 
        
    </View>
    );
}

export default Input

const styles = StyleSheet.create({
  input: {
    borderRadius: 13,
    backgroundColor: Color.colorWhite,
    height: 66,
    paddingHorizontal: 22,
    paddingVertical: 0,
    marginVertical: 10,
    flexDirection: "row",
    alignItems:"center",
  },
  icon: {
    width: 17,
    height: 19,
  },
  iconEmail: {
    width: 17,
    height: 19,
  },
  textInput: {
    fontSize: 14,
    marginLeft: 21,
    flex:1,
  },
  textInputTypo: {
    fontFamily: FontFamily.interBlack,
    fontWeight: "500",
    marginRight: 21,
  },
  iconEye: {
    width: 25,
    height: 19,
  },
});